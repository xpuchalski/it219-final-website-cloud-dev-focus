import { simulateDeploymentAction } from '../state.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { service } = req.body;
    if (!service) {
      return res.status(400).json({ success: false, message: 'Service name is required.' });
    }

    try {
      const updated = simulateDeploymentAction(service, 'Restart');
      res.status(200).json({ success: true, message: `${updated.name} restarted successfully.`, service: updated });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
