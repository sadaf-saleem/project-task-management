/**
 * TaskPulse Pro - Dashboard Metrics & Analytics Engine
 * Allied Software Engineers Internship - Task 4
 */

const DashboardModule = (function () {

    function renderMetrics() {
        const tasks = TasksModule.getAllTasks();

        // 1. Total Active Unique Projects
        const uniqueProjects = new Set(tasks.map(t => t.projectName.trim().toLowerCase()));
        document.getElementById("kpiTotalProjects").textContent = uniqueProjects.size;

        // 2. Completed Tasks
        const completedTasks = tasks.filter(t => t.status === "Completed");
        document.getElementById("kpiCompleted").textContent = completedTasks.length;

        // 3. Pending Tasks (Completed tasks MUST NOT appear in pending list)
        const pendingTasks = tasks.filter(t => t.status === "Pending" || t.status === "In Progress");
        document.getElementById("kpiPending").textContent = pendingTasks.length;

        // 4. Overdue Tasks
        const overdueTasks = tasks.filter(t => t.status === "Overdue");
        document.getElementById("kpiOverdue").textContent = overdueTasks.length;

        // 5. Completion Percentage Progress Bar
        const totalCount = tasks.length;
        const progressPercent = totalCount > 0 ? Math.round((completedTasks.length / totalCount) * 100) : 0;
        
        document.getElementById("progressPercentText").textContent = progressPercent + "%";
        document.getElementById("progressBarFill").style.width = progressPercent + "%";

        // 6. Priority Distribution Bar Chart Calculation
        const highCount = tasks.filter(t => t.priority === "High").length;
        const mediumCount = tasks.filter(t => t.priority === "Medium").length;
        const lowCount = tasks.filter(t => t.priority === "Low").length;

        document.getElementById("countHigh").textContent = highCount;
        document.getElementById("countMedium").textContent = mediumCount;
        document.getElementById("countLow").textContent = lowCount;

        const maxPriority = Math.max(highCount, mediumCount, lowCount, 1);
        document.getElementById("barHigh").style.width = ((highCount / maxPriority) * 100) + "%";
        document.getElementById("barMedium").style.width = ((mediumCount / maxPriority) * 100) + "%";
        document.getElementById("barLow").style.width = ((lowCount / maxPriority) * 100) + "%";

        // 7. High Priority Overdue Highlight Widget
        const urgentHighOverdue = tasks.filter(t => t.priority === "High" && t.status === "Overdue");
        const urgentContainer = document.getElementById("urgentTasksContainer");
        const badge = document.getElementById("highPriorityOverdueBadge");

        badge.textContent = urgentHighOverdue.length + " Urgent";

        if (urgentHighOverdue.length === 0) {
            urgentContainer.innerHTML = '<p class="empty-msg"><i class="fa-solid fa-shield-cat"></i> No high priority overdue items!</p>';
        } else {
            urgentContainer.innerHTML = urgentHighOverdue.map(t => `
                <div class="urgent-item">
                    <div>
                        <div class="urgent-title">${escapeHtml(t.title)}</div>
                        <div class="urgent-meta">Assigned to: ${escapeHtml(t.assignedEmployee)} | Due: ${t.dueDate}</div>
                    </div>
                    <span class="badge badge-high">URGENT</span>
                </div>
            `).join("");
        }

        renderReportsSection(tasks, uniqueProjects.size, completedTasks.length, pendingTasks.length, overdueTasks.length, progressPercent);
    }

    function renderReportsSection(tasks, projCount, completedCount, pendingCount, overdueCount, progressPercent) {
        document.getElementById("reportDate").textContent = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById("rptTotalProjects").textContent = projCount;
        document.getElementById("rptCompleted").textContent = completedCount;
        document.getElementById("rptPending").textContent = pendingCount;
        document.getElementById("rptOverdue").textContent = overdueCount;
        document.getElementById("rptCompletionRate").textContent = progressPercent + "%";

        // Employee performance map
        const empMap = {};
        tasks.forEach(t => {
            const emp = t.assignedEmployee;
            if (!empMap[emp]) empMap[emp] = { total: 0, completed: 0, pending: 0, overdue: 0 };
            empMap[emp].total++;
            if (t.status === "Completed") empMap[emp].completed++;
            else if (t.status === "Overdue") empMap[emp].overdue++;
            else empMap[emp].pending++;
        });

        const empBody = document.getElementById("employeeReportBody");
        if (empBody) {
            empBody.innerHTML = Object.keys(empMap).map(emp => `
                <tr>
                    <td><strong>${escapeHtml(emp)}</strong></td>
                    <td>${empMap[emp].total}</td>
                    <td class="text-success">${empMap[emp].completed}</td>
                    <td>${empMap[emp].pending}</td>
                    <td class="text-danger">${empMap[emp].overdue}</td>
                </tr>
            `).join("");
        }

        // Overdue task details table
        const overdueBody = document.getElementById("overdueReportBody");
        if (overdueBody) {
            const overdueItems = tasks.filter(t => t.status === "Overdue");
            const today = new Date();

            if (overdueItems.length === 0) {
                overdueBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No overdue tasks reported.</td></tr>';
            } else {
                overdueBody.innerHTML = overdueItems.map(t => {
                    const due = new Date(t.dueDate);
                    const diffDays = Math.ceil((today - due) / (1000 * 60 * 60 * 24));
                    return `
                        <tr>
                            <td>${escapeHtml(t.title)}</td>
                            <td>${escapeHtml(t.assignedEmployee)}</td>
                            <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
                            <td>${t.dueDate}</td>
                            <td class="text-danger"><strong>+${diffDays} days</strong></td>
                        </tr>
                    `;
                }).join("");
            }
        }
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    return {
        renderMetrics: renderMetrics
    };
})();
