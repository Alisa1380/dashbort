import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Applications.css';

interface Application {
  id: string;
  number: string;
  applicant: string;
  date: string;
  validityPeriod: string;
  status: 'Резидент' | 'Гость' | 'Такси';
  actions: string;
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    applicant: '',
    date: '',
    number: ''
  });

  useEffect(() => {
    loadApplications();
  }, [filters]);

  const loadApplications = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.applicant) params.append('applicant', filters.applicant);
      if (filters.date) params.append('date', filters.date);
      
      const response = await axios.get(`/api/applications?${params.toString()}`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await axios.post(`/api/applications/${id}/approve`);
      await loadApplications();
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.post(`/api/applications/${id}/reject`);
      await loadApplications();
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  return (
    <div className="applications">
      <div className="applications-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>Фильтр по статусу заявки:</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="filter-input"
            >
              <option value="">Все</option>
              <option value="Резидент">Резидент</option>
              <option value="Гость">Гость</option>
              <option value="Такси">Такси</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Заявитель:</label>
            <input
              type="text"
              value={filters.applicant}
              onChange={(e) => setFilters({ ...filters, applicant: e.target.value })}
              className="filter-input"
              placeholder="Иванов Иван Иванович"
            />
          </div>
        </div>
        
        <div className="filter-row">
          <div className="filter-group">
            <label>Фильтр по дате:</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="filter-input"
            />
          </div>
          
          <div className="filter-group">
            <label>Номер:</label>
            <input
              type="text"
              value={filters.number}
              onChange={(e) => setFilters({ ...filters, number: e.target.value })}
              className="filter-input"
              placeholder="Р016ВА"
            />
          </div>
        </div>
      </div>
      
      <div className="applications-table-container">
        <table className="applications-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Номер</th>
              <th>Заявитель</th>
              <th>Дата</th>
              <th>Срок действия</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.number}</td>
                <td>{app.applicant}</td>
                <td>{app.date}</td>
                <td>{app.validityPeriod}</td>
                <td>
                  <span className={`status-badge status-${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons-small">
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(app.id)}
                      disabled={app.actions === 'approved'}
                    >
                      Одобрить
                    </button>
                    <button
                      className="btn-reject-small"
                      onClick={() => handleReject(app.id)}
                      disabled={app.actions === 'rejected'}
                    >
                      Отклонить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
