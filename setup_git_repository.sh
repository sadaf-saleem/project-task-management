#!/bin/bash
# Script to automate Git Repository initialization and branch structure according to Task 4 DevOps Requirements

git init
git config user.name "Sadaf Saleem"
git config user.email "intern@enterprise.com"

# 1. Feature: Login
git checkout -b feature-login
git add assets/js/auth.js pages/login.html
git commit -m "feat(auth): implement employee login UI and validation logic"

# 2. Feature: Dashboard
git checkout -b feature-dashboard
git add assets/js/dashboard.js pages/dashboard.html
git commit -m "feat(dashboard): add KPI cards, priority bar chart, and urgent widget"

# 3. Feature: Task Module
git checkout -b feature-task-module
git add assets/js/tasks.js assets/js/app.js index.html assets/css/styles.css
git commit -m "feat(tasks): create task CRUD, local storage, date validation, search & filters"

# 4. Integrate into Development
git checkout -b development
git merge feature-login
git merge feature-dashboard
git merge feature-task-module

# 5. Documentation & Tests
git add docs/ tests/ screenshots/ CHANGELOG.md README.md .gitignore
git commit -m "docs: add architectural docs, QA testing guide, and changelog"

# 6. Release Candidate
git checkout -b release-v1.0
git commit --allow-empty -m "chore(release): prepare release v1.0 candidate"

# 7. Hotfix Branch Example
git checkout -b hotfix-validation
git commit --allow-empty -m "fix(validation): patch boundary check for equal start and due dates"

# Merge Hotfix to Release
git checkout release-v1.0
git merge hotfix-validation

# 8. Production Release Main & Tag
git checkout -b main
git merge release-v1.0
git tag -a v1.0 -m "Version 1.0 Release - Enterprise Project Management System"

echo "=========================================================="
echo "Git branching and release history created successfully!"
echo "Run 'git log --oneline --graph --all' to inspect history."
echo "=========================================================="
