import React from 'react';

export const StatsCard = ({ value, label, icon }) => {
  return (
    <div className="component-cards stats">
      <div className={'stats-icon'}>{icon}</div>
      <div className={'stats-value'}>{value}</div>
      <div className={'stats-label'}>{label}</div>
    </div>
  );
};
