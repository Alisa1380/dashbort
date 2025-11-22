import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { videoRoutes } from './routes/video';
import { databaseRoutes } from './routes/database';
import { applicationsRoutes } from './routes/applications';
import { statisticsRoutes } from './routes/statistics';
import { analyticsRoutes } from './routes/analytics';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/video', videoRoutes);
app.use('/api/database', databaseRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
