/**
 * TaskPulse Pro - App Controller, Theme Toggle & Bonus Features
 * Allied Software Engineers Internship - Task 4
 */

const AppModule = (function () {

    function init() {
        AuthModule.init();
        TasksModule.init();
        bindGlobalEvents();
        setupThemeToggle();
    }

    function bindGlobalEvents() {
        // Navigation View Switcher
        const navBtns = document.querySelectorAll(".nav-btn");
        navBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const targetView = this.getAttribute("data-target");
                switchView(targetView);
            });
        });

        // Search & Filter Listeners
        const searchInput = document.getElementById("employeeSearchInput");
        const priorityFilter = document.getElementById("priorityFilter");
        const statusFilter = document.getElementById("statusFilter");
        const resetFiltersBtn = document.getElementById("resetFiltersBtn");

        if (searchInput) searchInput.addEventListener("input", triggerFilter);
        if (priorityFilter) priorityFilter.addEventListener("change", triggerFilter);
        if (statusFilter) statusFilter.addEventListener("change", triggerFilter);
        
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener("click", function () {
                if (searchInput) searchInput.value = "";
                if (priorityFilter) priorityFilter.value = "ALL";
                if (statusFilter) statusFilter.value = "ALL";
                triggerFilter();
            });
        }

        // Bonus Feature: Print Report
        const printBtn = document.getElementById("printReportBtn");
        if (printBtn) {
            printBtn.addEventListener("click", function () {
                window.print();
            });
        }

        // Bonus Feature: Export Tasks to JSON
        const exportBtn = document.getElementById("exportJsonBtn");
        if (exportBtn) {
            exportBtn.addEventListener("click", exportTasksToJSON);
        }
    }

    function switchView(viewId) {
        document.querySelectorAll(".view-section").forEach(sec => sec.style.display = "none");
        document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

        const activeSec = document.getElementById(viewId);
        if (activeSec) activeSec.style.display = "block";

        const activeNav = document.querySelector(`.nav-btn[data-target="${viewId}"]`);
        if (activeNav) activeNav.classList.add("active");

        refreshAllModules();
    }

    function triggerFilter() {
        const searchVal = document.getElementById("employeeSearchInput").value;
        const prioVal = document.getElementById("priorityFilter").value;
        const statusVal = document.getElementById("statusFilter").value;

        TasksModule.renderTasksTable(searchVal, prioVal, statusVal);
    }

    function refreshAllModules() {
        triggerFilter();
        DashboardModule.renderMetrics();
    }

    function setupThemeToggle() {
        const toggleBtn = document.getElementById("themeToggleBtn");
        const html = document.documentElement;

        // Load saved theme or default light
        const savedTheme = localStorage.getItem("taskpulse_theme") || "light";
        html.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);

        if (toggleBtn) {
            toggleBtn.addEventListener("click", function () {
                const current = html.getAttribute("data-theme");
                const next = current === "light" ? "dark" : "light";
                html.setAttribute("data-theme", next);
                localStorage.setItem("taskpulse_theme", next);
                updateThemeIcon(next);
                showToast(`Switched to ${next} theme mode.`);
            });
        }
    }

    function updateThemeIcon(theme) {
        const icon = document.querySelector("#themeToggleBtn i");
        if (icon) {
            icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    }

    function exportTasksToJSON() {
        const tasks = TasksModule.getAllTasks();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `TaskPulse_Export_${new Date().toISOString().split("T")[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast("Tasks database exported to JSON file.");
    }

    function showToast(message) {
        const container = document.getElementById("toastContainer");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    return {
        init: init,
        switchView: switchView,
        refreshAllModules: refreshAllModules,
        showToast: showToast
    };
})();

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", AppModule.init);
