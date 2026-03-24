

document.addEventListener("DOMContentLoaded", function () {
    const session = getSession();
    if (!session) {
        window.location.href = "index.html";
        return;
    }

    const currentUserId = session.userId;
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get("id");
    const profileUserId = profileId ? profileId : currentUserId;
    const isOwnProfile = profileUserId === currentUserId;

    function getFollowerCount(userId) {
        return getUsers().filter(function (u) {
            return u.following.includes(userId);
        }).length;
    }

    function getPostsByUser(userId) {
        return getPosts()
            .filter(function (p) { return p.authorId === userId; })
            .sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
    }

    function escapeHtml(text) {
        return String(text)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");
    }

    function renderProfile() {
        const user = getUserById(profileUserId);
        if (!user) return;
        const currentUser = getUserById(currentUserId);

        const avatarEl = document.getElementById("profile-avatar");
        if (avatarEl) avatarEl.textContent = getInitials(user.username);

        const usernameEl = document.getElementById("profile-username");
        if (usernameEl) usernameEl.textContent = user.username;

        const bioEl = document.getElementById("profile-bio");
        if (bioEl) bioEl.textContent = user.bio || "No bio yet.";

        const userPosts = getPostsByUser(profileUserId);

        const postsCountEl = document.getElementById("posts-count");
        if (postsCountEl) postsCountEl.textContent = userPosts.length;

        const followingCountEl = document.getElementById("following-count");
        if (followingCountEl) followingCountEl.textContent = user.following.length;

        const followersCountEl = document.getElementById("followers-count");
        if (followersCountEl) followersCountEl.textContent = getFollowerCount(profileUserId);

        const editBtn = document.getElementById("edit-profile-btn");
        const followBtn = document.getElementById("follow-btn");

        if (isOwnProfile) {
            if (editBtn) editBtn.classList.remove("hidden");
            if (followBtn) followBtn.classList.add("hidden");
        } else {
            if (editBtn) editBtn.classList.add("hidden");
            if (followBtn) {
                followBtn.classList.remove("hidden");
                const following = currentUser && currentUser.following.includes(profileUserId);
                followBtn.textContent = following ? "Unfollow" : "Follow";
                followBtn.className = following ? "btn-outline" : "btn-primary";
            }
        }

        renderPosts(userPosts);
    }

    function renderPosts(posts) {
        const container = document.getElementById("profile-posts-container");
        if (!container) return;

        if (posts.length === 0) {
            container.innerHTML = '<p class="no-posts-msg">No posts yet.</p>';
            return;
        }

        container.innerHTML = posts.map(function (post) {
            return '<div class="post-card">' +
                '<div class="post-meta"><span>' + escapeHtml(formatDate(post.createdAt)) + '</span></div>' +
                '<div class="post-content">' +
                    '<p>' + escapeHtml(post.content) + '</p>' +
                    '<div class="post-actions">' +
                        '<span>&#10084; ' + post.likes.length + '</span>' +
                        '<span>&#128172; ' + post.comments.length + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');
    }

    function openEditModal() {
        const user = getUserById(currentUserId);
        const modal = document.getElementById("edit-modal");
        const usernameInput = document.getElementById("edit-username");
        const bioInput = document.getElementById("edit-bio");
        if (!modal || !usernameInput || !bioInput || !user) return;
        usernameInput.value = user.username;
        bioInput.value = user.bio || "";
        modal.classList.remove("hidden");
    }

    function closeEditModal() {
        const modal = document.getElementById("edit-modal");
        if (modal) modal.classList.add("hidden");
    }

    function saveProfile() {
        const usernameInput = document.getElementById("edit-username");
        const bioInput = document.getElementById("edit-bio");
        if (!usernameInput || !bioInput) return;
        const newUsername = usernameInput.value.trim();
        const newBio = bioInput.value.trim();
        if (!newUsername) return;
        const users = getUsers();
        const idx = users.findIndex(function (u) { return u.id === currentUserId; });
        if (idx === -1) return;
        users[idx].username = newUsername;
        users[idx].bio = newBio;
        saveUsers(users);
        closeEditModal();
        renderProfile();
    }

    function handleFollowToggle() {
        const users = getUsers();
        const currentUser = users.find(function (u) { return u.id === currentUserId; });
        if (!currentUser) return;
        const idx = currentUser.following.indexOf(profileUserId);
        if (idx === -1) {
            currentUser.following.push(profileUserId);
        } else {
            currentUser.following.splice(idx, 1);
        }
        saveUsers(users);
        renderProfile();
    }

    function handleLogout() {
        clearSession();
        window.location.href = "index.html";
    }

    const editBtn = document.getElementById("edit-profile-btn");
    if (editBtn) editBtn.addEventListener("click", openEditModal);

    const closeEditBtn = document.getElementById("close-edit-modal");
    if (closeEditBtn) closeEditBtn.addEventListener("click", closeEditModal);

    const saveBtn = document.getElementById("save-profile-btn");
    if (saveBtn) saveBtn.addEventListener("click", saveProfile);

    const followBtn = document.getElementById("follow-btn");
    if (followBtn) followBtn.addEventListener("click", handleFollowToggle);

    const editModal = document.getElementById("edit-modal");
    if (editModal) {
        editModal.addEventListener("click", function (e) {
            if (e.target === editModal) closeEditModal();
        });
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            handleLogout();
        });
    }

    renderProfile();
});