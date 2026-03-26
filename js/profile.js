


document.addEventListener("DOMContentLoaded",()=>{

    const session = getSession();
    if(!session){
        window.location.href = "index.html";
        return;
    }

    const currentUserId = session.userId;

    const params = new URLSearchParams(window.location.search);
    const profileId = params.get("id");
    const profileUserId = profileId ? profileId : currentUserId;
    const user = getUserById(profileUserId);

    renderProfile(user);
    renderProfilePosts(user, currentUserId);

    document.querySelector("#edit-profile-btn").addEventListener("click", () => {
        document.querySelector("#edit-username").value = user.username;
        document.querySelector("#edit-bio").value = user.bio || "";
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

    document.querySelector("#save-profile-btn").addEventListener("click", () => {
    const newUsername = document.querySelector("#edit-username").value.trim();
    const newBio = document.querySelector("#edit-bio").value.trim();

    if (!newUsername) {
        alert("Username cannot be empty");
        return;
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUserId);
    users[userIndex].username = newUsername;
    users[userIndex].bio = newBio;
    saveUsers(users);

    user.username = newUsername;
    user.bio = newBio;

    document.querySelector("#edit-modal").classList.add("hidden");
    renderProfile(user);
    renderProfilePosts(user, currentUserId);
});


    if (profileUserId === currentUserId) {
        document.querySelector("#edit-profile-btn").classList.remove("hidden");
        document.querySelector("#follow-btn").classList.add("hidden");
} else {
        document.querySelector("#edit-profile-btn").classList.add("hidden");
        const followBtn = document.querySelector("#follow-btn");
        followBtn.classList.remove("hidden");
        const currentUser = getUserById(currentUserId);
        followBtn.textContent = currentUser.following.includes(profileUserId) ? "Unfollow" : "Follow";

        followBtn.addEventListener("click", () => {
            const users = getUsers();
            const me = users.find(u => u.id === currentUserId);
            if (me.following.includes(profileUserId)) {
                me.following = me.following.filter(id => id !== profileUserId);
            } else {
                me.following.push(profileUserId);
            }
            saveUsers(users);
            followBtn.textContent = me.following.includes(profileUserId) ? "Unfollow" : "Follow";
            renderProfile(user);
        });
}

        document.querySelector("#profile-posts-container").addEventListener("click", (e) => {
    const commentBtn = e.target.closest("[data-comment-open-id]");
    const likeBtn = e.target.closest("[data-like-id]");

    if (commentBtn) {
        openPostModal(commentBtn.dataset.commentOpenId);
    }

    if (likeBtn) {
        toggleLike(likeBtn.dataset.likeId);
        
        renderProfilePosts(user, currentUserId);
        renderProfile(user);
    }
});


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

})

function renderProfile(user) {
    document.querySelector("#profile-avatar").textContent = getInitials(user.username);
    document.querySelector("#profile-avatar").style.backgroundColor = "#FC7303";

    document.querySelector("#profile-username").textContent = user.username;
    document.querySelector("#profile-bio").textContent = user.bio || "No bio yet.";

    const allPosts = getPosts();
    const userPosts = allPosts.filter(post => post.authorId === user.id);
    const allUsers = getUsers();
    const followers = allUsers.filter(u => u.following.includes(user.id));

    document.querySelector("#posts-count").textContent = userPosts.length;
    document.querySelector("#following-count").textContent = user.following.length;
    document.querySelector("#followers-count").textContent = followers.length;
}

function renderProfilePosts(user, currentUserId){

    const allPosts = getPosts();
    const userPosts = allPosts.filter(post => post.authorId === user.id);
    if (userPosts.length === 0) {
    document.querySelector("#profile-posts-container").innerHTML = "<p>No posts yet.</p>";
    return;
    }
    const html = userPosts.map(post => {
        const hasLiked = post.likes.includes(currentUserId);
        return `
    <div class="post-card">
        <div class="post-meta">${formatDate(post.createdAt)}</div>
        <p class="post-content">${post.content}</p>
        <div class="post-actions">
                    <button class="post-action-btn ${hasLiked ? "liked" : ""}" type="button" data-like-id="${post.id}" aria-pressed="${hasLiked}">
                        <i class="${hasLiked ? "fa-solid" : "fa-regular"} fa-heart"></i> ${post.likes.length}
                    </button>
                    <button class="post-action-btn" type="button" data-comment-open-id="${post.id}">
                        <i class="fa-regular fa-comment"></i> ${post.comments.length}
                    </button>
                </div>
                
    </div>
    `}).join("");
    document.querySelector("#profile-posts-container").innerHTML = html;

    



}