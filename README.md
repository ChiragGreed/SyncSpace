# SyncSpace

A full-stack project and task management platform built to help teams organize projects, manage tasks, collaborate with teammates, and track project activity from one place.

**Live Demo:** https://syncspace-bz0v.onrender.com

**GitHub:** https://github.com/ChiragGreed/SyncSpace

---

## 🚀 Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- HTTP-only cookie-based authentication
- Protected routes
- Password hashing with bcryptjs

### 📊 Dashboard

- Overview of projects and tasks
- Project progress tracking
- Task status overview
- Upcoming deadlines
- Assigned tasks
- Notifications
- Recent activity

### 📁 Project Management

- Create projects
- Edit project details
- Update project status
- Add and manage project members
- View project progress
- Delete projects
- View project-specific activity

### ✅ Task Management

- Create and manage tasks
- Assign tasks to team members
- Set task priority
- Add task descriptions
- Set due dates
- Update task status
- View task details
- Track assigned tasks

### 🤝 Team Collaboration

- Search for teammates
- View recent teammates
- Send project invitations
- Accept or reject invitations
- Manage project members

### 🔔 Notifications

- View notifications
- Mark individual notifications as read
- Mark all notifications as read
- Delete notifications
- Receive updates related to project activity and invitations

### 🤖 AI Task Generator

SyncSpace includes an AI-powered task generation feature using **LangChain and Google Gemini**.

Users can provide a project's title and description, and the AI generates task suggestions that can be reviewed before being added to the project.

Users can selectively choose which generated tasks they want to add.

### 🎨 Responsive UI

- Responsive dashboard
- Sidebar navigation
- Interactive project and task views
- Modern interface
- Tailwind CSS based styling

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS 4
- Lucide React
- ESLint

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- Express Validator
- Zod
- CORS

### AI

- LangChain
- Google Generative AI
- Gemini

---

## 🏗️ Architecture

SyncSpace follows a layered frontend architecture where UI components do not directly communicate with the backend.

```text
Page / UI
    ↓
Hooks
    ↓
Redux State
    ↓
API Services
    ↓
Axios
    ↓
Express REST API
    ↓
MongoDB / Mongoose
```

The backend follows a structured route, controller, service, and model architecture.

```text
Request
   ↓
Express Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Mongoose Model
   ↓
MongoDB
```

---

## 📂 Project Structure

```text
SyncSpace/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   │
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── services/
│
├── Frontend/
│   ├── package.json
│   │
│   └── src/
│       ├── Features/
│       └── shared/
│
└── README.md
```

---

## 🔌 API Structure

The backend exposes REST APIs organized by resource.

```text
/api/auth
/api/projects
/api/tasks
/api/team
/api/invitations
/api/notifications
/api/ai
```

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/
```

### Projects

Project APIs handle:

- Creating projects
- Fetching projects
- Updating projects
- Updating project status
- Managing project members
- Deleting projects

### Tasks

Task APIs handle:

- Creating tasks
- Fetching tasks
- Updating tasks
- Updating task status
- Assigning tasks
- Deleting tasks

### Team

Team APIs handle:

- Searching users
- Finding recent teammates

### Invitations

Invitation APIs handle:

- Sending invitations
- Fetching invitations
- Accepting invitations
- Rejecting invitations

### Notifications

Notification APIs handle:

- Fetching notifications
- Marking notifications as read
- Marking all notifications as read
- Deleting notifications

### AI

AI APIs handle:

- Generating task suggestions from project information

---

## 🤖 AI Task Generation Workflow

```text
Project Title + Description
            ↓
         Frontend
            ↓
          AI API
            ↓
     LangChain + Gemini
            ↓
   Generated Suggestions
            ↓
       User Reviews
            ↓
   Selected Tasks Added
            ↓
         MongoDB
```

The AI suggestions are not automatically added to the project.

Users can review the generated tasks and selectively add the tasks they want.

---

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the `Backend` directory:

```env
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_generative_ai_key
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ChiragGreed/SyncSpace.git
cd SyncSpace
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside the `Backend` directory:

```env
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_generative_ai_key
```

### 4. Install frontend dependencies

Open another terminal:

```bash
cd Frontend
npm install
```

### 5. Start the backend

From the `Backend` directory:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:6500
```

### 6. Start the frontend

From the `Frontend` directory:

```bash
npm run dev
```

The frontend will be available through the Vite development server.

---

## 📜 Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
npm run dev
npm start
```

---

## 🌐 Deployment

SyncSpace is deployed as a full-stack application on Render.

The production deployment serves both the React frontend and Express backend from the same application.

### Production Architecture

```text
User
  ↓
Render
  ├── React Frontend
  │
  └── Express Backend
        ↓
     MongoDB
        ↓
   Gemini API

```


## 🔮 Future Improvements

Some features I would like to explore further:

- Real-time collaboration with live task updates
- File sharing within projects and tasks
- More detailed project analytics
- Automated reminders and scheduled notifications
- More AI features for project planning and task management

---

## 📌 Project Status

SyncSpace was built as the final capstone project for the Innovation Hacks Full Stack Development Internship.

The project is deployed and available for testing.

