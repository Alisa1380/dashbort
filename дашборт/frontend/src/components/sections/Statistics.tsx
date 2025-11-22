import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Statistics.css';

interface StatisticsData {
  entry: number;
  exit: number;
  onApplication: number;
  rejection: number;
  onTerritory: number;
}

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsData>({
    entry: 0,
    exit: 0,
    onApplication: 0,
    rejection: 0,
    onTerritory: 0
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const response = await axios.get('/api/statistics/today');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  return (
    <div className="statistics">
      <h2 className="section-title">Статистика за сегодня</h2>
      
      <table className="statistics-table">
        <tbody>
          <tr>
            <td className="stat-label">Въезд:</td>
            <td className="stat-value">{statistics.entry}</td>
          </tr>
          <tr>
            <td className="stat-label">Выезд:</td>
            <td className="stat-value">{statistics.exit}</td>
          </tr>
          <tr>
            <td className="stat-label">На заявке:</td>
            <td className="stat-value">{statistics.onApplication}</td>
          </tr>
          <tr>
            <td className="stat-label">Отказ:</td>
            <td className="stat-value">{statistics.rejection}</td>
          </tr>
          <tr>
            <td className="stat-label">На территории:</td>
            <td className="stat-value">{statistics.onTerritory}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
