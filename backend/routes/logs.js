import express from 'express';
import { logs } from '../data/state.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(logs);
});

export default router;
