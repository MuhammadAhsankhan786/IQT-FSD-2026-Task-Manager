# IQT-FSD-2026 Full Stack Task Manager

Welcome to the **IQT-FSD-2026 Full Stack Task Manager** project. This project implements a modern task dashboard coupled with a third-party GitHub profile statistics lookup tool.

The application leverages a Node.js/Express.js backend, a MongoDB Atlas cloud database, and a Next.js/TypeScript frontend using Tailwind CSS v4 styling.

---

## Workspace Structure

The project is divided into two primary environments:

- `/backend`: Node.js, Express.js server, Mongoose models, controllers, and custom validations.
- `/frontend`: Next.js 16.2 App Router, TypeScript interfaces, and responsive components.

Detailed directories:
```txt
IQT-FSD-2026-Task-Manager/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Controller operations
│   │   ├── middleware/        # Input validation & error handlers
│   │   ├── models/            # Mongoose schemas (Task model)
│   │   ├── routes/            # Express endpoint routing definitions
│   │   └── server.js          # Entrypoint server script
│   └── package.json
│
├── frontend/
│   ├── app/                   # Next.js App Router (Layout & Pages)
│   ├── components/            # UI components (TaskItem, TaskForm, GitHubProfile)
│   ├── services/              # API interfaces (Express REST and GitHub Public API)
│   ├── types/                 # TypeScript type contracts
│   └── package.json
│
├── docs/                      # Extensive specifications
│   ├── SETUP.md               # How to run locally
│   ├── DATABASE_SCHEMA.md     # MongoDB details
│   └── API_DOCUMENTATION.md   # Endpoint lists
│
├── ASSESSMENT_ANSWERS.md      # Theoretical assessment answers
└── README.md                  # This file
```

---

## Core Features Implemented

### 1. Task Board Workspace
- **Display list**: View all current tasks. Includes filtering by active, completed, or all states.
- **Create**: Add new tasks inline via custom forms with load spinners.
- **Edit**: Rename task titles directly inline with focus state toggling.
- **Complete**: Mark tasks as completed using checkbox buttons.
- **Delete**: Remove tasks from database with confirmations.
- **Async Feedback**: Handles loading animations (skeletons, buttons) and server error notifications.

### 2. GitHub Profile Integrator
- Queries GitHub's Public User REST API (`https://api.github.com/users/{username}`).
- Renders: Avatar photo, Name/Username, Public Repository count, Followers count, Bio, and Location.
- Integrates a search input to dynamically look up any other profile on GitHub on the fly.
- Handles rate-limiting and user-not-found exceptions cleanly.

---

## Sub-Documentation Guides

For detailed specifications, see:
1. [Setup Instructions (docs/SETUP.md)](file:///d:/IQT-FSD-2026-Task-Manager/docs/SETUP.md)
2. [Database Schema Documentation (docs/DATABASE_SCHEMA.md)](file:///d:/IQT-FSD-2026-Task-Manager/docs/DATABASE_SCHEMA.md)
3. [API Endpoint Documentation (docs/API_DOCUMENTATION.md)](file:///d:/IQT-FSD-2026-Task-Manager/docs/API_DOCUMENTATION.md)
4. [Theoretical Assessment Responses (ASSESSMENT_ANSWERS.md)](file:///d:/IQT-FSD-2026-Task-Manager/ASSESSMENT_ANSWERS.md)
