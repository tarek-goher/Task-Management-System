# Task Management System

A full-stack Task Management System built with **React.js** and **Node.js** that allows administrators to manage employees and tasks through a secure dashboard.

---

## 🚀 Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt

---

## 📁 Project Structure

```
project/
│
├── front/     # React application
└── back/      # Express API
```

---

## ✨ Features

- Employee Management
  - Add employees
  - Edit employees
  - View employee details

- Task Management
  - Create tasks
  - Update task status
  - Track assigned tasks

- Authentication
  - Secure Login
  - Protected Routes
  - Password hashing using bcrypt

- Dashboard
  - Responsive UI
  - Employee & Task overview

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
cd project
```

### Install dependencies

Frontend

```bash
cd front
npm install
```

Backend

```bash
cd back
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **back** folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=task_management

JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Project

Start Backend

```bash
cd back
node app.js
```

Start Frontend

```bash
cd front
npm run dev
```

---

## 📌 Notes

- Make sure PostgreSQL is running.
- Configure the database before starting the server.
- Update the database connection in `db.js`.

---

## 📷 Screenshots

(Add screenshots here)

---

## 👨‍💻 Author

Tarek Abdelkrim
