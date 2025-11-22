import { Router } from 'express';
import { applications } from '../data/mockData';

export const applicationsRoutes = Router();

// Get all applications
applicationsRoutes.get('/', (req, res) => {
  const { status, date, applicant } = req.query;
  
  let filtered = [...applications];
  
  if (status) {
    filtered = filtered.filter(a => a.status === status);
  }
  
  if (applicant) {
    filtered = filtered.filter(a => 
      a.applicant.toLowerCase().includes((applicant as string).toLowerCase())
    );
  }
  
  if (date) {
    filtered = filtered.filter(a => a.date === date);
  }
  
  res.json(filtered);
});

// Get single application
applicationsRoutes.get('/:id', (req, res) => {
  const application = applications.find(a => a.id === req.params.id);
  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json(application);
});

// Approve application
applicationsRoutes.post('/:id/approve', (req, res) => {
  const application = applications.find(a => a.id === req.params.id);
  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }
  
  application.actions = 'approved';
  res.json(application);
});

// Reject application
applicationsRoutes.post('/:id/reject', (req, res) => {
  const application = applications.find(a => a.id === req.params.id);
  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }
  
  application.actions = 'rejected';
  res.json(application);
});
