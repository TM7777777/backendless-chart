import React from 'react';
import Chart from 'chart.js/auto';
import { ChartType } from '../../types/types';
import styles from './ChartComponent.module.scss';

interface IChartComponentProps {
  xItems: string[];
  yItems: string[];
  chartType: ChartType;
}

export const ChartComponent = ({ xItems, yItems, chartType }: IChartComponentProps) => {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (chartRef.current) {
      const canvas: HTMLCanvasElement = chartRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx)
        var chart = new Chart(ctx, {
          type: chartType,
          data: {
            labels: xItems,
            datasets: [
              {
                label: '',
                data: yItems,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: '#7bb6dd',
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
    }
    return () => {
      if (chart) chart.destroy();
    };
  }, [xItems, yItems, chartType]);

  return (
    <div className={styles['chart-container']}>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};
