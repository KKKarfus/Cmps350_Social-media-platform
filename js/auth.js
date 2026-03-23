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

function handleLoginSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = normalizeEmail(emailInput.value);
    const password = passwordInput.value.trim();

    clearError("login-error");

    const users = getUsers();
    const matchedUser = users.find(function (user) {
        return user.email.toLowerCase() === email && user.password === password;
    });

    if (!matchedUser) {
        showError("login-error", "Invalid email or password.");
        return;
    }

    saveSession(matchedUser.id);
    redirectTo("feed.html");
}

function handleRegisterSubmit(event) {
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

    const users = getUsers();
    const existingUser = users.find(function (user) {
        return user.email.toLowerCase() === email;
    });

    if (existingUser) {
        showError("register-error", "This email is already registered.");
        return;
    }

    const newUser = {
        id: generateId("u"),
        username: username,
        email: email,
        password: password,
        bio: "",
        following: [],
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    saveSession(newUser.id);
    redirectTo("feed.html");
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