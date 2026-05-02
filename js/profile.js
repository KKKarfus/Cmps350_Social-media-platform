let profileUser = null;
let profileUserPosts = [];
let isFollowingProfileUser = false;

async function apiFetchUser(userId) {
    const res = await fetch("/api/users/" + userId);
    if (!res.ok) return null;
    return res.json();
}

async function apiFetchUserPosts(userId) {
    const res = await fetch("/api/posts?authorId=" + encodeURIComponent(userId));
    if (!res.ok) return [];
    return res.json();
}

async function apiFetchFollowingList(userId) {
    const res = await fetch("/api/users/" + userId + "/following");
    if (!res.ok) return [];
    return res.json();
}

async function apiFollow(targetId, followerId) {
    const res = await fetch("/api/users/" + targetId + "/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId })
    });
    if (!res.ok) throw new Error("Failed to follow");
    return res.json();
}

async function apiUnfollow(targetId, followerId) {
    const res = await fetch("/api/users/" + targetId + "/follow", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId })
    });
    if (!res.ok) throw new Error("Failed to unfollow");
    return res.json();
}

async function apiUpdateProfile(userId, { username, bio }) {
    const res = await fetch("/api/users/" + userId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, bio })
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
}

function renderProfile(user) {
    const avatarEl = document.querySelector("#profile-avatar");
    avatarEl.textContent = getInitials(user.username);
    avatarEl.style.backgroundColor = "#FC7303";

    document.querySelector("#profile-username").textContent = user.username;
    document.querySelector("#profile-bio").textContent = user.bio || "No bio yet.";

    const postsCount = (user._count && user._count.posts) || 0;
    const followingCount = (user._count && user._count.following) || 0;
    const followersCount = (user._count && user._count.followers) || 0;

    document.querySelector("#posts-count").textContent = postsCount;
    document.querySelector("#following-count").textContent = followingCount;
    document.querySelector("#followers-count").textContent = followersCount;
}

