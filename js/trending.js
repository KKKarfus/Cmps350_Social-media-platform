const TRENDING_AVATAR_COLORS = [
    "#d4845a", "#c27a4e", "#b08060", "#a87050",
    "#c99070", "#b5785a", "#d09878", "#a86848"
];

function trendingAvatarColor(userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return TRENDING_AVATAR_COLORS[Math.abs(hash) % TRENDING_AVATAR_COLORS.length];
}

let trendingCurrentUser = null;
let trendingUsers = [];
let trendingFollowingIds = new Set();

async function trendingApiGetAllUsers() {
    const res = await fetch("/api/users");
    if (!res.ok) return [];
    return res.json();
}

async function trendingApiGetUser(userId) {
    const res = await fetch("/api/users/" + userId);
    if (!res.ok) return null;
    return res.json();
}

async function trendingApiGetFollowing(userId) {
    const res = await fetch("/api/users/" + userId + "/following");
    if (!res.ok) return [];
    return res.json();
}

async function trendingApiFollow(targetId, followerId) {
    const res = await fetch("/api/users/" + targetId + "/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId })
    });
    if (!res.ok) throw new Error("Failed to follow");
    return res.json();
}

async function trendingApiUnfollow(targetId, followerId) {
    const res = await fetch("/api/users/" + targetId + "/follow", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId })
    });
    if (!res.ok) throw new Error("Failed to unfollow");
    return res.json();
}

async function toggleTrendingFollow(targetId) {
    if (!trendingCurrentUser) return;
    try {
        if (trendingFollowingIds.has(targetId)) {
            await trendingApiUnfollow(targetId, trendingCurrentUser.id);
            trendingFollowingIds.delete(targetId);
        } else {
            await trendingApiFollow(targetId, trendingCurrentUser.id);
            trendingFollowingIds.add(targetId);
        }
        await reloadTrending();
    } catch (err) {
        // ignore
    }
}

function createRankBadge(rank) {
    const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
    const badge = document.createElement("div");
    badge.className = "rank-badge" + (rank <= 3 ? " rank-" + rank : "");
    badge.textContent = medals[rank] || rank;
    return badge;
}

function createTrendingRow(user, rank, followerCount) {
    const row = document.createElement("div");
    row.className = "trending-row" + (rank <= 3 ? " rank-" + rank : "");

    const initials = getInitials(user.username);
    const avatarColor = trendingAvatarColor(user.id);
    const isSelf = user.id === trendingCurrentUser.id;
    const following = trendingFollowingIds.has(user.id);

    row.appendChild(createRankBadge(rank));

    const avatar = document.createElement("div");
    avatar.className = "trending-avatar";
    avatar.style.backgroundColor = avatarColor;
    avatar.textContent = initials;
    const avatarLink = document.createElement("a");
    avatarLink.href = "profile.html?id=" + user.id;
    avatarLink.appendChild(avatar);
    row.appendChild(avatarLink);

    const info = document.createElement("div");
    info.className = "trending-info";
    info.innerHTML =
        '<a href="profile.html?id=' + user.id + '" class="profile-card-link"><h3 class="trending-name">' + user.username + '</h3></a>' +
        '<p class="trending-bio">' + (user.bio || "") + '</p>';
    row.appendChild(info);

    const countEl = document.createElement("div");
    countEl.className = "follower-count";
    countEl.innerHTML =
        '<span class="follower-number">' + followerCount + '</span>' +
        '<span class="follower-label">Followers</span>';
    row.appendChild(countEl);

    const btn = document.createElement("button");
    btn.className = "follow-btn " + (isSelf ? "hidden" : (following ? "following" : "follow"));
    btn.dataset.userId = user.id;
    btn.textContent = isSelf ? "" : (following ? "Following" : "Follow");

    if (!isSelf) {
        btn.addEventListener("click", function () {
            toggleTrendingFollow(user.id);
        });
    }
    row.appendChild(btn);

    return row;
}

function renderTrending() {
    if (!trendingCurrentUser) return;

    const ranked = trendingUsers
        .map(function (u) {
            const followers = (u._count && u._count.followers) || 0;
            return { user: u, followers };
        })
        .sort(function (a, b) {
            return b.followers - a.followers || a.user.username.localeCompare(b.user.username);
        });

    const list = document.getElementById("trending-list");
    list.innerHTML = "";

    if (ranked.length === 0) {
        const empty = document.createElement("p");
        empty.className = "trending-empty";
        empty.textContent = "No users found.";
        list.appendChild(empty);
        return;
    }

    ranked.forEach(function (entry, index) {
        list.appendChild(
            createTrendingRow(entry.user, index + 1, entry.followers)
        );
    });
}

async function reloadTrending() {
    if (!trendingCurrentUser) return;
    const [allUsers, followingList] = await Promise.all([
        trendingApiGetAllUsers(),
        trendingApiGetFollowing(trendingCurrentUser.id)
    ]);
    trendingUsers = allUsers;
    trendingFollowingIds = new Set(followingList.map(function (f) {
        return f.followingId;
    }));
    renderTrending();
}

function handleTrendingLogout() {
    clearSession();
    window.location.href = "index.html";
}

async function initTrending() {
    const session = getSession();
    if (!session) {
        window.location.href = "index.html";
        return;
    }

    trendingCurrentUser = await trendingApiGetUser(session.userId);
    if (!trendingCurrentUser) {
        clearSession();
        window.location.href = "index.html";
        return;
    }

    document.getElementById("logout-btn").addEventListener("click", function (e) {
        e.preventDefault();
        handleTrendingLogout();
    });

    await reloadTrending();
}

document.addEventListener("DOMContentLoaded", initTrending);
