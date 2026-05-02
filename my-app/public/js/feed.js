function redirectTo(page) {
    window.location.href = page;
}

let currentUser = null;
let feedPosts = [];
let activePostId = null;
let activePost = null;

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function showPostError(message) {
    const errorElement = document.getElementById("post-error");
    if (!errorElement) return;
    errorElement.textContent = message;
}

function clearPostError() {
    showPostError("");
}

function showCommentError(message) {
    const errorElement = document.getElementById("comment-error");
    if (!errorElement) return;
    errorElement.textContent = message;
}

function clearCommentError() {
    showCommentError("");
}

// ---------- API helpers ----------

async function apiFetchCurrentUser() {
    const session = getSession();
    if (!session) return null;
    try {
        const res = await fetch("/api/users/" + session.userId);
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        return null;
    }
}

async function apiFetchFeed(userId) {
    const res = await fetch("/api/posts?userId=" + encodeURIComponent(userId));
    if (!res.ok) throw new Error("Failed to load feed");
    return res.json();
}

async function apiFetchPost(postId) {
    const res = await fetch("/api/posts/" + postId);
    if (!res.ok) return null;
    return res.json();
}

async function apiCreatePost(authorId, content) {
    const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId, content })
    });
    if (!res.ok) throw new Error("Failed to create post");
    return res.json();
}

async function apiDeletePost(postId, authorId) {
    const res = await fetch("/api/posts/" + postId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId })
    });
    if (!res.ok) throw new Error("Failed to delete post");
    return res.json();
}

async function apiToggleLike(postId, userId) {
    const res = await fetch("/api/posts/" + postId + "/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    });
    if (!res.ok) throw new Error("Failed to toggle like");
    return res.json();
}

async function apiAddComment(postId, authorId, content) {
    const res = await fetch("/api/posts/" + postId + "/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId, content })
    });
    if (!res.ok) throw new Error("Failed to add comment");
    return res.json();
}

// ---------- Rendering ----------

function setComposerAvatar() {
    const avatarElement = document.getElementById("composer-avatar");
    if (!avatarElement || !currentUser) return;
    avatarElement.textContent = getInitials(currentUser.username);
}

function getLikeCount(post) {
    if (post._count && typeof post._count.likes === "number") return post._count.likes;
    return Array.isArray(post.likes) ? post.likes.length : 0;
}

function getCommentCount(post) {
    if (post._count && typeof post._count.comments === "number") return post._count.comments;
    return Array.isArray(post.comments) ? post.comments.length : 0;
}

function hasUserLiked(post, userId) {
    if (!Array.isArray(post.likes)) return false;
    return post.likes.some(function (like) {
        return like.userId === userId;
    });
}

function createPostCard(post) {
    const author = post.author;
    if (!author || !currentUser) return "";
    const isOwnPost = post.authorId === currentUser.id;
    const hasLiked = hasUserLiked(post, currentUser.id);
    const likeCount = getLikeCount(post);
    const commentCount = getCommentCount(post);

    return `
        <article class="post-card" data-post-id="${post.id}" data-open-post-id="${post.id}">
            <div class="post-header">
                <div class="post-author">
                    <div class="post-avatar">${getInitials(author.username)}</div>
                    <div class="post-meta">
                        <a href="profile.html?id=${author.id}" class="post-username">${escapeHtml(author.username)}</a>
                        <p class="post-date">${formatDate(post.createdAt)}</p>
                    </div>
                </div>
            </div>

            <p class="post-content">${escapeHtml(post.content)}</p>

            <hr class="post-divider">

            <div class="post-footer">
                <div class="post-actions">
                    <button class="post-action-btn ${hasLiked ? "liked" : ""}" type="button" data-like-id="${post.id}" aria-pressed="${hasLiked}">
                        <i class="${hasLiked ? "fa-solid" : "fa-regular"} fa-heart"></i> ${likeCount}
                    </button>
                    <button class="post-action-btn" type="button" data-comment-open-id="${post.id}">
                        <i class="fa-regular fa-comment"></i> ${commentCount}
                    </button>
                </div>
                ${isOwnPost
            ? `
            <button class="post-delete-btn" type="button" data-delete-id="${post.id}" aria-label="Delete post">
                <i class="fa-solid fa-trash-can"></i>
            </button>
            `
            : ""
        }
            </div>
        </article>
    `;
}

function createCommentItem(comment) {
    const author = comment.author;
    if (!author) return "";

    return `
        <article class="comment-item">
            <div class="post-avatar comment-avatar">${getInitials(author.username)}</div>
            <div class="comment-body">
                <div class="comment-meta">
                    <a href="profile.html?id=${author.id}" class="post-username">${escapeHtml(author.username)}</a>
                    <p class="post-date">${formatDate(comment.createdAt)}</p>
                </div>
                <p class="comment-content">${escapeHtml(comment.content)}</p>
            </div>
        </article>
    `;
}

function renderPostModal(post) {
    const modal = document.getElementById("post-modal");
    const avatar = document.getElementById("modal-post-avatar");
    const username = document.getElementById("modal-post-username");
    const date = document.getElementById("modal-post-date");
    const content = document.getElementById("post-modal-title");
    const commentsContainer = document.getElementById("modal-comments");
    if (!modal || !post || !post.author || !avatar || !username || !date || !content || !commentsContainer) {
        return;
    }

    avatar.textContent = getInitials(post.author.username);
    username.textContent = post.author.username;
    date.textContent = formatDate(post.createdAt);
    content.textContent = post.content;

    if (!post.comments || post.comments.length === 0) {
        commentsContainer.innerHTML = `
            <p class="modal-empty-comments">No comments yet. Start the discussion.</p>
        `;
    } else {
        commentsContainer.innerHTML = post.comments.map(createCommentItem).join("");
    }
}