function renderProfilePosts(posts, viewerId) {
    const container = document.querySelector("#profile-posts-container");
    if (!container) return;

    if (!posts || posts.length === 0) {
        container.innerHTML = "<p>No posts yet.</p>";
        return;
    }

    const html = posts.map(function (post) {
        const hasLiked = hasUserLiked(post, viewerId);
        const likeCount = getLikeCount(post);
        const commentCount = getCommentCount(post);
        return `
            <div class="post-card">
                <div class="post-meta">${formatDate(post.createdAt)}</div>
                <p class="post-content">${escapeHtml(post.content)}</p>
                <div class="post-actions">
                    <button class="post-action-btn ${hasLiked ? "liked" : ""}" type="button" data-like-id="${post.id}" aria-pressed="${hasLiked}">
                        <i class="${hasLiked ? "fa-solid" : "fa-regular"} fa-heart"></i> ${likeCount}
                    </button>
                    <button class="post-action-btn" type="button" data-comment-open-id="${post.id}">
                        <i class="fa-regular fa-comment"></i> ${commentCount}
                    </button>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML = html;
}

async function refreshProfilePosts() {
    if (!profileUser) return;
    profileUserPosts = await apiFetchUserPosts(profileUser.id);
    renderProfilePosts(profileUserPosts, currentUser ? currentUser.id : null);
}

async function refreshProfile() {
    if (!profileUser) return;
    const fresh = await apiFetchUser(profileUser.id);
    if (fresh) {
        profileUser = fresh;
        renderProfile(profileUser);
    }
}

function setupFollowButton() {
    const followBtn = document.querySelector("#follow-btn");
    const editBtn = document.querySelector("#edit-profile-btn");
    if (!followBtn || !editBtn || !currentUser || !profileUser) return;

    if (profileUser.id === currentUser.id) {
        editBtn.classList.remove("hidden");
        followBtn.classList.add("hidden");
        return;
    }

    editBtn.classList.add("hidden");
    followBtn.classList.remove("hidden");
    followBtn.textContent = isFollowingProfileUser ? "Unfollow" : "Follow";
}

async function handleFollowClick() {
    if (!currentUser || !profileUser) return;
    try {
        if (isFollowingProfileUser) {
            await apiUnfollow(profileUser.id, currentUser.id);
            isFollowingProfileUser = false;
        } else {
            await apiFollow(profileUser.id, currentUser.id);
            isFollowingProfileUser = true;
        }
        setupFollowButton();
        await refreshProfile();
    } catch (err) {
        // ignore failure; UI will reflect server state on next load
    }
}

async function handleSaveProfile() {
    if (!currentUser) return;
    const newUsername = document.querySelector("#edit-username").value.trim();
    const newBio = document.querySelector("#edit-bio").value.trim();

    if (!newUsername) {
        alert("Username cannot be empty");
        return;
    }

    try {
        await apiUpdateProfile(currentUser.id, { username: newUsername, bio: newBio });
        document.querySelector("#edit-modal").classList.add("hidden");

        const refreshedSelf = await apiFetchUser(currentUser.id);
        if (refreshedSelf) currentUser = refreshedSelf;

        if (profileUser.id === currentUser.id) {
            profileUser = refreshedSelf;
            renderProfile(profileUser);
            await refreshProfilePosts();
        }
    } catch (err) {
        alert("Could not update your profile. Try again.");
    }
}

function handleProfilePostsClick(event) {
    const commentBtn = event.target.closest("[data-comment-open-id]");
    const likeBtn = event.target.closest("[data-like-id]");

    if (commentBtn) {
        openPostModal(commentBtn.dataset.commentOpenId);
        return;
    }

    if (likeBtn) {
        toggleLike(likeBtn.dataset.likeId);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const session = getSession();
    if (!session) {
        window.location.href = "index.html";
        return;
    }

    const me = await apiFetchUser(session.userId);
    if (!me) {
        clearSession();
        window.location.href = "index.html";
        return;
    }
    currentUser = me;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id");
    const profileUserId = requestedId ? requestedId : currentUser.id;

    profileUser = await apiFetchUser(profileUserId);
    if (!profileUser) {
        document.querySelector("#profile-username").textContent = "User not found";
        return;
    }

    if (profileUser.id !== currentUser.id) {
        const followingList = await apiFetchFollowingList(currentUser.id);
        isFollowingProfileUser = followingList.some(function (f) {
            return f.followingId === profileUser.id;
        });
    }

    renderProfile(profileUser);
    await refreshProfilePosts();
    setupFollowButton();

    document.querySelector("#edit-profile-btn").addEventListener("click", () => {
        document.querySelector("#edit-username").value = profileUser.username;
        document.querySelector("#edit-bio").value = profileUser.bio || "";
        document.querySelector("#edit-modal").classList.remove("hidden");
    });

    document.querySelector("#close-edit-modal").addEventListener("click", () => {
        document.querySelector("#edit-modal").classList.add("hidden");
    });

    document.querySelector("#edit-modal").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            document.querySelector("#edit-modal").classList.add("hidden");
        }
    });

    document.querySelector("#save-profile-btn").addEventListener("click", handleSaveProfile);

    const followBtn = document.querySelector("#follow-btn");
    if (followBtn) followBtn.addEventListener("click", handleFollowClick);

    document.querySelector("#profile-posts-container").addEventListener("click", handleProfilePostsClick);

    document.querySelector("#logout-btn").addEventListener("click", () => {
        clearSession();
        window.location.href = "index.html";
    });

    const commentForm = document.querySelector("#comment-form");
    if (commentForm) commentForm.addEventListener("submit", handleCreateComment);

    const closeModalBtn = document.querySelector("#close-post-modal");
    if (closeModalBtn) closeModalBtn.addEventListener("click", closePostModal);

    const modalOverlay = document.querySelector("#post-modal-overlay");
    if (modalOverlay) modalOverlay.addEventListener("click", closePostModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePostModal();
        }
    });

    document.addEventListener("posts-changed", async () => {
        await refreshProfilePosts();
        await refreshProfile();
    });
});
