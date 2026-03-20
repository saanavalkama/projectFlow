# ProjectFlow

A fullstack web application for managing projects and tasks.

## 🚀 Overview

ProjectFlow is a simple project management app where users can:

* create projects
* add tasks inside projects
* update task status
* filter and manage tasks

This project is built as a learning project to practice fullstack development with modern tools.

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* TypeScript
* React Router
* TanStack Query
* Redux Toolkit

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM

### Database

* PostgreSQL

### DevOps

* Docker
* Docker Compose

---

## 📁 Project Structure

```
projectflow/
  client/   # React frontend
  server/   # Express backend
```

---

## ⚙️ Setup

### 1. Clone the repo

```
git clone https://github.com/your-username/projectFlow.git
cd projectFlow
```

---

### 2. Backend setup

```
cd server
npm install
```

Create `.env` file:

```
PORT=x
DATABASE_URL=x
CLIENT_ORIGIN=x
```

Run migrations:

```
npx prisma migrate dev
```

Start server:

```
npm run dev
```

---

### 3. Frontend setup

```
cd client
npm install
```

Create `.env` file:

```
VITE_API_BASE_URL=x
```

Start frontend:

```
npm run dev
```

---

## 🧪 Available API Endpoints

### Projects

* `GET /projects` → fetch all projects
* `POST /projects` → create a new project

---

## 📌 Current Features

* Create projects
* Fetch and display projects
* Basic UI state with Redux
* Server state with TanStack Query
* PostgreSQL + Prisma integration

---

## 🧭 Roadmap

### Future

* Authentication
* User accounts
* Improved UI/UX

---

## ⚠️ Notes

* `.env` files are not committed
* Prisma migrations are included
* This project is under active development

---

## 📄 License

MIT
