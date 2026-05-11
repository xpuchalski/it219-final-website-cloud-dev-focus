import express from 'express';
import { deployments, getServiceById, simulateDeploymentAction } from '../data/state.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(deployments);
});

router.post('/deploy', (req, res) => {
  const { service } = req.body;
  if (!service) {
    return res.status(400).json({ success: false, message: 'Service name is required.' });
  }

  try {
    const updated = simulateDeploymentAction(service, 'Deploy');
    res.json({ success: true, message: `${updated.name} deployment completed.`, service: updated });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.post('/restart', (req, res) => {
  const { service } = req.body;
  if (!service) {
    return res.status(400).json({ success: false, message: 'Service name is required.' });
  }

  try {
    const updated = simulateDeploymentAction(service, 'Restart');
    res.json({ success: true, message: `${updated.name} restarted successfully.`, service: updated });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.post('/rollback', (req, res) => {
  const { service } = req.body;
  if (!service) {
    return res.status(400).json({ success: false, message: 'Service name is required.' });
  }

  try {
    const updated = simulateDeploymentAction(service, 'Rollback');
    res.json({ success: true, message: `${updated.name} rollback completed.`, service: updated });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

export default router;
