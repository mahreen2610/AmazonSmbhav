import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DataVisualization() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chart-data');
      const data = await response.json();
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: 'Export Volume',
            data: data.exportVolume,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'Revenue',
            data: data.revenue,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Export Performance',
      },
    },
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Data Visualization</h1>
      <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}

export default DataVisualization;

