function redirectTo(page) {
    window.location.href = page;
}

let activePostId = null;

function getCurrentUser() {
    const session = getSession();
    if (!session) {
        return null;
    }
    return getUserById(session.userId);
}

function protectFeedPage() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        redirectTo("index.html");
    }
}

function setComposerAvatar() {
    const avatarElement = document.getElementById("composer-avatar");
    const currentUser = getCurrentUser();
    if (!avatarElement || !currentUser) return;
    avatarElement.textContent = getInitials(currentUser.username);
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

// 
function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function getVisiblePosts() {
    const currentUser = getCurrentUser();
    const posts = getPosts();
    const visiblePosts = posts.filter(function (post) {
        return (
            post.authorId === currentUser.id ||
            currentUser.following.includes(post.authorId)
        );
    });
    visiblePosts.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return visiblePosts;
}

function createPostCard(post) {
    const author = getUserById(post.authorId);
    const currentUser = getCurrentUser();
    if (!author || !currentUser) return "";
    const isOwnPost = post.authorId === currentUser.id;
    const hasLiked = post.likes.includes(currentUser.id);

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
                        <i class="${hasLiked ? "fa-solid" : "fa-regular"} fa-heart"></i> ${post.likes.length}
                    </button>
                    <button class="post-action-btn" type="button" data-comment-open-id="${post.id}">
                        <i class="fa-regular fa-comment"></i> ${post.comments.length}
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

function getPostById(postId) {
    return getPosts().find(function (post) {
        return post.id === postId;
    }) || null;
}

function createCommentItem(comment) {
    const author = getUserById(comment.authorId);
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

function renderPostModal(postId) {
    const post = getPostById(postId);
    const author = post ? getUserById(post.authorId) : null;
    const modal = document.getElementById("post-modal");
    const avatar = document.getElementById("modal-post-avatar");
    const username = document.getElementById("modal-post-username");
    const date = document.getElementById("modal-post-date");
    const content = document.getElementById("post-modal-title");
    const commentsContainer = document.getElementById("modal-comments");
    if (!modal || !post || !author || !avatar || !username || !date || !content || !commentsContainer) {
        return;
    }

    avatar.textContent = getInitials(author.username);
    username.textContent = author.username;
    date.textContent = formatDate(post.createdAt);
    content.textContent = post.content;

    if (post.comments.length === 0) {
        commentsContainer.innerHTML = `
            <p class="modal-empty-comments">No comments yet. Start the discussion.</p>
        `;
    } else {
        commentsContainer.innerHTML = post.comments.map(createCommentItem).join("");
    }
}

function openPostModal(postId) {
    const modal = document.getElementById("post-modal");
    const commentInput = document.getElementById("comment-content");
    if (!modal || !getPostById(postId)) return;

    activePostId = postId;
    renderPostModal(postId);
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
    clearCommentError();
    document.body.classList.remove("modal-open");
}

function renderPosts() {
    const postsContainer = document.getElementById("posts-container");
    if (!postsContainer) return;
    const visiblePosts = getVisiblePosts();
    if (visiblePosts.length === 0) {
        postsContainer.innerHTML = `
            <article class="post-card">
                <p class="post-content">
                    No posts yet. Follow users or create your first post.
                </p>
            </article>
        `;
        return;
    }
    postsContainer.innerHTML = visiblePosts.map(createPostCard).join("");
}

function handleCreatePost(event) {
    event.preventDefault();
    const input = document.getElementById("post-content");
    const currentUser = getCurrentUser();
    if (!input || !currentUser) return;
    const content = input.value.trim();
    clearPostError();
    if (!content) {
        showPostError("Post cannot be empty.");
        return;
    }
    const posts = getPosts();

    const newPost = {
        id: generateId("p"),
        authorId: currentUser.id,
        content: content,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
    };
    posts.push(newPost);
    savePosts(posts);
    input.value = "";
    renderPosts();
}

function handleCreateComment(event) {
    event.preventDefault();
    const currentUser = getCurrentUser();
    const input = document.getElementById("comment-content");
    const posts = getPosts();
    if (!currentUser || !input || !activePostId) return;
    const content = input.value.trim();
    clearCommentError();

    if (!content) {
        showCommentError("Comment cannot be empty.");
        return;
    }

    const updatedPosts = posts.map(function (post) {
        if (post.id !== activePostId) {
            return post;
        }

        return {
            ...post,
            comments: post.comments.concat({
                id: generateId("c"),
                authorId: currentUser.id,
                content: content,
                createdAt: new Date().toISOString()
            })
        };
    });

    savePosts(updatedPosts);
    input.value = "";
    renderPosts();
    renderPostModal(activePostId);
}

function deletePost(postId) {
    const currentUser = getCurrentUser();
    const posts = getPosts();
    if (!currentUser) return;

    const postToDelete = posts.find(function (post) {
        return post.id === postId;
    });

    if (!postToDelete) return;

    if (postToDelete.authorId !== currentUser.id) {
        return;
    }

    const updatedPosts = posts.filter(function (post) {
        return post.id !== postId;
    });

    savePosts(updatedPosts);
    renderPosts();
}

function toggleLike(postId) {
    const currentUser = getCurrentUser();
    const posts = getPosts();
    if (!currentUser) return;

    const updatedPosts = posts.map(function (post) {
        if (post.id !== postId) {
            return post;
        }

        const hasLiked = post.likes.includes(currentUser.id);

        return {
            ...post,
            likes: hasLiked
                ? post.likes.filter(function (userId) {
                    return userId !== currentUser.id;
                })
                : post.likes.concat(currentUser.id)
        };
    });

    savePosts(updatedPosts);
    renderPosts();
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
    redirectTo("index.html");
}

// closes the model using ESC
function handleDocumentKeydown(event) {
    if (event.key === "Escape") {
        closePostModal();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("post-form")) {
        initializeFeed();
    }
});
function initializeFeed() {
    protectFeedPage();
    setComposerAvatar();
    renderPosts();

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


