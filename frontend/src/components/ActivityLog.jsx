function ActivityLog({ logs = [] }) {
  if (!logs.length) {
    return <p>No activity events available.</p>;
  }

  return (
    <div className="activity-list">
      {logs.slice(0, 8).map((entry) => (
        <div key={entry.id} className="activity-item">
          <p className="activity-severity">{entry.severity} · {entry.timestamp}</p>
          <p>{entry.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ActivityLog;
