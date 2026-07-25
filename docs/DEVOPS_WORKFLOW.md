# TaskPulse Pro - DevOps Workflow & Git Release Strategy

## 1. Branching Strategy
Following Allied Software Engineers guidelines:
- `main`: Production release code (`v1.0`).
- `development`: Active integration branch.
- `feature-login`: Authentication & login form features.
- `feature-dashboard`: Metrics, CSS charts, and executive widgets.
- `feature-task-module`: Task creation form, LocalStorage CRUD, search/filter.
- `release-v1.0`: Pre-production validation and candidate release.
- `hotfix-validation`: Critical hotfix for date validation boundary bug.

## 2. Automated Repository Setup Script
A convenience setup script `setup_git_repository.sh` is provided in the repository root to automatically construct all required branches, commit modules separately, generate tag `v1.0`, and push to GitHub Pages.
