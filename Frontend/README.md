# ⚡ SyncSpace Dashboard

A developer productivity dashboard built for Task 1 of the Innovation Hacks Full Stack
Development Internship — a dark, glassmorphic UI with orange/amber gradient accents for
managing projects, tasks, and team assignments.

---

## ✨ Features

- **Dashboard overview** — live stat cards (active projects, tasks due, completion rate,
  team sync status), an "All about" tab section with Main Goals progress tracking, Team
  Assignments, and a circular Deadline indicator.
- **Projects & tasks** — project cards with progress bars, member avatars, and due dates;
  a task list with priority, status, and assignee. Both support independent status filters
  (All / In progress / To do / Done) plus a shared search bar that filters both at once.
- **Create Project modal** — add a new project via a form (name, description, due date);
  it appears immediately in the grid and updates the "Active projects" stat.
- **Notification dropdown** — bell icon with an unread-count indicator, click-to-toggle
  read state, "mark all read," and click-outside-to-close.
- **Profile dropdown** — quick-access panel off the topbar avatar with user info and a
  log-out action.
- **Teammates page** — a "coming soon" placeholder section, reachable via the sidebar and
  embedded inline on the dashboard.
- **Loading & empty states** — skeleton loaders (glassmorphic, blurred, shimmer-animated)
  for every dynamic section; empty-state messaging when search/filters return nothing.
- **Responsive layout** — sidebar nav on desktop, bottom tab bar on mobile; sidebar links
  smooth-scroll to their matching section on the page.

---

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build tool:** Vite 7
- **Styling:** Tailwind CSS v4 (CSS-based `@theme` config, no `tailwind.config.js`)
- **Icons:** Lucide React
- **Linting:** ESLint 9

---

## 📂 Project Structure

```text
src/
├── Features/
│   ├── Dashboard/
│   │   ├── components/   # StatCard, ProjectCard, TaskRow, GoalsCard, AssignmentCard,
│   │   │                 # DeadlineCard, CreateProjectModal, Skeletons, etc.
│   │   └── pages/
│   │       └── Dashboard.jsx
│   └── TeamMates/
│       ├── components/   # Hero icon, coming-soon badge, heading, preview card
│       └── pages/
│           └── TeamMates.jsx
├── shared/
│   ├── Sidebar/           # Sidebar.jsx + nav, profile, util links, mobile bottom nav
│   ├── Topbar/             # Topbar.jsx + search, notification bell, profile dropdown
│   └── Styles/
│       └── index.css       # Tailwind v4 theme tokens + global styles
├── mockData.js              # Mock users, projects, tasks, notifications
├── App.jsx                  # Root layout + scroll-based section navigation
└── main.jsx                 # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

[Node.js](https://nodejs.org/) (LTS recommended).

### Setup

```bash
npm install
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`).

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # run ESLint
```

---

## 📝 Notes

- All data is mocked in `src/mockData.js` — no backend yet. This will be replaced with
  real API calls once Task 2 (REST API) and Task 3 (database) are built.
- There is no client-side router yet — navigation is a single page with anchor-based
  smooth-scrolling between sections.