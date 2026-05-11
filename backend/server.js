import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health.js';
import servicesRouter from './routes/services.js';
import deploymentsRouter from './routes/deployments.js';
import logsRouter from './routes/logs.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'CloudOps Dashboard API is running.' });
});
app.use('/api/health', healthRouter);
app.use('/api/services', servicesRouter);
app.use('/api/deployments', deploymentsRouter);
app.use('/api/logs', logsRouter);

if (process.argv[1] === new URL(import.meta.url).pathname) {
  app.listen(PORT, () => {
    console.log(`Backend server listening on http://localhost:${PORT}`);
  });
}

export default app;
