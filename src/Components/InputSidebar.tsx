import React from 'react';
import { Pill } from './Pill.tsx';
import { Metric, Interval, STARTDATE, ENDDATE, formatDate } from '../utils.ts';

export const InputSidebar = ({
  date,
  setDate,
  metric,
  setMetric,
  interval,
  setInterval,
}) => {
  return (
    <div className="component-cards">
      <div className="component-heading">{'COVID-19 Data Dashboard 🦠'} </div>
      <div className="date-display">{formatDate(date)} </div>
      <div className="component-subheading"> Select a date: </div>
      <div className="component-body">
        <input
          className="date-input"
          type="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString().split('T')[0]}
          min={STARTDATE.toISOString().split('T')[0]}
          max={ENDDATE.toISOString().split('T')[0]}
        />
      </div>
      <div className="component-subheading"> Select a metric: </div>
      <div className="component-body">
        <div className="pill-container">
          {Object.values(Metric).map((metricItem) => (
            <Pill
              key={metricItem}
              label={metricItem}
              onClick={() => setMetric(metricItem)}
              selected={metric === metricItem}
            />
          ))}
        </div>
      </div>
      <div className="component-subheading"> Select an interval: </div>
      <div className="component-body">
        <div className="pill-container">
          {Object.values(Interval).map((intervalItem) => {
            let label = intervalItem as string;
            if (intervalItem === Interval.TOTAL) {
              if (
                metric === Metric.VENTILATOR ||
                metric === Metric.ICU ||
                metric === Metric.TOTAL_HOSPITALIZATIONS
              ) {
                label = intervalItem + ' (Current)';
              } else {
                label = intervalItem + ' (Cumulative)';
              }
            }
            return (
              <Pill
                key={intervalItem}
                label={label}
                onClick={() => setInterval(intervalItem)}
                selected={interval === intervalItem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
