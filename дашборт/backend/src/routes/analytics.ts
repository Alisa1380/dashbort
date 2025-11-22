import { Router } from 'express';
import { analytics } from '../data/mockData';

export const analyticsRoutes = Router();

// Get analytics
analyticsRoutes.get('/', (req, res) => {
  res.json(analytics);
});

// Get load on checkpoint
analyticsRoutes.get('/load', (req, res) => {
  res.json(analytics.loadOnCheckpoint);
});

// Get hourly statistics
analyticsRoutes.get('/hourly', (req, res) => {
  res.json(analytics.hourlyStatistics);
});
