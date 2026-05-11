import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../server.js';

let createdService;

describe('Backend API', () => {
  it('should return health information', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('healthyServices');
  });

  it('should return services in JSON format', async () => {
    const response = await request(app).get('/api/services');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('name');
  });

  it('should create a deployment record', async () => {
    const response = await request(app)
      .post('/api/deployments/deploy')
      .send({ service: 'auth-node-2' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('service');
    createdService = response.body.service;
  });

  it('should return deployments', async () => {
    const response = await request(app).get('/api/deployments');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('action');
  });

  it('should restart a service successfully', async () => {
    const response = await request(app)
      .post('/api/deployments/restart')
      .send({ service: 'database-primary' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.service.status).toBe('Healthy');
  });
});
