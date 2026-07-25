# Changelog - TaskPulse Pro

All notable changes to this project will be documented in this file.

## [v1.0.0] - 2026-07-26
### Added
- **Login UI**: User authentication form with email regex and password validation.
- **Executive Dashboard**: KPI counters for projects, pending, completed, and overdue tasks.
- **Task Management**: Full LocalStorage CRUD implementation, search by employee, priority and status filtering.
- **Business Logic Rules**: Enforced due date >= start date; isolated completed tasks from pending metrics; red border highlight on High-Priority Overdue items.
- **Printable Reports**: Summary tables, employee productivity matrix, and overdue alert log.
- **Bonus Features**:
  - Dark / Light Mode Switcher with saved browser preference.
  - Export tasks database directly to formatted `.json`.
  - CSS Task Priority Bar Chart visualization.
  - Project completion progress bar.
  - Printable Executive Audit Document.
