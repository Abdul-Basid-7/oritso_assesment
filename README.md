# oritso_assesment
# Task Management System

This project is developed as part of the **Oritso Entry-Level IT Assignment**.  
It is a **full-stack web application** that allows users to manage tasks efficiently with complete CRUD functionality, search capability, and proper task tracking as per the assignment requirements.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- MVC Architecture

### Frontend
- React (Vite)
- Tailwind CSS

## Project Structure
Task-Management-System
│
├── Backend
│ ├── config
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ ├── server.js
│ └── package.json
│
├── frontend
│ ├── src
│ ├── public
│ ├── index.html
│ └── package.json
│
└── README.md

## Features (As Per PDF)

### User Management
- User Registration
- User Login (JWT-based authentication)

### Task Management (CRUD)
- Create Task
- Read Task
- Update Task
- Delete Task

### Task Fields
Each task contains:
- Title
- Description
- Due Date
- Status (Pending / In Progress / Completed)
- Remarks
- Created On
- Last Updated On
- Created By (User Name & ID)
- Updated By (User Name & ID)

### Search
- Search tasks by title

### UI
- Responsive design (Mobile & Web)
- Clean and minimal interface
- Task timeline visibility using due dates
- Status indicators for task priority

## Architecture

The backend follows **MVC architecture**:

- **Model**: Database queries and data handling
- **Controller**: Business logic
- **Routes**: API routing
- **Middleware**: Authentication & authorization

Frontend is a **Single Page Application (SPA)** built with React.


## Database Design

### Users Table
- id
- username
- email
- password

### Tasks Table
- id
- title
- description
- due_date
- status
- remarks
- created_by (FK → users.id)
- updated_by (FK → users.id)
- created_at
- updated_at

---

## Authentication

- JWT token-based authentication
- Token is required to access task APIs
- Authorization handled via middleware


## How to Run the Project

### Backend Setup
cd Backend
npm install
npm start

Create a .env file inside Backend:

DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=task_management
JWT_SECRET=your_secret_key

Frontend Setup
cd frontend
npm install
npm run dev


Frontend will run on: http://localhost:5173
Backend runs on: http://localhost:5000

 
 ## API Overview
 
 ### Authentication
POST /api/auth/register
POST /api/auth/login

### Tasks
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
GET /api/tasks/search?title=

## Testing

Backend APIs tested using Postman

Frontend tested manually for responsiveness and functionality



