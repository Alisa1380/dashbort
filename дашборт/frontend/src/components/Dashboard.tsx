import React, { useState } from 'react';
import VideoSurveillance from './sections/VideoSurveillance';
import Database from './sections/Database';
import Applications from './sections/Applications';
import Statistics from './sections/Statistics';
import Analytics from './sections/Analytics';
import './Dashboard.css';

const tabs = ['Видеонаблюдение', 'База данных', 'Заявки', 'Статистика', 'Аналитика'];

const Dashboard: React.FC = () => {
  const [panelTabs, setPanelTabs] = useState([0, 1, 2, 4]); // Видеонаблюдение, База данных, Заявки, Аналитика

  const renderSection = (sectionIndex: number) => {
    switch (sectionIndex) {
      case 0:
        return <VideoSurveillance />;
      case 1:
        return <Database />;
      case 2:
        return <Applications />;
      case 3:
        return <Statistics />;
      case 4:
        return <Analytics />;
      default:
        return null;
    }
  };

  const handleTabClick = (panelIndex: number, tabIndex: number) => {
    const newPanelTabs = [...panelTabs];
    newPanelTabs[panelIndex] = tabIndex;
    setPanelTabs(newPanelTabs);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Веб-дашборд</h1>
      
      <div className="dashboard-grid">
        {[0, 1, 2, 3].map((panelIndex) => (
          <div key={panelIndex} className="dashboard-panel">
            <div className="panel-tabs">
              {tabs.map((tab, tabIndex) => (
                <button
                  key={tab}
                  className={`tab-button ${panelTabs[panelIndex] === tabIndex ? 'active' : ''}`}
                  onClick={() => handleTabClick(panelIndex, tabIndex)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="panel-content">
              {renderSection(panelTabs[panelIndex])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
