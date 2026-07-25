/**
 * TaskPulse Pro - Task Management & LocalStorage Data Engine
 * Allied Software Engineers Internship - Task 4
 */

const TasksModule = (function () {
    const STORAGE_KEY_TASKS = "taskpulse_tasks_db";

    // Initial Default Mock Seed Data if localStorage is empty
    const INITIAL_SEED_TASKS = [
        {
            id: "TSK-101",
            title: "Configure CI/CD Deployment Pipeline",
            projectName: "DevOps Infrastructure",
            assignedEmployee: "Muhammad Ahsan",
            priority: "High",
            startDate: "2026-07-01",
            dueDate: "2026-07-05", // Overdue task relative to July 26, 2026
            status: "In Progress"
        },
        {
            id: "TSK-102",
            title: "Design Responsive Task Dashboard UI",
            projectName: "TaskPulse Web App",
            assignedEmployee: "Wasiya Khan",
            priority: "High",
            startDate: "2026-07-10",
            dueDate: "2026-07-20", // Overdue
            status: "Pending"
        },
        {
            id: "TSK-103",
            title: "Implement Form Input Validation & LocalStorage",
            projectName: "TaskPulse Web App",
            assignedEmployee: "Wasiya Khan",
            priority: "Medium",
            startDate: "2026-07-15",
            dueDate: "2026-07-25",
            status: "Completed"
        },
        {
            id: "TSK-104",
            title: "Prepare Unit Test Cases & Documentation",
            projectName: "Quality Assurance",
            assignedEmployee: "Software Intern",
            priority: "Low",
            startDate: "2026-07-20",
            dueDate: "2026-07-28",
            status: "In Progress"
        }
    ];

    let tasksData = [];

    function init() {
        loadTasks();
        bindEvents();
    }

    function loadTasks() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_TASKS);
            if (raw) {
                tasksData = JSON.parse(raw);
            } else {
                tasksData = [...INITIAL_SEED_TASKS];
                saveTasks();
            }
        } catch (e) {
            tasksData = [...INITIAL_SEED_TASKS];
        }
        recalculateOverdueStatus();
    }

    function saveTasks() {
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasksData));
    }

    // Business Logic: Automatically update status to 'Overdue' if date < today and not completed
    function recalculateOverdueStatus() {
        const todayStr = new Date().toISOString().split("T")[0];
        let updated = false;

        tasksData.forEach(task => {
            if (task.status !== "Completed") {
                if (task.dueDate < todayStr) {
                    if (task.status !== "Overdue") {
                        task.status = "Overdue";
                        updated = true;
                    }
                } else if (task.status === "Overdue" && task.dueDate >= todayStr) {
                    task.status = "In Progress";
                    updated = true;
                }
            }
        });

        if (updated) saveTasks();
    }

    function bindEvents() {
        const taskForm = document.getElementById("taskForm");
        const openModalBtn = document.getElementById("openTaskModalBtn");
        const quickNewTaskBtn = document.getElementById("quickNewTaskBtn");
        const closeModalBtn = document.getElementById("closeTaskModalBtn");
        const cancelModalBtn = document.getElementById("cancelTaskModalBtn");

        if (openModalBtn) openModalBtn.addEventListener("click", () => openTaskModal());
        if (quickNewTaskBtn) quickNewTaskBtn.addEventListener("click", () => openTaskModal());
        if (closeModalBtn) closeModalBtn.addEventListener("click", closeTaskModal);
        if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeTaskModal);

        if (taskForm) {
            taskForm.addEventListener("submit", handleTaskSubmit);
        }

        // Live validation for due date vs start date
        const startDateInput = document.getElementById("startDate");
        const dueDateInput = document.getElementById("dueDate");

        if (startDateInput && dueDateInput) {
            dueDateInput.addEventListener("change", validateDates);
            startDateInput.addEventListener("change", validateDates);
        }
    }

    function validateDates() {
        const startVal = document.getElementById("startDate").value;
        const dueVal = document.getElementById("dueDate").value;
        const dueError = document.getElementById("dueDateError");

        if (startVal && dueVal && dueVal < startVal) {
            dueError.style.display = "block";
            return false;
        } else {
            dueError.style.display = "none";
            return true;
        }
    }

    function openTaskModal(editTaskId = null) {
        const modal = document.getElementById("taskModal");
        const modalTitle = document.getElementById("modalTitle");
        const form = document.getElementById("taskForm");
        form.reset();

        // Reset errors
        document.querySelectorAll(".error-msg").forEach(el => el.style.display = "none");

        if (editTaskId) {
            const task = tasksData.find(t => t.id === editTaskId);
            if (task) {
                document.getElementById("taskId").value = task.id;
                document.getElementById("taskTitle").value = task.title;
                document.getElementById("projectName").value = task.projectName;
                document.getElementById("assignedEmployee").value = task.assignedEmployee;
                document.getElementById("taskPriority").value = task.priority;
                document.getElementById("taskStatus").value = task.status === "Overdue" ? "In Progress" : task.status;
                document.getElementById("startDate").value = task.startDate;
                document.getElementById("dueDate").value = task.dueDate;
                modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Task';
            }
        } else {
            document.getElementById("taskId").value = "";
            modalTitle.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Create New Task';
        }

        modal.style.display = "flex";
    }

    function closeTaskModal() {
        document.getElementById("taskModal").style.display = "none";
    }

    function handleTaskSubmit(e) {
        e.preventDefault();

        const taskId = document.getElementById("taskId").value;
        const title = document.getElementById("taskTitle").value.trim();
        const projectName = document.getElementById("projectName").value.trim();
        const assignedEmployee = document.getElementById("assignedEmployee").value.trim();
        const priority = document.getElementById("taskPriority").value;
        let status = document.getElementById("taskStatus").value;
        const startDate = document.getElementById("startDate").value;
        const dueDate = document.getElementById("dueDate").value;

        // Business Logic Rule Validation
        let isValid = true;

        if (!title) {
            document.getElementById("taskTitleError").style.display = "block";
            isValid = false;
        }
        if (!projectName) {
            document.getElementById("projectNameError").style.display = "block";
            isValid = false;
        }
        if (!assignedEmployee) {
            document.getElementById("assignedEmployeeError").style.display = "block";
            isValid = false;
        }
        if (!startDate) {
            document.getElementById("startDateError").style.display = "block";
            isValid = false;
        }

        if (!validateDates()) {
            isValid = false;
        }

        if (!isValid) return;

        // Auto-check if overdue upon creation
        const todayStr = new Date().toISOString().split("T")[0];
        if (status !== "Completed" && dueDate < todayStr) {
            status = "Overdue";
        }

        if (taskId) {
            // Update
            const index = tasksData.findIndex(t => t.id === taskId);
            if (index !== -1) {
                tasksData[index] = { id: taskId, title, projectName, assignedEmployee, priority, startDate, dueDate, status };
                if (window.AppModule) window.AppModule.showToast("Task updated successfully!");
            }
        } else {
            // Create
            const newId = "TSK-" + Math.floor(100 + Math.random() * 900);
            tasksData.push({ id: newId, title, projectName, assignedEmployee, priority, startDate, dueDate, status });
            if (window.AppModule) window.AppModule.showToast("New task created successfully!");
        }

        saveTasks();
        closeTaskModal();
        if (window.AppModule) window.AppModule.refreshAllModules();
    }

    function deleteTask(id) {
        if (confirm("Are you sure you want to delete task " + id + "?")) {
            tasksData = tasksData.filter(t => t.id !== id);
            saveTasks();
            if (window.AppModule) {
                window.AppModule.showToast("Task removed.");
                window.AppModule.refreshAllModules();
            }
        }
    }

    function renderTasksTable(filterSearch = "", filterPriority = "ALL", filterStatus = "ALL") {
        const tbody = document.getElementById("tasksTableBody");
        const noTasksFound = document.getElementById("noTasksFound");

        if (!tbody) return;

        let filtered = tasksData.filter(task => {
            const matchesSearch = task.assignedEmployee.toLowerCase().includes(filterSearch.toLowerCase()) ||
                                 task.title.toLowerCase().includes(filterSearch.toLowerCase());
            const matchesPriority = filterPriority === "ALL" || task.priority === filterPriority;
            const matchesStatus = filterStatus === "ALL" || task.status === filterStatus;

            return matchesSearch && matchesPriority && matchesStatus;
        });

        tbody.innerHTML = "";

        if (filtered.length === 0) {
            noTasksFound.style.display = "block";
            return;
        }

        noTasksFound.style.display = "none";

        filtered.forEach(task => {
            const tr = document.createElement("tr");

            // Highlight high priority overdue tasks strictly as required
            if (task.priority === "High" && task.status === "Overdue") {
                tr.className = "priority-high-row";
            }

            const priorityBadge = task.priority === "High" ? "badge-high" : task.priority === "Medium" ? "badge-medium" : "badge-low";
            
            let statusBadge = "badge-pending";
            if (task.status === "Completed") statusBadge = "badge-completed";
            else if (task.status === "In Progress") statusBadge = "badge-progress";
            else if (task.status === "Overdue") statusBadge = "badge-overdue";

            tr.innerHTML = `
                <td>
                    <strong>${escapeHtml(task.title)}</strong>
                    <div style="font-size:0.75rem; color: var(--text-muted);">${escapeHtml(task.projectName)}</div>
                </td>
                <td><i class="fa-regular fa-user"></i> ${escapeHtml(task.assignedEmployee)}</td>
                <td><span class="badge ${priorityBadge}">${task.priority}</span></td>
                <td><small>${task.startDate} → <strong>${task.dueDate}</strong></small></td>
                <td><span class="badge ${statusBadge}">${task.status}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-secondary btn-sm edit-btn" data-id="${task.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button class="btn btn-secondary btn-sm delete-btn" data-id="${task.id}" title="Delete"><i class="fa-solid fa-trash text-danger"></i></button>
                    </div>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // Event delegation for action buttons
        tbody.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                openTaskModal(this.getAttribute("data-id"));
            });
        });

        tbody.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                deleteTask(this.getAttribute("data-id"));
            });
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    function getAllTasks() {
        return tasksData;
    }

    return {
        init: init,
        renderTasksTable: renderTasksTable,
        getAllTasks: getAllTasks,
        openTaskModal: openTaskModal
    };
})();
