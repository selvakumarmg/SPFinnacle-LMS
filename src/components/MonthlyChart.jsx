import React from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyChart = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Target',
        data: [80, 90, 70, 85, 75, 80],
        fill: false,
        borderColor: '#1890ff',
        tension: 0.4,
      },
      {
        label: 'Achievements',
        data: [70, 85, 65, 75, 70, 75],
        fill: false,
        borderColor: '#52c41a',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <Line data={chartData} options={chartOptions} />
  );
};

export default MonthlyChart;
