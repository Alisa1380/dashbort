import { Router } from 'express';
import { databaseRecords } from '../data/mockData';

export const databaseRoutes = Router();

// Get all records
databaseRoutes.get('/', (req, res) => {
  res.json(databaseRecords);
});

// Get single record
databaseRoutes.get('/:id', (req, res) => {
  const record = databaseRecords.find(r => r.id === req.params.id);
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }
  res.json(record);
});

// Add new record
databaseRoutes.post('/', (req, res) => {
  const { accessType, fullName, phone, number } = req.body;
  
  const newRecord: any = {
    id: Date.now().toString(),
    number: number || `A${Math.floor(Math.random() * 1000)}AA`,
    date: new Date().toLocaleDateString('ru-RU'),
    access: accessType === 'Резидент' ? 'Резидент' : accessType === 'Гость' ? 'Гость' : 'Такси',
    fullName,
    phone,
    accessType
  };
  
  databaseRecords.push(newRecord);
  res.json(newRecord);
});

// Update record
databaseRoutes.put('/:id', (req, res) => {
  const index = databaseRecords.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }
  
  databaseRecords[index] = { ...databaseRecords[index], ...req.body };
  res.json(databaseRecords[index]);
});

// Delete record
databaseRoutes.delete('/:id', (req, res) => {
  const index = databaseRecords.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }
  
  databaseRecords.splice(index, 1);
  res.json({ success: true });
});
