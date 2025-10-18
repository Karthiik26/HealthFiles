```markdown
# HealthFiles - Mini Medical Record Dashboard

A full-stack Medical Record Management System built as part of the HFiles Developer Assignment.

---

## Overview

**HealthFiles** allows users to securely sign up, upload medical reports (like lab reports, prescriptions, scans), and manage their personal information in a clean and modern dashboard interface.

This project is structured as a **monorepo** with two main branches:
- **Client (Frontend)** → Next.js + TailwindCSS
- **Server (Backend)** → Node.js + Express + MySQL

---

## Tech Stack

### Frontend (Client)
- **Framework:** Next.js (App Router)
- **Styling:** TailwindCSS
- **UI Features:**
  - Responsive design
  - Component-based dashboard
  - File upload & preview (PDF / Image)
  - Profile update and validation

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Authentication:** Session-based login (express-session / cookie)
- **Storage:** File uploads handled via multer and stored on the backend
- **API Routes:**
  - `/auth/signup`
  - `/auth/login`
  - `/profile` (GET/PUT)
  - `/files` (POST/GET/DELETE)

---

## Folder Structure

```

HealthFiles/
│
├── client/            # Frontend (Next.js)
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── server/            # Backend (Node.js + Express)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── uploads/
│   └── server.js
│
└── README.md

````

---

## Environment Variables

### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
````

### Backend (`server/.env`)

```env
PORT=5000
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=healthfiles_db
SESSION_SECRET=your_secret_key
```

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Karthiik26/HealthFiles.git
cd HealthFiles
```

### Switch to Client Branch

```bash
git checkout Client
cd client
npm install
npm run dev
```

Frontend runs on 👉 **[http://localhost:3000](http://localhost:3000)**

### Switch to Server Branch

```bash
git checkout Server
cd server
npm install
nodemon
```

Backend runs on 👉 **[http://localhost:4000](http://localhost:4000)**

---

## Features

* User Authentication (Signup / Login)
* Edit Profile (Email, Gender, Phone)
* File Upload (PDF & Image support)
* File Preview and Delete
* Responsive Dashboard Layout
* API Integration with proper validation

---

## API Response Standards

| Code  | Meaning      | Example                   |
| ----- | ------------ | ------------------------- |
| `200` | Success      | Data fetched successfully |
| `400` | Bad Request  | Missing or invalid fields |
| `401` | Unauthorized | User not logged in        |
| `500` | Server Error | Internal failure          |

---

## Notes

* Monorepo setup allows better code organization.
* All data operations are API-driven.
* Ensure MySQL is running locally before starting the backend.
cordingly.
```
