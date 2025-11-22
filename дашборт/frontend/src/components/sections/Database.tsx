import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Database.css';

interface DatabaseRecord {
  id: string;
  photo?: string;
  number: string;
  date: string;
  access: 'Резидент' | 'Гость' | 'Такси';
  fullName: string;
  phone: string;
  accessType: string;
}

const Database: React.FC = () => {
  const [records, setRecords] = useState<DatabaseRecord[]>([]);
  const [formData, setFormData] = useState({
    accessType: 'Резидент',
    fullName: '',
    phone: ''
  });
  const [selectedRecord, setSelectedRecord] = useState<DatabaseRecord | null>(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const response = await axios.get('/api/database');
      setRecords(response.data);
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  const handleAdd = async () => {
    if (!formData.fullName || !formData.phone) return;
    
    try {
      await axios.post('/api/database', formData);
      setFormData({ accessType: 'Резидент', fullName: '', phone: '' });
      await loadRecords();
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedRecord) return;
    
    try {
      await axios.put(`/api/database/${selectedRecord.id}`, {
        fullName: formData.fullName,
        phone: formData.phone,
        accessType: formData.accessType
      });
      await loadRecords();
      setSelectedRecord(null);
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  return (
    <div className="database">
      <h2 className="section-title">Добавить новую запись:</h2>
      
      <div className="database-content">
        <div className="database-left">
          <div className="form-group">
            <label>Тип доступа:</label>
            <select
              value={formData.accessType}
              onChange={(e) => setFormData({ ...formData, accessType: e.target.value })}
              className="form-input"
            >
              <option value="Резидент">Резидент</option>
              <option value="Гость">Гость</option>
              <option value="Такси">Такси</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>ФИО:</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="form-input"
              placeholder="Иванов Иван Иванович"
            />
          </div>
          
          <div className="form-group">
            <label>Номер телефона:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-input"
              placeholder="+7 000 000 00 00"
            />
          </div>
          
          <div className="form-buttons">
            <button className="btn-primary" onClick={handleAdd}>
              Добавить
            </button>
            <button className="btn-secondary" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        </div>
        
        <div className="database-right">
          {selectedRecord && (
            <div className="selected-record">
              <div className="form-group">
                <label>ФИО:</label>
                <input
                  type="text"
                  value={formData.fullName || selectedRecord.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Телефон:</label>
                <input
                  type="tel"
                  value={formData.phone || selectedRecord.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          )}
          
          <div className="records-table-container">
            <table className="records-table">
              <thead>
                <tr>
                  <th>Фото камер</th>
                  <th>Номер</th>
                  <th>Дата</th>
                  <th>Доступ</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr
                    key={record.id}
                    onClick={() => {
                      setSelectedRecord(record);
                      setFormData({
                        accessType: record.accessType,
                        fullName: record.fullName,
                        phone: record.phone
                      });
                    }}
                    className={selectedRecord?.id === record.id ? 'selected' : ''}
                  >
                    <td>
                      <div className="photo-placeholder">📷</div>
                    </td>
                    <td>{record.number}</td>
                    <td>{record.date}</td>
                    <td>{record.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
