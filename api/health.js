import { getSystemHealth } from './state.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const health = getSystemHealth();
    res.status(200).json(health);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