async function openPostModal(postId) {
    const modal = document.getElementById("post-modal");
    const commentInput = document.getElementById("comment-content");
    if (!modal) return;

    const post = await apiFetchPost(postId);
    if (!post) return;

    activePostId = postId;
    activePost = post;
    renderPostModal(post);
    clearCommentError();
    modal.hidden = false;
    document.body.classList.add("modal-open");

    if (commentInput) {
        commentInput.value = "";
        commentInput.focus();
    }
}

function closePostModal() {
    const modal = document.getElementById("post-modal");
    if (!modal) return;

    modal.hidden = true;
    activePostId = null;
    activePost = null;
    clearCommentError();
    document.body.classList.remove("modal-open");
}

async function refreshFeed() {
    if (!currentUser) return;
    try {
        feedPosts = await apiFetchFeed(currentUser.id);
    } catch (err) {
        feedPosts = [];
    }
    renderPosts();
    document.dispatchEvent(new CustomEvent("posts-changed"));
}

function renderPosts() {
    const postsContainer = document.getElementById("posts-container");
    if (!postsContainer) return;
    if (!feedPosts || feedPosts.length === 0) {
        postsContainer.innerHTML = `
            <article class="post-card">
                <p class="post-content">
                    No posts yet. Follow users or create your first post.
                </p>
            </article>
        `;
        return;
    }
    postsContainer.innerHTML = feedPosts.map(createPostCard).join("");
}

// ---------- Event handlers ----------

async function handleCreatePost(event) {
    event.preventDefault();
    const input = document.getElementById("post-content");
    if (!input || !currentUser) return;
    const content = input.value.trim();
    clearPostError();
    if (!content) {
        showPostError("Post cannot be empty.");
        return;
    }
    try {
        await apiCreatePost(currentUser.id, content);
        input.value = "";
        await refreshFeed();
    } catch (err) {
        showPostError("Could not publish your post. Try again.");
    }
}

async function handleCreateComment(event) {
    event.preventDefault();
    const input = document.getElementById("comment-content");
    if (!currentUser || !input || !activePostId) return;
    const content = input.value.trim();
    clearCommentError();

    if (!content) {
        showCommentError("Comment cannot be empty.");
        return;
    }

    try {
        await apiAddComment(activePostId, currentUser.id, content);
        input.value = "";

        const fresh = await apiFetchPost(activePostId);
        if (fresh) {
            activePost = fresh;
            renderPostModal(fresh);
        }
        await refreshFeed();
    } catch (err) {
        showCommentError("Could not post your comment. Try again.");
    }
}

async function deletePost(postId) {
    if (!currentUser) return;
    try {
        await apiDeletePost(postId, currentUser.id);
        await refreshFeed();
    } catch (err) {
        // silently fail; feed will reflect state on next refresh
    }
}

async function toggleLike(postId) {
    if (!currentUser) return;
    try {
        await apiToggleLike(postId, currentUser.id);
        await refreshFeed();
    } catch (err) {
        // silently fail
    }
}

function handlePostsClick(event) {
    const likeButton = event.target.closest("[data-like-id]");
    const commentButton = event.target.closest("[data-comment-open-id]");
    const deleteButton = event.target.closest("[data-delete-id]");
    const postCard = event.target.closest("[data-open-post-id]");

    if (likeButton) {
        toggleLike(likeButton.dataset.likeId);
        return;
    }

    if (commentButton) {
        openPostModal(commentButton.dataset.commentOpenId);
        return;
    }

    if (deleteButton) {
        deletePost(deleteButton.dataset.deleteId);
        return;
    }

    if (!postCard) return;

    openPostModal(postCard.dataset.openPostId);
}

function handleLogout() {
    clearSession();
    redirectTo("login.html");
}

function handleDocumentKeydown(event) {
    if (event.key === "Escape") {
        closePostModal();
    }
}

async function initializeFeed() {
    const session = getSession();
    if (!session) {
        redirectTo("login.html");
        return;
    }

    currentUser = await apiFetchCurrentUser();
    if (!currentUser) {
        clearSession();
        redirectTo("login.html");
        return;
    }

    setComposerAvatar();
    await refreshFeed();

    const form = document.getElementById("post-form");
    const commentForm = document.getElementById("comment-form");
    const logoutBtn = document.getElementById("logout-btn");
    const postsContainer = document.getElementById("posts-container");
    const closeModalBtn = document.getElementById("close-post-modal");
    const modalOverlay = document.getElementById("post-modal-overlay");

    if (form) {
        form.addEventListener("submit", handleCreatePost);
    }

    if (commentForm) {
        commentForm.addEventListener("submit", handleCreateComment);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", handleLogout);
    }

    if (postsContainer) {
        postsContainer.addEventListener("click", handlePostsClick);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closePostModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", closePostModal);
    }

    document.addEventListener("keydown", handleDocumentKeydown);
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("post-form")) {
        initializeFeed();
    }
});
