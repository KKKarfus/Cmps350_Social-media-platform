function redirectTo(page) {
    window.location.href = page;
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (!errorElement) return;
    errorElement.textContent = message;
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (!errorElement) return;
    errorElement.textContent = "";
}

async function handleLoginSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = normalizeEmail(emailInput.value);
    const password = passwordInput.value.trim();

    clearError("login-error");

    try {
        const res = await fetch("/api/users");
        if (!res.ok) {
            showError("login-error", "Could not reach the server.");
            return;
        }
        const users = await res.json();

        const matchedUser = users.find(function (user) {
            return user.email.toLowerCase() === email && user.password === password;
        });

        if (!matchedUser) {
            showError("login-error", "Invalid email or password.");
            return;
        }

        saveSession(matchedUser.id);
        redirectTo("feed.html");
    } catch (err) {
        showError("login-error", "Could not reach the server. Make sure the API is running.");
    }
}

async function handleRegisterSubmit(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    const username = usernameInput.value.trim();
    const email = normalizeEmail(emailInput.value);
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    clearError("register-error");

    if (password !== confirmPassword) {
        showError("register-error", "Passwords do not match.");
        return;
    }

    try {
        const existingRes = await fetch("/api/users");
        if (existingRes.ok) {
            const existingUsers = await existingRes.json();
            const duplicate = existingUsers.find(function (user) {
                return user.email.toLowerCase() === email;
            });
            if (duplicate) {
                showError("register-error", "This email is already registered.");
                return;
            }
        }

        const createRes = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, bio: "" })
        });

        const created = await createRes.json();

        if (!createRes.ok || created.error) {
            const message = (created && created.error) || "Registration failed.";
            const looksLikeDuplicate = /unique|email/i.test(message);
            showError("register-error", looksLikeDuplicate ? "This email is already registered." : message);
            return;
        }

        saveSession(created.id);
        redirectTo("feed.html");
    } catch (err) {
        showError("register-error", "Could not reach the server. Make sure the API is running.");
    }
}

function protectAuthPages() {
    const session = getSession();
    const currentPage = window.location.pathname.split("/").pop();

    if (session && (currentPage === "index.html" || currentPage === "register.html" || currentPage === "")) {
        redirectTo("feed.html");
    }
}

function initializeAuth() {
    protectAuthPages();

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegisterSubmit);
    }
}

document.addEventListener("DOMContentLoaded", initializeAuth);
