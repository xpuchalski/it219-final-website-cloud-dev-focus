import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App.jsx';

vi.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="chart-placeholder" />
}));

const serviceMock = [
  {
    id: 'api-us-east-1',
    name: 'api-us-east-1',
    region: 'us-east-1',
    status: 'Healthy',
    cpu: 37,
    memory: 51,
    disk: 67,
    uptime: '12 days',
    lastDeployment: '2026-05-11 10:00',
    responseTime: 125
  }
];

const metricsMock = {
  labels: ['-3h', '-2h', '-1h'],
  cpu: [34, 41, 38],
  memory: [52, 56, 54],
  latency: [118, 132, 125],
  uptime: [99.7, 99.8, 99.6]
};

const logsMock = [
  { id: 1, timestamp: '2026-05-11 11:00', severity: 'Info', message: 'Test log entry.' }
];

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.endsWith('/api/health')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ status: 'Operational', responseTimeMs: 120 }) });
    }
    if (url.endsWith('/api/services')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(serviceMock) });
    }
    if (url.endsWith('/api/services/metrics')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(metricsMock) });
    }
    if (url.endsWith('/api/logs')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(logsMock) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  });
});

test('renders the dashboard header', async () => {
  render(<App />);
  expect(screen.getByText(/CloudOps Dashboard/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText(/api-us-east-1/i)).toBeInTheDocument());
});

test('shows server row and action buttons', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByText('api-us-east-1')).toBeInTheDocument());
  expect(screen.getByText('Deploy')).toBeInTheDocument();
  expect(screen.getByText('Restart')).toBeInTheDocument();
  expect(screen.getByText('Rollback')).toBeInTheDocument();
});
