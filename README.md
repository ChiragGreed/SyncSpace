# SyncSpace

SyncSpace is a full-stack project and task management workspace for organizing projects, assigning work, collaborating with teammates, and generating task suggestions with AI.

The repository contains a React frontend and an Express backend connected to MongoDB. Authenticated users can create projects, manage project tasks, invite teammates, search for users, receive notifications, and generate project-specific task suggestions with Google Generative AI.

## Features

- User registration, login, JWT-based authentication, and protected routes
- Dashboard with project, task, progress, deadline, assignment, and notification views
- Project creation, editing, status updates, member display, and deletion flow
- Project detail pages with progress tracking and project-specific tasks
- Task creation with title, description, priority, due date, and assignee
- Task detail pages with task information and status management
- AI-assisted task generation from a project's title and description
- Selective import of AI-generated task suggestions into a project
- Teammate search and recent teammate views
- Invitation sending, received/sent invitation lists, and invitation responses
- Notification list, read-state updates, mark-all-as-read, and deletion
- Responsive interface with desktop sidebar and mobile navigation
- Redux Toolkit state management organized by feature

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router
- Redux Toolkit and React Redux
- Axios
- Tailwind CSS 4
- Lucide React
- ESLint

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication stored through HTTP cookies
- bcryptjs for password hashing
- Express Validator and Zod for validation
- CORS and cookie-parser
- LangChain with Google Generative AI (Gemini) for AI-assisted task generation

## Repository Structure

```text
.
├── Backend/
│   ├── server.js                  # API entry point
│   ├── package.json
│   └── src/
│       ├── app.js                 # Express app and route registration
│       ├── config/                # Environment and database configuration
│       ├── controllers/           # Request handlers
│       ├── middlewares/           # Auth, validation, and error handling
│       ├── models/                # Mongoose models
│       ├── routes/                # API route definitions
│       └── services/              # AI and external service logic
│
├── Frontend/
│   ├── package.json
│   └── src/
│       ├── AppRoutes.jsx          # Public and protected routes
│       ├── Features/
│       │   ├── Ai/
│       │   ├── Authentication/
│       │   ├── Dashboard/
│       │   ├── Invitations/
│       │   ├── Notifications/
│       │   ├── Projects/
│       │   ├── Tasks/
│       │   └── TeamMates/
│       └── shared/                # Redux store, API client, layout, and styles
│
└── README.md
```

## Prerequisites

- Node.js LTS
- npm
- MongoDB, either locally or through MongoDB Atlas
- Google Generative AI API key for AI task generation

## Environment Variables

Create `Backend/.env` with the following values:

```env
JWT_SECRET=replace_with_a_long_random_secret
MONGO_URI=mongodb://127.0.0.1:27017/syncspace
GOOGLE_API_KEY=your_google_generative_ai_key
```

The backend validates all three variables at startup.

**Do not commit `.env` files or API keys to the repository.**

The frontend uses the following API base URL by default:

```text
http://localhost:6500/api
```

To point the frontend at another backend, create `Frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:6500/api
```

## Installation

Install dependencies for both applications:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

## Running Locally

### Start the Backend

Open a terminal and run:

```bash
cd Backend
npm run dev
```

The API listens on:

```text
http://localhost:6500
```

### Start the Frontend

Open a second terminal and run:

```bash
cd Frontend
npm run dev
```

Vite normally serves the application at:

```text
http://localhost:5173
```

The backend allows credentialed requests from the local Vite origin.

If the frontend or backend ports change, update the CORS configuration and `VITE_API_BASE_URL` accordingly.

## Frontend Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/login` | Public | Sign in |
| `/register` | Public | Create an account |
| `/` | Protected | Dashboard |
| `/team/search` | Protected | Search for teammates |
| `/project/:projectId` | Protected | View and manage a project |
| `/task/:taskId` | Protected | View and manage a task |

## API Overview

All application resources are served under `/api`. Protected endpoints require the authenticated `Access_Token` cookie.

| Resource | Base Path | Main Operations |
| --- | --- | --- |
| Authentication | `/api/auth` | Register, login, current user |
| Projects | `/api/projects` | List, create, view, update, status update, delete |
| Tasks | `/api/tasks` | List, create, view, update, status update, delete |
| Team | `/api/team` | Search users, recent teammates |
| Invitations | `/api/invitations` | Sent, received, create, respond |
| Notifications | `/api/notifications` | List, mark read, mark all read, delete |
| AI | `/api/ai` | Generate project task suggestions |

## AI Task Generation

SyncSpace includes an AI-assisted task generation feature powered by LangChain and Google Generative AI (Gemini).

The protected `POST /api/ai/generate-tasks` endpoint accepts a project's title and description and returns four structured task suggestions.

Users can review and select individual suggestions before adding them to the project. Selected tasks are created through the existing task API and stored in MongoDB.

### AI Workflow

```text
Project title + description
          ↓
    LangChain + Gemini
          ↓
 Structured task suggestions
          ↓
     User selection
          ↓
   Existing Task API
          ↓
       MongoDB
```

## Available Scripts

### Frontend

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

### Backend

```bash
npm run dev       # Start the API with nodemon
```

## Development Notes

- API calls are centralized through the shared frontend HTTP client and include credentials for cookie-based authentication.
- Frontend state is split into feature-specific Redux slices for authentication, projects, tasks, teams, invitations, and notifications.
- Backend errors are handled by the shared not-found and error middleware registered after all routes.
- Project and task detail screens refresh their data after mutations so the UI reflects the backend state.
- AI-generated tasks are not automatically created. Users select which suggestions they want to add.
- Keep secrets in environment variables and use separate credentials for development and production.

## Production Considerations

Before deploying:

- Configure a production MongoDB connection.
- Use a strong production JWT secret.
- Configure a production Google Generative AI API key.
- Set the production frontend origin in the backend CORS configuration.
- Set `VITE_API_BASE_URL` to the deployed API URL.
- Ensure the frontend host is configured to fall back to `index.html` for client-side routes.
- Never expose or commit API keys and other secrets.