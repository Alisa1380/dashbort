import { Router } from 'express';
import { statistics } from '../data/mockData';

export const statisticsRoutes = Router();

// Get today's statistics
statisticsRoutes.get('/today', (req, res) => {
  res.json(statistics);
});

// Update statistics
statisticsRoutes.post('/', (req, res) => {
  Object.assign(statistics, req.body);
  res.json(statistics);
});
