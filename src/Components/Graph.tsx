import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Interval, getDateFromIndex, getTypeOfTotal } from '../utils.ts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { pathMap, getDataArray } from '../utils.ts';
import { useMemo } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const generalColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--item-color');
const standoutColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--standout-color');

export const GraphComponent = ({
  aggregateDataSet,
  date,
  metric,
  interval,
  setDate,
}: {
  aggregateDataSet: any;
  date: Date;
  metric: any;
  interval: any;
  setDate: any;
}) => {
  const dates = useMemo(() => {
    return aggregateDataSet.map((entry) => entry.date);
  }, [aggregateDataSet]);

  const metricPaths = pathMap[metric] || {};
  const selectedPath = metricPaths[interval] || metricPaths[Interval.TOTAL];

  const metricData = useMemo(() => {
    if (!selectedPath) return [];
    return getDataArray(aggregateDataSet, selectedPath);
  }, [aggregateDataSet, selectedPath]);

  const barColors = useMemo(() => {
    return aggregateDataSet.map((entry) =>
      new Date(entry.date).getTime() === date.getTime()
        ? standoutColor
        : generalColor
    );
  }, [date, aggregateDataSet]);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `${interval} ${metric}`,
        data: metricData,
        backgroundColor: barColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          generateLabels: function (chart) {
            return [
              {
                text: `${
                  interval === Interval.TOTAL
                    ? getTypeOfTotal(metric)
                    : interval
                } ${metric}`,
                fillStyle: generalColor,
                lineWidth: 0,
              },
              {
                text: `${
                  interval === Interval.TOTAL
                    ? getTypeOfTotal(metric)
                    : interval
                } ${metric} on ${date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}`,
                fillStyle: standoutColor,
                lineWidth: 0,
              },
            ];
          },
        },
      },
    },
    scales: {
      x: {
        reverse: true, // display in chronological order
        ticks: {
          autoSkip: false,
          callback: function (value) {
            // only display the tick at the start of every month
            const date = getDateFromIndex(value);
            return date.getDate() === 1
              ? date.toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })
              : '';
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const labelClicked = chartData.labels[elementIndex];
        setDate(new Date(labelClicked));
      }
    },
  };

  return (
    <div className="component-cards">
      <div className="component-subheading">
        {`${
          interval === Interval.TOTAL ? getTypeOfTotal(metric) : interval
        } COVID-19 ${metric}:`}
      </div>
      <div className="graph-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
