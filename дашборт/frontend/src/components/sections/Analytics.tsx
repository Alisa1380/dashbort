import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';

interface LoadData {
  resident: { percentage: number; count: number };
  guest: { percentage: number; count: number };
  taxi: { percentage: number; count: number };
}

interface AnalyticsData {
  loadOnCheckpoint: LoadData;
  hourlyStatistics: any[];
}

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    loadOnCheckpoint: {
      resident: { percentage: 0, count: 0 },
      guest: { percentage: 0, count: 0 },
      taxi: { percentage: 0, count: 0 }
    },
    hourlyStatistics: []
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  return (
    <div className="analytics">
      <div className="analytics-filter">
        <label>Фильтр:</label>
        <select className="filter-select">
          <option>Все</option>
          <option>Сегодня</option>
          <option>Неделя</option>
          <option>Месяц</option>
        </select>
      </div>
      
      <div className="analytics-content">
        <div className="analytics-left">
          <h3 className="analytics-title">Нагрузка на КПП</h3>
          
          <div className="load-item">
            <div className="load-header">
              <span className="load-label">Резидент:</span>
              <span className="load-value">
                {analytics.loadOnCheckpoint.resident.percentage}% ({analytics.loadOnCheckpoint.resident.count} чел.)
              </span>
            </div>
            <div className="load-bar">
              <div
                className="load-bar-fill resident"
                style={{ width: `${analytics.loadOnCheckpoint.resident.percentage}%` }}
              />
            </div>
          </div>
          
          <div className="load-item">
            <div className="load-header">
              <span className="load-label">Гость:</span>
              <span className="load-value">
                {analytics.loadOnCheckpoint.guest.percentage}% ({analytics.loadOnCheckpoint.guest.count} чел.)
              </span>
            </div>
            <div className="load-bar">
              <div
                className="load-bar-fill guest"
                style={{ width: `${analytics.loadOnCheckpoint.guest.percentage}%` }}
              />
            </div>
          </div>
          
          <div className="load-item">
            <div className="load-header">
              <span className="load-label">Такси:</span>
              <span className="load-value">
                {analytics.loadOnCheckpoint.taxi.percentage}% ({analytics.loadOnCheckpoint.taxi.count} чел.)
              </span>
            </div>
            <div className="load-bar">
              <div
                className="load-bar-fill taxi"
                style={{ width: `${analytics.loadOnCheckpoint.taxi.percentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="analytics-right">
          <h3 className="analytics-title">Статистика по часам</h3>
          <div className="hourly-chart-placeholder">
            <p>График будет здесь</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
