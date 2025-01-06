import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Metric,
  Interval,
  STARTDATE,
  ENDDATE,
  pathMap,
  getNestedValue,
} from './utils.ts';
import { InputSidebar, StatsCard, GraphComponent } from './Components';

function App() {
  const [date, setDate] = useState(ENDDATE);
  const [dataIndex, setDataIndex] = useState(0);
  const [covidData, setCovidData] = useState([]);

  const [metric, setMetric] = useState(Metric.CASES);
  const [interval, setInterval] = useState(Interval.TOTAL);

  useEffect(() => {
    fetch(`http://localhost:3200/api/covid/historical`)
      .then((response) => response.json())
      .then((data) => {
        setCovidData(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (date) {
      // given that 2021-03-07 is at index 0, and the total number of days,
      // we can calculate the index of the date by subtracting the date from the total days
      const totalDays = covidData.length;
      const dataIndex = Math.floor(
        (date.getTime() - STARTDATE.getTime()) / (1000 * 60 * 60 * 24)
      );
      setDataIndex(totalDays - dataIndex - 1);
    }
  }, [date, covidData]);

  const metricPaths = pathMap[metric] || {};

  const currentEntry = covidData[dataIndex] || {};

  const total = getNestedValue(currentEntry, metricPaths[Interval.TOTAL] ?? []);
  const populationPercent = getNestedValue(
    currentEntry,
    metricPaths[Interval.POPULATION_PERCENT] ?? []
  );
  const newCases = getNestedValue(
    currentEntry,
    metricPaths[Interval.CHANGE_FROM_PRIOR_DAY] ?? []
  );
  const sevenDayAverage = getNestedValue(
    currentEntry,
    metricPaths[Interval.SEVEN_DAY] ?? []
  );

  const totalLabel =
    metric === Metric.TESTING ||
    metric === Metric.CASES ||
    metric === Metric.DEATHS
      ? 'Cumulative'
      : 'Current';

  return (
    <div className="App">
      <div className="App-header">
        <div className="grid-container">
          <InputSidebar
            date={date}
            setDate={setDate}
            metric={metric}
            setMetric={setMetric}
            interval={interval}
            setInterval={setInterval}
          />
          <div>
            <div className="stats-container">
              <StatsCard
                value={total?.toLocaleString()}
                label={`${totalLabel} ${metric}`}
                icon="🌎"
              />
              <StatsCard
                value={`${(Number(populationPercent) || 0).toFixed(2)}%`}
                label={`Population Percent`}
                icon="👥"
              />
              <StatsCard
                value={newCases?.toLocaleString()}
                label="Change from Prior Day"
                icon="⏱"
              />
              <StatsCard
                value={`${sevenDayAverage}%`}
                label="Seven Day Change Percent"
                icon="📊"
              />
            </div>
            <GraphComponent
              aggregateDataSet={covidData}
              date={date}
              interval={interval}
              metric={metric}
              setDate={setDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
