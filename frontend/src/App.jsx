import { useEffect, useState } from 'react';
import { fetchHealth, fetchServices, fetchMetrics, fetchLogs, deployService, restartService, rollbackService } from './services/api.js';
import DashboardCards from './components/DashboardCards.jsx';
import ServerTable from './components/ServerTable.jsx';
import MetricsChart from './components/MetricsChart.jsx';
import ActivityLog from './components/ActivityLog.jsx';

function App() {
  const [health, setHealth] = useState(null);
  const [services, setServices] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Loading dashboard...');

  const loadDashboard = async () => {
    try {
      const [healthData, serviceData, metricsData, logsData] = await Promise.all([
        fetchHealth(),
        fetchServices(),
        fetchMetrics(),
        fetchLogs()
      ]);
      setHealth(healthData);
      setServices(serviceData);
      setMetrics(metricsData);
      setLogs(logsData);
      setStatusMessage('Dashboard updated.');
    } catch (error) {
      setStatusMessage('Unable to load dashboard data.');
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (serviceId, action) => {
    setStatusMessage(`${action} ${serviceId}...`);
    try {
      if (action === 'Deploy') {
        await deployService(serviceId);
      } else if (action === 'Restart') {
        await restartService(serviceId);
      } else if (action === 'Rollback') {
        await rollbackService(serviceId);
      }
      await loadDashboard();
    } catch (error) {
      setStatusMessage(`Action failed: ${error.message}`);
    }
  };

  return (
    <div className="app-shell">
      <header className="header">
        <div>
          <p className="eyebrow">Cloud Administration Portfolio</p>
          <h1>CloudOps Dashboard</h1>
          <p className="summary">Monitor service health, simulate deployments, review logs, and inspect infrastructure metrics.</p>
        </div>
        <div className="header-actions">
          <button className="refresh-button" onClick={loadDashboard}>Refresh</button>
          <span className="status-text">{statusMessage}</span>
        </div>
      </header>

      <DashboardCards health={health} services={services} deployments={null} />

      <section className="grid-layout">
        <div className="panel panel-large">
          <div className="panel-header">
            <h2>Server Status</h2>
            <p>Inspect live metrics, uptime, and operations actions.</p>
          </div>
          <ServerTable services={services} onAction={handleAction} />
        </div>

        <div className="panel panel-medium">
          <div className="panel-header">
            <h2>Infrastructure Metrics</h2>
          </div>
          {metrics ? <MetricsChart metrics={metrics} /> : <p>Loading metrics...</p>}
        </div>

        <div className="panel panel-medium">
          <div className="panel-header">
            <h2>Activity Log</h2>
          </div>
          <ActivityLog logs={logs} />
        </div>
      </section>
    </div>
  );
}

export default App;
