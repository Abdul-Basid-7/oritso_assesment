# oritso_assesment
# Task Management System

This project is a **Task Management System** developed as part of the **Oritso Entry-Level IT Assignment**.  
The system allows authenticated users to create, manage, search, update, and delete tasks efficiently.

The application is designed to:
- Track task timelines using due dates
- Manage task lifecycle using status (Pending, In Progress, Completed)
- Maintain proper audit information such as Created By, Updated By, Created On, and Last Updated On
- Provide a responsive and user-friendly interface

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

- 

###  Data Dictionary

#### Users Table

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id          | INT (PK)  | Unique user identifier |
| username    | VARCHAR   | Name of the user |
| email       | VARCHAR   | Email of the user |
| password    | VARCHAR   | Encrypted password |

#### Tasks Table

| Column Name | Data Type  | Description |
|-------------|------------|-------------|
| id          |   INT (PK) | Unique task identifier |
| title       | VARCHAR    | Task title |
| description | TEXT       | Task description |
| due_date    | DATE       | Task due date |
| status      | VARCHAR    | Pending / In Progress / Completed |
| remarks     | TEXT       | Additional remarks |
| created_by  | INT (FK)   | User who created the task |
| updated_by  | INT (FK)   | User who last updated the task |
| created_at  | TIMESTAMP  | Task creation timestamp |
| updated_at  | TIMESTAMP  | Task update timestamp |

Documentation of Indexes Used

- Primary Key index on `users.id`
- Primary Key index on `tasks.id`
- Foreign Key indexes on:
  - `tasks.created_by`
  - `tasks.updated_by`
- Index on `tasks.title` to optimize search functionality


Code First or Database First Approach
**Code First Approach** has been used.

**Reason:**
- Faster development iteration
- Better version control of schema changes
- Easier maintenance and scalability
- Suitable for backend-driven application design



## Features

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



