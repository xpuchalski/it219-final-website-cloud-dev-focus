import express from 'express';
import { getSystemHealth } from '../data/state.js';

const router = express.Router();

router.get('/', (req, res) => {
  const health = getSystemHealth();
  res.json(health);
});

export default router;
