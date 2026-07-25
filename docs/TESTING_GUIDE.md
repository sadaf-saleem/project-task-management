# TaskPulse Pro - Test Cases & Quality Assurance Guide

## Test Suite Overview

| Test ID | Module | Scenario Description | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Auth | Enter invalid email format `admin@` | Display inline error "Please enter a valid work email" | PASS |
| **TC-02** | Auth | Enter password `< 6` chars | Display error "Password must be at least 6 characters" | PASS |
| **TC-03** | Auth | Correct login `admin@enterprise.com` / `password123` | Redirect to Dashboard & initialize session | PASS |
| **TC-04** | Tasks | Due date set *before* Start date | Block form submit, display "Due date cannot be before start date" | PASS |
| **TC-05** | Tasks | Create new task with valid data | Save to LocalStorage, update KPIs immediately | PASS |
| **TC-06** | Logic | High Priority Overdue Task Creation | Highlight row with red accent border and display in Urgent list | PASS |
| **TC-07** | Logic | Complete a task | Remove task from Pending count and increment Completed count | PASS |
| **TC-08** | Filter | Search employee name "Wasiya" | Show only tasks assigned to Wasiya Khan | PASS |
| **TC-09** | Bonus | Click Theme Toggle Button | Seamless transition to Dark Mode with persistent state | PASS |
| **TC-10** | Bonus | Click Export Tasks JSON | Trigger download of formatted `.json` database file | PASS |
