# CareerCraft — Resume Management Platform

CareerCraft is a full-stack web application for creating and storing resumes. It includes user authentication, PDF upload handling, and structured resume data stored in MongoDB.

---

## Table of contents

- Overview
- Tech stack
- Project structure
- Prerequisites
- Setup & run
- Environment variables
- Data & uploads
- Contributing
- License

---

## Overview

Minimal resume builder and storage backend used for demos and learning. The project separates backend (API + storage) and frontend (React + Vite) for easy local development.

## Tech stack

- Backend: Node.js, Express, Mongoose, MongoDB Atlas, JWT, Multer
- Frontend: React, Vite, Tailwind CSS (optional), Axios

---

## Project structure

Top-level layout (abridged):

```
CareerCraft-master/
├── backend/          # Express API, routes, models, uploads
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/      # uploaded resume PDFs
│   ├── server.js
│   └── package.json
├── frontend/         # React app (Vite)
│   ├── src/
│   ├── index.html
│   └── package.json
├── README.md
└── .gitignore
```

Adjustments: open the `backend` and `frontend` folders to see specific files and components.

---

## Prerequisites

- Node.js (>= 16) and npm
- A MongoDB Atlas cluster or MongoDB instance

---

## Environment variables

Create a `.env` file in the `backend` folder. Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/careercraft
JWT_SECRET=your_strong_random_secret
```

Do not commit `.env` to source control.

---

## Setup & Run

Backend (API):

```bash
cd backend
npm install
npm start
```

Frontend (development server):

```bash
cd frontend
npm install
npm run dev
```

Visit the frontend URL printed by Vite (usually `http://localhost:5173`) and ensure the backend is running on the port from `.env` (default `5000`).

---

## Data & uploads

- Uploaded PDFs are stored under `backend/uploads/` by default.
- Resume metadata and structured data are stored in MongoDB (`users`, `resumes` collections).

To inspect data: use MongoDB Atlas → Data Explorer or connect with a local MongoDB GUI.

---

## Contribution

1. Fork the repo and create a branch for your feature: `git checkout -b feature/name`
2. Make changes and run the app locally
3. Open a pull request with a clear description

---

## License

For educational and development use.
# CareerCraft
