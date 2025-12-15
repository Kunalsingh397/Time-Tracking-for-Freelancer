# Freelancer Time Tracker — MERN

This repository contains a MERN-stack Freelancer Time Tracking app scaffold (backend + frontend).

Quick start

1. Backend

```bash
cd backend
npm install
cp .env.example .env
# set MONGO_URI and JWT_SECRET in .env
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
# optionally set VITE_API_URL in .env
npm run dev
```

Notes
- Backend runs on port specified in `.env` (default 5000). API base path: `/api`.
- Frontend uses Vite; configure `VITE_API_URL` to point to backend (e.g. `http://localhost:5000/api`).

Files created
- Backend: models (User, Client, Project, TimeLog, Invoice), controllers, routes, auth middleware, invoice PDF util.
- Frontend: React + Vite app with pages for Login/Register/Dashboard/Clients/Projects/TimeTracker/Invoices, Axios API wrapper, Tailwind CSS.
