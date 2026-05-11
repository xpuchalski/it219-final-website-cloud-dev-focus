function DashboardCards({ health = {}, services }) {
  const totalServers = services.length;
  const healthyServices = services.filter((item) => item.status === 'Healthy').length;
  const warningServices = services.filter((item) => item.status === 'Warning').length;
  const criticalServices = services.filter((item) => item.status === 'Critical').length;
  const offlineServices = services.filter((item) => item.status === 'Offline').length;
  const averageUptime = totalServers ? (99.7).toFixed(2) : '0.00';

  return (
    <section className="card-grid">
      <div className="card">
        <p className="card-title">Total Servers</p>
        <p className="card-value">{totalServers}</p>
      </div>
      <div className="card">
        <p className="card-title">Healthy Services</p>
        <p className="card-value">{healthyServices}</p>
        <p className="card-meta">Based on current status values</p>
      </div>
      <div className="card">
        <p className="card-title">Warning Services</p>
        <p className="card-value">{warningServices}</p>
      </div>
      <div className="card">
        <p className="card-title">Critical / Offline</p>
        <p className="card-value">{criticalServices + offlineServices}</p>
        <p className="card-meta">Where attention is required</p>
      </div>
      <div className="card">
        <p className="card-title">Average Uptime</p>
        <p className="card-value">{averageUptime}%</p>
        <p className="card-meta">Estimated infrastructure availability</p>
      </div>
      <div className="card">
        <p className="card-title">API Health</p>
        <p className="card-value">{health?.status ?? 'Loading'}</p>
        <p className="card-meta">Response time {health?.responseTimeMs ?? '--'}ms</p>
      </div>
    </section>
  );
}

export default DashboardCards;
