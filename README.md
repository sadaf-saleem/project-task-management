# TaskPulse Pro - Advanced Project & Task Management System

**Allied Software Engineers - Web Development & DevOps Engineering Internship**  
**Lab Assignment 04 | Level: Internship | Credit Weeks: 8**  
**Student Name:** Sadaf Saleem  
**Supervisor:** Muhammad Ahsan Ali  

---

## 🌟 Live Demo & Deployment
- **GitHub Pages Live Application URL**: `https://sadaf-saleem.github.io/project-task-management/`
- **GitHub Repository**: `https://github.com/sadaf-saleem/project-task-management.git`

---

## 📋 Features & Requirements Matrix

### Scenario 1: Web Application Features
1. **Login UI**:
   - Work email and password authentication fields.
   - Real-time client validation (regex email check, length validation).
   - Session persistence using `LocalStorage`.
2. **Project Dashboard**:
   - Total active projects metric.
   - Completed, pending, and overdue task counters.
   - Interactive project completion rate progress bar.
   - Visual priority distribution chart (CSS/JS pure render).
3. **Task Module & Business Logic**:
   - Task Title, Project Name, Assigned Employee, Priority (Low/Medium/High), Start & Due Dates, Status.
   - **Strict Rule**: Due date *cannot* be set before start date.
   - **Strict Rule**: High-priority overdue tasks highlighted with red background/border.
   - **Strict Rule**: Completed tasks are excluded from pending counts.
   - Live search by employee name.
   - Multi-field filter by priority and status.
   - Persistent `LocalStorage` integration.
4. **Reports & Audit**:
   - Complete project performance breakdown.
   - Employee productivity summary matrix.
   - Overdue tasks audit log.
   - Native printer-optimized view (`window.print()`).

### 🚀 Bonus Features Included (+10 Marks)
- [x] **Dark / Light Mode**: Dynamic switcher with persistent state.
- [x] **Export Tasks to JSON**: One-click download of the JSON database.
- [x] **Task Progress Bar**: Visual velocity indicator.
- [x] **Print Report Page**: Dedicated CSS print media queries.
- [x] **Simple Visual Chart**: Built using pure HTML/CSS without external heavy chart libs.

---

## 🛠️ DevOps & Git Workflow Implementation

The project follows the exact required folder structure:
```text
project-task-management/
├── assets/
│   ├── css/styles.css
│   └── js/ (auth.js, tasks.js, dashboard.js, app.js)
├── pages/
├── docs/ (ARCHITECTURE.md, DEVOPS_WORKFLOW.md, TESTING_GUIDE.md)
├── tests/ (taskValidation.test.js, auth.test.js)
├── screenshots/
├── index.html
├── README.md
├── CHANGELOG.md
└── .gitignore