function ServerTable({ services = [], onAction }) {
  if (!services.length) {
    return <p>Loading server information...</p>;
  }

  const statusClass = (value) => `status-pill ${value}`;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Server</th>
            <th>Region</th>
            <th>Status</th>
            <th>CPU</th>
            <th>Memory</th>
            <th>Uptime</th>
            <th>Last Deployment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((server) => (
            <tr key={server.id}>
              <td>{server.name}</td>
              <td>{server.region}</td>
              <td><span className={statusClass(server.status)}>{server.status}</span></td>
              <td>{server.cpu}%</td>
              <td>{server.memory}%</td>
              <td>{server.uptime}</td>
              <td>{server.lastDeployment}</td>
              <td>
                <button className="action-button deploy" onClick={() => onAction(server.name, 'Deploy')}>
                  Deploy
                </button>
                <button className="action-button restart" onClick={() => onAction(server.name, 'Restart')}>
                  Restart
                </button>
                <button className="action-button rollback" onClick={() => onAction(server.name, 'Rollback')}>
                  Rollback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServerTable;
