// Use VITE_API_URL environment variable (set via Cloudflare Pages)
// Falls back to /api for local development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Network response was not ok');
  }

  return res.json();
}

export const fetchHealth = () => request('/health');
export const fetchServices = () => request('/services');
export const fetchMetrics = () => request('/services/metrics');
export const fetchLogs = () => request('/logs');
export const deployService = (service) => request('/deployments/deploy', {
  method: 'POST',
  body: JSON.stringify({ service })
});
export const restartService = (service) => request('/deployments/restart', {
  method: 'POST',
  body: JSON.stringify({ service })
});
export const rollbackService = (service) => request('/deployments/rollback', {
  method: 'POST',
  body: JSON.stringify({ service })
});
