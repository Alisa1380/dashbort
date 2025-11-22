import { Router } from 'express';
import { vehicles, history } from '../data/mockData';

export const videoRoutes = Router();

// Get current vehicle info
videoRoutes.get('/current', (req, res) => {
  const currentVehicle = vehicles.find(v => v.status === 'На территории' || v.status === 'На заявке');
  res.json(currentVehicle || null);
});

// Get history
videoRoutes.get('/history', (req, res) => {
  res.json(history);
});

// Add vehicle entry
videoRoutes.post('/entry', (req, res) => {
  const { number, user, territory } = req.body;
  
  const newVehicle: any = {
    id: Date.now().toString(),
    number,
    status: 'На территории',
    user: user || 'Неизвестно',
    territory: territory || 'КПП-1',
    passage: new Date().toLocaleString('ru-RU'),
    timestamp: new Date().toISOString(),
    type: 'entry'
  };
  
  vehicles.push(newVehicle);
  history.unshift({
    number: `ПРОЕЗД ${number}`,
    time: newVehicle.passage,
    type: 'entry'
  });
  
  res.json(newVehicle);
});

// Add vehicle exit
videoRoutes.post('/exit', (req, res) => {
  const { number } = req.body;
  
  const vehicle = vehicles.find(v => v.number === number);
  if (vehicle) {
    vehicle.status = 'Выехал';
    vehicle.exit = new Date().toLocaleString('ru-RU');
    vehicle.type = 'exit';
    
    history.unshift({
      number: `ВЫЕЗД ${number}`,
      time: vehicle.exit,
      type: 'exit'
    });
  }
  
  res.json({ success: true });
});

// Reject vehicle
videoRoutes.post('/reject', (req, res) => {
  const { number } = req.body;
  
  const vehicle = vehicles.find(v => v.number === number);
  if (vehicle) {
    vehicle.status = 'Отклонен';
  }
  
  res.json({ success: true });
});
