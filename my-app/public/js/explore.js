const AVATAR_COLORS = [
    "#d4845a", "#c27a4e", "#b08060", "#a87050",
    "#c99070", "#b5785a", "#d09878", "#a86848"
];

function getAvatarColor(userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

let exploreCurrentUser = null;
let exploreAllUsers = [];
let exploreFollowingIds = new Set();

async function apiGetAllUsers() {
    const res = await fetch("/api/users");
    if (!res.ok) return [];
    return res.json();
}

async function apiGetUser(userId) {
    const res = await fetch("/api/users/" + userId);
    if (!res.ok) return null;
    return res.json();
}

async function apiGetFollowing(userId) {
    const res = await fetch("/api/users/" + userId + "/following");
    if (!res.ok) return [];
    return res.json();
}

async function apiFollowUser(targetId, followerId) {
    const res = await fetch("/api/users/" + targetId + "/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId })
    });
    if (!res.ok) throw new Error("Failed to follow");
    return res.json();
}

async function apiUnfollowUser(targetId, followerId) {
    const res = await fetch("/api/users/" + targetId + "/follow", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId })
    });
    if (!res.ok) throw new Error("Failed to unfollow");
    return res.json();
}

async function toggleFollow(targetId) {
    if (!exploreCurrentUser) return;
    try {
        if (exploreFollowingIds.has(targetId)) {
            await apiUnfollowUser(targetId, exploreCurrentUser.id);
            exploreFollowingIds.delete(targetId);
        } else {
            await apiFollowUser(targetId, exploreCurrentUser.id);
            exploreFollowingIds.add(targetId);
        }
        renderProfiles();
    } catch (err) {
        // ignore
    }
}

function createProfileCard(user) {
    const card = document.createElement("div");
    card.className = "profile-card";

    const initials = getInitials(user.username);
    const avatarColor = getAvatarColor(user.id);
    const following = exploreFollowingIds.has(user.id);

    card.innerHTML =
        '<a href="profile.html?id=' + user.id + '" class="profile-card-link">' +
        '<div class="profile-avatar" style="background-color: ' + avatarColor + '">' +
        initials +
        '</div>' +
        '<h3 class="profile-name">' + user.username + '</h3>' +
        '<p class="profile-bio">' + (user.bio || "") + '</p>' +
        '</a>' +
        '<button class="follow-btn ' + (following ? 'following' : 'follow') + '" data-user-id="' + user.id + '">' +
        (following ? 'Following' : 'Follow') +
        '</button>';

    const btn = card.querySelector(".follow-btn");
    btn.addEventListener("click", function () {
        toggleFollow(user.id);
    });

    return card;
}

function renderProfiles() {
    if (!exploreCurrentUser) return;

    const grid = document.getElementById("profiles-grid");
    grid.innerHTML = "";

    const otherUsers = exploreAllUsers.filter(function (u) {
        return u.id !== exploreCurrentUser.id;
    });

    otherUsers.forEach(function (user) {
        grid.appendChild(createProfileCard(user));
    });
}

function handleLogout() {
    clearSession();
    window.location.href = "login.html";
}

async function initExplore() {
    const session = getSession();
    if (!session) {
        window.location.href = "login.html";
        return;
    }

    exploreCurrentUser = await apiGetUser(session.userId);
    if (!exploreCurrentUser) {
        clearSession();
        window.location.href = "login.html";
        return;
    }

    document.getElementById("logout-btn").addEventListener("click", function (e) {
        e.preventDefault();
        handleLogout();
    });

    const [allUsers, followingList] = await Promise.all([
        apiGetAllUsers(),
        apiGetFollowing(exploreCurrentUser.id)
    ]);

    exploreAllUsers = allUsers;
    exploreFollowingIds = new Set(followingList.map(function (f) {
        return f.followingId;
    }));

    renderProfiles();
}

document.addEventListener("DOMContentLoaded", initExplore);
