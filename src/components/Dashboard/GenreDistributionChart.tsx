import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function GenreDistributionChart() {
  const data = {
    labels: ['Active', 'Inactive', 'Needs Attention', 'Maintenance', 'Decommissioned'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}