// ============================================
// SESSION HELPERS (localStorage)
// ============================================
// All user/post data now lives in the database
// and is accessed through the /api/* endpoints.
// Only the session is kept in localStorage so the
// browser remembers who is logged in across reloads.
//
// SESSION object: { userId: "<cuid>" }
// ============================================

function getSession() {
    return JSON.parse(localStorage.getItem("session")) || null;
}

function saveSession(userId) {
    localStorage.setItem("session", JSON.stringify({ userId: userId }));
}

function clearSession() {
    localStorage.removeItem("session");
}
