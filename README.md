# CloudOps Dashboard

A cloud infrastructure operations dashboard designed to showcase cloud administration, backend monitoring, deployment workflow simulation, and DevOps-style infrastructure tools.

## Project Overview

CloudOps Dashboard simulates a lightweight internal operations portal for managing servers, services, deployments, and system health. It demonstrates cloud administration concepts including infrastructure monitoring, health checks, deployment simulation, logfile tracking, and service restart workflows.

## Technologies Used

- React
- Vite
- Express
- Node.js
- Chart.js
- SQLite-style state simulation (in memory)
- Vitest
- Supertest

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

## Running the Project

Install dependencies from the project root:

```bash
npm install
```

Start the backend and frontend together:

```bash
npm run dev
```

The frontend is available at `http://localhost:5173` and the backend API listens on `http://localhost:4000`.

## Running Tests

```bash
npm test
```

## Project Structure

- `/frontend` - React dashboard application
- `/backend` - Express API backend with simulation logic

## Portfolio Explanation

This project was built to demonstrate cloud administration and DevOps concepts through a polished dashboard. It shows backend API development, health monitoring patterns, deployment workflow simulation, and infrastructure operations tooling.
