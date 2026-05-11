// In-memory state for serverless functions
// Note: State resets per invocation on Vercel, but that's acceptable for this demo

let services = [
  {
    id: 'api-us-east-1',
    name: 'api-us-east-1',
    region: 'us-east-1',
    status: 'Healthy',
    cpu: 38,
    memory: 54,
    disk: 68,
    uptime: '32 days 4h',
    lastDeployment: '2026-05-10 21:15',
    responseTime: 122
  },
  {
    id: 'auth-node-2',
    name: 'auth-node-2',
    region: 'us-central-1',
    status: 'Warning',
    cpu: 64,
    memory: 72,
    disk: 81,
    uptime: '18 days 12h',
    lastDeployment: '2026-05-10 18:42',
    responseTime: 190
  },
  {
    id: 'database-primary',
    name: 'database-primary',
    region: 'us-west-2',
    status: 'Healthy',
    cpu: 28,
    memory: 47,
    disk: 59,
    uptime: '54 days 6h',
    lastDeployment: '2026-05-09 11:00',
    responseTime: 95
  },
  {
    id: 'edge-cache-west',
    name: 'edge-cache-west',
    region: 'us-west-1',
    status: 'Critical',
    cpu: 88,
    memory: 93,
    disk: 91,
    uptime: '6 days 8h',
    lastDeployment: '2026-05-11 09:30',
    responseTime: 285
  }
];

let deployments = [
  {
    id: 1,
    service: 'auth-node-2',
    action: 'Deploy',
    status: 'Success',
    timestamp: '2026-05-10 18:42',
    details: 'Auth service update delivered.'
  },
  {
    id: 2,
    service: 'api-us-east-1',
    action: 'Restart',
    status: 'Success',
    timestamp: '2026-05-09 21:15',
    details: 'Routine restart after maintenance window.'
  }
];

let logs = [
  {
    id: 1,
    timestamp: '2026-05-11 10:02',
    severity: 'Info',
    message: 'API health check completed successfully.'
  },
  {
    id: 2,
    timestamp: '2026-05-11 09:55',
    severity: 'Warning',
    message: 'auth-node-2 CPU usage rose above 70%.'
  },
  {
    id: 3,
    timestamp: '2026-05-11 09:35',
    severity: 'Critical',
    message: 'edge-cache-west latency exceeded SLA threshold.'
  }
];

const metrics = {
  labels: ['-11h', '-9h', '-7h', '-5h', '-3h', '-1h'],
  cpu: [34, 42, 39, 48, 43, 51],
  memory: [52, 57, 54, 60, 59, 62],
  latency: [118, 132, 125, 142, 138, 150],
  uptime: [99.6, 99.7, 99.5, 99.8, 99.7, 99.9]
};

function normalize(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getServiceById(serviceId) {
  return services.find((service) => service.id === serviceId || service.name === serviceId);
}

function refreshServiceMetrics() {
  services.forEach((service) => {
    service.cpu = normalize(service.cpu + randomBetween(-6, 6), 5, 98);
    service.memory = normalize(service.memory + randomBetween(-5, 5), 10, 96);
    service.disk = normalize(service.disk + randomBetween(-3, 3), 20, 92);
    service.responseTime = normalize(service.responseTime + randomBetween(-15, 20), 70, 320);

    if (service.cpu > 85 || service.memory > 90 || service.disk > 90 || service.responseTime > 260) {
      service.status = 'Critical';
    } else if (service.cpu > 65 || service.memory > 75 || service.disk > 80 || service.responseTime > 200) {
      service.status = 'Warning';
    } else {
      service.status = 'Healthy';
    }
  });
}

function getSystemHealth() {
  refreshServiceMetrics();
  const healthyServices = services.filter((item) => item.status === 'Healthy').length;
  const warningServices = services.filter((item) => item.status === 'Warning').length;
  const offlineServices = services.filter((item) => item.status === 'Offline').length;

  return {
    status: offlineServices > 0 ? 'Degraded' : 'Operational',
    healthyServices,
    warningServices,
    offlineServices,
    responseTimeMs: randomBetween(95, 220),
    updatedAt: new Date().toISOString()
  };
}

function getMetrics() {
  metrics.cpu = metrics.cpu.map((value) => normalize(value + randomBetween(-4, 4), 20, 90));
  metrics.memory = metrics.memory.map((value) => normalize(value + randomBetween(-3, 3), 40, 90));
  metrics.latency = metrics.latency.map((value) => normalize(value + randomBetween(-8, 8), 90, 260));
  metrics.uptime = metrics.uptime.map((value) => normalize(value + (Math.random() * 0.1 - 0.05), 99.0, 99.98));
  return metrics;
}

function addLog(entry) {
  logs.unshift({
    id: logs.length + 1,
    timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
    severity: entry.severity,
    message: entry.message
  });
  if (logs.length > 20) logs.pop();
}

function addDeployment(record) {
  deployments.unshift({
    id: deployments.length + 1,
    ...record
  });
  if (deployments.length > 20) deployments.pop();
}

function simulateDeploymentAction(serviceName, actionName) {
  const service = getServiceById(serviceName);
  if (!service) {
    throw new Error('Service not found');
  }

  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const outcome = actionName === 'Rollback' ? 'Rolled back' : actionName === 'Restart' ? 'Restarted' : 'Deployed';

  if (actionName === 'Restart') {
    service.status = 'Healthy';
    service.cpu = normalize(service.cpu - 20, 5, 95);
    service.memory = normalize(service.memory - 16, 8, 95);
    service.responseTime = normalize(service.responseTime - 50, 70, 220);
  }

  service.lastDeployment = now;

  if (actionName === 'Rollback') {
    service.status = 'Warning';
    service.responseTime = normalize(service.responseTime + 30, 80, 270);
  }

  if (actionName === 'Deploy') {
    service.status = 'Healthy';
    service.cpu = normalize(service.cpu - 10, 10, 92);
    service.memory = normalize(service.memory - 8, 10, 92);
    service.responseTime = normalize(service.responseTime - 45, 70, 240);
  }

  addDeployment({
    service: service.name,
    action: actionName,
    status: 'Success',
    timestamp: now,
    details: `${service.name} ${outcome} successfully.`
  });

  addLog({
    severity: actionName === 'Rollback' ? 'Warning' : 'Info',
    message: `${service.name} ${outcome.toLowerCase()} at ${now}.`
  });

  return service;
}

export { services, deployments, logs, getSystemHealth, getMetrics, getServiceById, simulateDeploymentAction, addLog };
