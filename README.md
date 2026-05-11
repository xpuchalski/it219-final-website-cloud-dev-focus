# CloudOps Dashboard

A cloud infrastructure operations dashboard designed to showcase cloud administration, backend monitoring, deployment workflow simulation, and DevOps-style infrastructure tools.

## Project Overview

CloudOps Dashboard simulates a lightweight internal operations portal for managing servers, services, deployments, and system health. It demonstrates cloud administration concepts including infrastructure monitoring, health checks, deployment simulation, logfile tracking, and service restart workflows.

## Technologies Used

- React + Vite (Frontend)
- Express + Node.js (Backend)
- Chart.js (Metrics visualization)
- Vitest + Supertest (Testing)
- Vercel (Frontend hosting)
- Render (Backend hosting)

## Features

- Infrastructure dashboard cards
- Server status panel with CPU, memory, disk, and uptime
- Health check API endpoint
- Deployment simulation actions
- Service restart and rollback actions
- Activity logs with severity and timestamps
- Metrics chart visualization
- Responsive dashboard interface
- Automated backend and frontend tests
- Full-stack cloud deployment

## Running the Project Locally

### Setup

Install dependencies from the project root:

```bash
npm install
```

### Development

Start the backend and frontend together:

```bash
npm run dev
```

The frontend is available at `http://localhost:5173` and the backend API listens on `http://localhost:4000`.

### Testing

```bash
npm test
```

## Deployment to Vercel & Render

### Frontend (Vercel)

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Set the build command to: `npm run build`
3. Set the output directory to: `frontend/dist`
4. Add environment variable: `VITE_API_URL` with your Render backend URL (e.g., `https://your-backend.onrender.com`)
5. Deploy

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the build command to: `npm --workspace backend install && npm --workspace backend run build` (or just install dependencies)
4. Set the start command to: `npm --workspace backend run start` or `node backend/server.js`
5. Deploy

After deployment, copy your Render backend URL and add it to Vercel as the `VITE_API_URL` environment variable.

## Project Structure

- `/frontend` - React dashboard application
  - `/src/components` - Dashboard components (DashboardCards, ServerTable, MetricsChart, ActivityLog)
  - `/src/services` - API client
  - `/vite.config.js` - Vite configuration
- `/backend` - Express API backend with simulation logic
  - `/routes` - API route handlers
  - `/data` - State management
  - `/tests` - Backend test suite
  - `server.js` - Express server entry point

## API Endpoints

### Health
- `GET /api/health` - System health status

### Services
- `GET /api/services` - List all services
- `GET /api/services/metrics` - Infrastructure metrics

### Deployments
- `GET /api/deployments` - Deployment history
- `POST /api/deployments/deploy` - Simulate deployment
- `POST /api/deployments/restart` - Restart service
- `POST /api/deployments/rollback` - Rollback deployment

### Logs
- `GET /api/logs` - Activity logs

## Portfolio Explanation

This project was built to demonstrate cloud administration and DevOps concepts through a polished, professional dashboard. It shows backend API development, health monitoring patterns, deployment workflow simulation, infrastructure operations tooling, and cloud deployment practices.

