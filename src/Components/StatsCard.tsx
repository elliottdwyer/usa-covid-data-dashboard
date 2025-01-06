import React from 'react';

export const StatsCard = ({value, label, icon}) => {
  return (
    <div className="component-cards" style={{ position: 'relative' }}>
      <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
        {icon}
      </div>
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',  
          fontSize: '2.4rem',
          fontWeight: 'bold',
        }}>
        {value}
      </div>
      <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%) translateY(50%)', 
          fontSize: '1rem',
          width: '100%',
        }}>
        {label}
      </div>
    </div>
  );
}