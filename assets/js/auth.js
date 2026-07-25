/**
 * TaskPulse Pro - Authentication & Session Management Module
 * Allied Software Engineers Internship - Task 4
 */

const AuthModule = (function () {
    const STORAGE_KEY_AUTH = "taskpulse_auth_user";

    // Predefined authorized demo accounts
    const VALID_USERS = [
        { email: "admin@enterprise.com", password: "password123", name: "Muhammad Ahsan", role: "Project Lead" },
        { email: "wasiya@enterprise.com", password: "password123", name: "Wasiya Khan", role: "Frontend Engineer" },
        { email: "intern@enterprise.com", password: "password123", name: "Software Intern", role: "Developer" }
    ];

    function init() {
        bindEvents();
        checkExistingSession();
    }

    function bindEvents() {
        const loginForm = document.getElementById("loginForm");
        const logoutBtn = document.getElementById("logoutBtn");
        const togglePasswordBtn = document.getElementById("togglePasswordBtn");

        if (loginForm) {
            loginForm.addEventListener("submit", handleLogin);
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", handleLogout);
        }

        if (togglePasswordBtn) {
            togglePasswordBtn.addEventListener("click", function () {
                const passInput = document.getElementById("loginPassword");
                const icon = this.querySelector("i");
                if (passInput.type === "password") {
                    passInput.type = "text";
                    icon.className = "fa-solid fa-eye-slash";
                } else {
                    passInput.type = "password";
                    icon.className = "fa-solid fa-eye";
                }
            });
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const emailInput = document.getElementById("loginEmail");
        const passwordInput = document.getElementById("loginPassword");
        const alertBox = document.getElementById("authAlert");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let isValid = true;

        // Reset errors
        emailInput.parentElement.classList.remove("has-error");
        passwordInput.parentElement.parentElement.classList.remove("has-error");
        alertBox.style.display = "none";

        if (!email || !validateEmail(email)) {
            emailInput.parentElement.classList.add("has-error");
            isValid = false;
        }

        if (!password || password.length < 6) {
            passwordInput.parentElement.parentElement.classList.add("has-error");
            isValid = false;
        }

        if (!isValid) return;

        // Verify credentials
        const user = VALID_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (user) {
            const sessionData = {
                email: user.email,
                name: user.name,
                role: user.role,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(sessionData));
            showAuthenticatedUI(sessionData);
            if (window.AppModule) window.AppModule.showToast("Successfully authenticated. Welcome " + user.name + "!");
        } else {
            alertBox.style.display = "flex";
        }
    }

    function handleLogout() {
        localStorage.removeItem(STORAGE_KEY_AUTH);
        showLoginUI();
        if (window.AppModule) window.AppModule.showToast("Logged out safely.");
    }

    function checkExistingSession() {
        const session = getCurrentUser();
        if (session) {
            showAuthenticatedUI(session);
        } else {
            showLoginUI();
        }
    }

    function getCurrentUser() {
        try {
            const data = localStorage.getItem(STORAGE_KEY_AUTH);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    function showAuthenticatedUI(user) {
        document.getElementById("loginView").style.display = "none";
        document.getElementById("appHeader").style.display = "flex";
        document.getElementById("userNameDisplay").textContent = user.name;
        document.getElementById("userAvatar").textContent = user.name.charAt(0).toUpperCase();

        if (window.AppModule) {
            window.AppModule.switchView("dashboardView");
            window.AppModule.refreshAllModules();
        }
    }

    function showLoginUI() {
        document.getElementById("loginView").style.display = "block";
        document.getElementById("appHeader").style.display = "none";
        document.getElementById("dashboardView").style.display = "none";
        document.getElementById("tasksView").style.display = "none";
        document.getElementById("reportsView").style.display = "none";
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    return {
        init: init,
        getCurrentUser: getCurrentUser
    };
})();
