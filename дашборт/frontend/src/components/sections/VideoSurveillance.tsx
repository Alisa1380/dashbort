import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoSurveillance.css';

interface Vehicle {
  id: string;
  number: string;
  status: string;
  user: string;
  territory: string;
  passage?: string;
  exit?: string;
}

interface HistoryEntry {
  number: string;
  time: string;
  type: 'entry' | 'exit';
}

const VideoSurveillance: React.FC = () => {
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [number, setNumber] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [currentRes, historyRes] = await Promise.all([
        axios.get('/api/video/current'),
        axios.get('/api/video/history')
      ]);
      setCurrentVehicle(currentRes.data);
      setHistory(historyRes.data);
      if (currentRes.data) {
        setNumber(currentRes.data.number);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleAdd = async () => {
    if (!number) return;
    
    try {
      await axios.post('/api/video/entry', {
        number,
        user: 'Иванов Иван Иванович',
        territory: 'КПП-1'
      });
      await loadData();
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const handleReject = async () => {
    if (!currentVehicle) return;
    
    try {
      await axios.post('/api/video/reject', { number: currentVehicle.number });
      await loadData();
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  return (
    <div className="video-surveillance">
      <div className="video-content">
        <div className="video-left">
          <div className="camera-placeholder">
            <div className="camera-icon">📹</div>
            <p>Камера 1</p>
          </div>
        </div>
        
        <div className="video-right">
          <div className="vehicle-info">
            <div className="info-row">
              <label>Номера:</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value.toUpperCase())}
                placeholder="X333OH"
                className="number-input"
              />
            </div>
            
            {currentVehicle && (
              <>
                <div className="info-row">
                  <label>Номер:</label>
                  <span>{currentVehicle.number}</span>
                </div>
                <div className="info-row">
                  <label>Статус:</label>
                  <span>{currentVehicle.status}</span>
                </div>
                <div className="info-row">
                  <label>Пользователь:</label>
                  <span>{currentVehicle.user}</span>
                </div>
                <div className="info-row">
                  <label>Территория:</label>
                  <span>{currentVehicle.territory}</span>
                </div>
                <div className="info-row">
                  <label>Проезд:</label>
                  <span>{currentVehicle.passage || '—'}</span>
                </div>
                <div className="info-row">
                  <label>Выезд:</label>
                  <span>{currentVehicle.exit || '—'}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="history-section">
            <h3>История:</h3>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Время</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 5).map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.number}</td>
                    <td>{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="action-buttons">
            <button className="btn-reject" onClick={handleReject}>
              Отклонить
            </button>
            <button className="btn-add" onClick={handleAdd}>
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSurveillance;
