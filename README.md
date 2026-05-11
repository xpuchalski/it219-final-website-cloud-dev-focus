# CloudOps Dashboard

A cloud infrastructure operations dashboard designed to showcase cloud administration, backend monitoring, deployment workflow simulation, and DevOps-style infrastructure tools. Optimized for **Cloudflare Pages + Workers** edge deployment with zero cold starts.

## Project Overview

CloudOps Dashboard simulates a lightweight internal operations portal for managing servers, services, deployments, and system health. It demonstrates cloud administration concepts including infrastructure monitoring, health checks, deployment simulation, logfile tracking, and service restart workflows.

## Technologies Used

- **Frontend**: React + Vite
- **Backend**: Cloudflare Workers (serverless)
- **Hosting**: Cloudflare Pages (frontend) + Cloudflare Workers (API)
- **Visualization**: Chart.js
- **Testing**: Vitest + Supertest
- **State**: In-memory simulation (refreshes per request)

## Features

- Infrastructure dashboard cards with real-time metrics
- Server status panel with CPU, memory, disk, and uptime
- Health check API endpoints
- Deployment simulation actions (Deploy, Restart, Rollback)
- Service restart and rollback operations
- Activity logs with severity levels and timestamps
- Infrastructure metrics charts over time
- Responsive dashboard interface (desktop & mobile)
- Automated backend and frontend tests
- Global edge deployment with Cloudflare

## Running Locally

### Installation

```bash
npm install
```

### Development

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend (local Express for testing):**
```bash
cd backend
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4000`

### Testing

```bash
npm test
```

## Deploying to Cloudflare

### Prerequisites

1. Cloudflare account (free tier works)
2. GitHub repository connected to Cloudflare
3. Install Wrangler CLI: `npm install -g @cloudflare/wrangler`

### Step 1: Deploy the Backend (Workers)

1. Update `wrangler.toml` with your Cloudflare account ID (find it in Account Settings)
2. Deploy the Worker:

```bash
wrangler deploy
```

3. Note the deployed URL: `https://cloudops-dashboard-api.YOUR_USERNAME.workers.dev`

### Step 2: Deploy the Frontend (Pages)

1. Connect your GitHub repository to Cloudflare Pages
2. Configure the deployment:
   - **Framework preset**: None
   - **Build command**: `cd frontend && npm run build`
   - **Build output directory**: `frontend/dist`
3. Add **Environment Variables**:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Workers URL from Step 1
4. Deploy

### Step 3: Verify

Visit your Cloudflare Pages URL and the dashboard should load with live data!

## Project Structure

```
it219-final-project/
├── frontend/                 # React dashboard (Vite)
│   ├── src/
│   │   ├── components/      # Dashboard UI components
│   │   │   ├── DashboardCards.jsx
│   │   │   ├── ServerTable.jsx
│   │   │   ├── MetricsChart.jsx
│   │   │   └── ActivityLog.jsx
│   │   ├── services/
│   │   │   └── api.js       # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── vite.config.js
│   └── package.json
├── backend/                  # Cloudflare Worker
│   ├── worker.js            # Worker entry point
│   ├── server.js            # Local Express for testing
│   ├── data/
│   │   └── state.js         # Simulation state & logic
│   ├── routes/              # Express routes (for local testing)
│   ├── tests/
│   │   └── backend.test.js  # Test suite
│   └── package.json
├── wrangler.toml            # Cloudflare Workers config
├── package.json             # Root workspace config
└── README.md
```

## API Endpoints

### Health
- `GET /api/health` - System health and status metrics

### Services
- `GET /api/services` - List all cloud services
- `GET /api/services/metrics` - Historical metrics (CPU, memory, latency, uptime)

### Deployments
- `GET /api/deployments` - Deployment history
- `POST /api/deployments/deploy` - Simulate deployment action
- `POST /api/deployments/restart` - Simulate service restart
- `POST /api/deployments/rollback` - Simulate rollback action

### Logs
- `GET /api/logs` - System activity logs

## Why Cloudflare?

- **Zero Cold Starts**: Workers are always warm, instant response times
- **Global Distribution**: Your API serves from the nearest Cloudflare edge
- **Simple Deployment**: Push code, Cloudflare handles scaling
- **Free Tier**: More generous than typical serverless platforms
- **Modern Stack**: Edge computing is the future of deployment
- **One Dashboard**: Frontend and API in the same Cloudflare account

## Portfolio Explanation

This project demonstrates cloud administration and DevOps concepts through a professional operations dashboard. It showcases:

- Backend API development (Cloudflare Workers)
- Health monitoring and alerting patterns
- Deployment workflow simulation
- Infrastructure metrics visualization
- Responsive frontend design
- Modern edge computing architecture (Cloudflare)
- Full-stack cloud deployment

Perfect for roles like Junior Cloud Administrator, DevOps Engineer, or Cloud Operations roles.

## Local Development Notes

- The backend runs on `localhost:4000` locally for testing with Express
- The Worker version is deployed to Cloudflare and doesn't run locally
- Frontend defaults to `http://localhost:4000` for local development
- In production, VITE_API_URL is set to the Cloudflare Workers URL via environment variables

