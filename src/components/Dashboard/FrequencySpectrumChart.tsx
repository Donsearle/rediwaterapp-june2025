import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function FrequencySpectrumChart() {
  const frequencies = Array.from({length: 11}, () => Math.random() * 100);
  
  const data = {
    labels: ['20', '40', '80', '160', '320', '640', '1.2k', '2.5k', '5k', '10k', '20k'],
    datasets: [
      {
        data: frequencies,
        backgroundColor: frequencies.map(val => 
          val > 70 ? '#ef4444' : val > 40 ? '#f59e0b' : '#10b981'
        ),
        borderRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Depth Range (m)',
          color: 'rgba(255, 255, 255, 0.6)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Water Level (m)',
          color: 'rgba(255, 255, 255, 0.6)',
        },
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}