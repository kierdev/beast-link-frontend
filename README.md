# BeastLink Admission Management System

A modern, modular, and scalable School admission management system built with **Vite**, **React**, and **CSS Modules**.

---

### Tech Stack

- React (Vite)
- React Router
- CSS Modules (with optional SCSS support)
- RESTful APIs (via service layer)

---

### Setup

```bash
# Clone repository
git clone https://github.com/kierdev/beast-link-frontend.git

# Install dependencies
npm install

# Run development server
npm run dev
```

## Git Branching Strategy

We follow a three-branch workflow to maintain code stability and enable parallel development:

### Branches

1. **`main`**

   - Production-ready code only
   - Protected branch (direct commits disabled)
   - Updated only via approved merge requests from `development`
   - Tagged with version numbers for releases

2. **`development`**

   - Primary integration branch
   - All feature branches merge here first
   - Where staging/testing occurs
   - Must be stable at all times

3. **`feature/[feature-name]`**
   - Created from `development` branch
   - Named descriptively (e.g., `feature/user-auth`)
   - Short-lived branches (1-3 days recommended)
   - Deleted after merging to `development`

## Simple Git Workflow

### Basic Steps

1.  **Get latest code**

    ```bash
    git checkout development
    git pull
    # Explicitly pull from remote
    ```

2.  **Create feature branch**

    ```bash
    git checkout -b feature/module-name
    # Make your changes...
    ```

3.  **Commit your changes**

    ```bash
    # View changes
    git status

    # Add all files
    git add .

    # Commit
    git commit -m "feat: add login button"  # Use semantic prefixes (feat/fix/chore)
    ```

4.  **Push**

    ```bash
    git push -u origin feature/your-feature # `-u` sets upstream branch
    ```

    - Create Pull Request (GitHub) from:

    - feature/your-feature → development

## Git Commit Conventions

- **`feat`**: A new feature
  Example: `feat(login): add teacher login form`

- **`fix`**: A bug fix
  Example: `fix(api): correct attendance data mapping`

- **`chore`**: Non-functional changes (e.g., tooling, build, deps)
  Example: `chore: update ESLint config`

## File Naming Conventions

- **Service Files**: Use `kebab-case` for service files.

  - Example: `dashboard-service.js`

- **Class Pages**: Use `PascalCase` for page components and export default functions with the same name.

  - Example: `export default function HomePage`

- **Common Variables**: Use `camelCase` for variables, functions, and hooks.

  - Example: `const studentList = []`

## Folder Structure

```bash
.
├── node_modules/ # npm dependencies
├── public/ # Static assets
├── src/ # Source code
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Reusable components
│ ├── context/ # React context providers
│ ├── data/ # Data services
│ │ └── dashboard-service.js # Dashboard API calls
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Page components
│ │ ├── dashboard/ # Dashboard page
│ │ │ ├── dashboard.jsx # Dashboard component
│ │ │ └── dashboard.module.css # Dashboard styles
│ │ └── home/ # Home page
│ ├── utils/ # Utility functions
│ │ └── dateUtils.js # Date helpers
│ ├── App.jsx # Root component
│ ├── index.css # Global styles
│ └── main.jsx # App entry point
├── .gitignore # Ignored files
├── eslint.config.js # ESLint config
├── index.html # HTML template
├── package-lock.json # Dependency lockfile
├── package.json # Project config
└── vite.config.js # Vite config
```
