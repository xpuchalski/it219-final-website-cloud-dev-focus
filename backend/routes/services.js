import express from 'express';
import { services, getMetrics } from '../data/state.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(services);
});

router.get('/metrics', (req, res) => {
  res.json(getMetrics());
});

export default router;
