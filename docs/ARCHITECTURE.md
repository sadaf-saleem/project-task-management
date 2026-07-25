# TaskPulse Pro - System Architecture & Technical Specifications

## 1. Executive Summary
TaskPulse Pro is an enterprise-grade Project & Task Management application built for Allied Software Engineers (ASE). The application features clean modular JavaScript business logic, local storage persistence, responsive executive dashboard analytics, printable reporting tools, and a seamless light/dark UI design system.

## 2. Directory Structure
```
project-task-management/
├── assets/
│   ├── css/
│   │   └── styles.css          # Core CSS variables, light/dark themes, responsive layout
│   └── js/
│       ├── auth.js             # User login, session management & validation
│       ├── tasks.js            # Task CRUD, date validation, LocalStorage engine
│       ├── dashboard.js        # KPI metrics, CSS bar chart, overdue high-priority alerts
│       └── app.js              # View switcher, theme toggle, JSON export, global app setup
├── pages/                      # Reserved modular HTML templates
│   ├── login.html
│   ├── dashboard.html
│   └── reports.html
├── docs/                       # Architectural and DevOps documentation
│   ├── ARCHITECTURE.md
│   ├── DEVOPS_WORKFLOW.md
│   └── TESTING_GUIDE.md
├── tests/                      # Suite of Automated / Manual Unit Tests
│   ├── taskValidation.test.js
│   └── auth.test.js
├── screenshots/                # Visual verification of responsive UI
│   └── README.md
├── index.html                  # Main Single Page Application (SPA) entry point
├── README.md                   # Complete Lab Assignment overview and live demo details
├── CHANGELOG.md                # Full release version history
└── .gitignore                  # Standard Git ignore rules
```

## 3. Data Flow & Security Model
- **Authentication**: Credentials sanitized and validated. Active session tokens stored under `taskpulse_auth_user` in browser memory.
- **LocalStorage Storage**: Tasks indexed in `taskpulse_tasks_db`. All state mutations trigger automated recalculations for status (e.g., auto-marking overdue tasks).
- **Privacy & Security**: Zero external telemetry tracking; no confidential company data leaked.
