import React, { useState, useEffect } from 'react';

function SustainabilityTracking() {
  const [metrics, setMetrics] = useState({
    carbonFootprint: 0,
    energyConsumption: 0,
    wasteReduction: 0,
  });

  useEffect(() => {
    fetchSustainabilityMetrics();
  }, []);

  const fetchSustainabilityMetrics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sustainability');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching sustainability metrics:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sustainability Tracking</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
        <MetricCard title="Carbon Footprint" value={metrics.carbonFootprint} unit="tons CO2e" />
        <MetricCard title="Energy Consumption" value={metrics.energyConsumption} unit="kWh" />
        <MetricCard title="Waste Reduction" value={metrics.wasteReduction} unit="%" />
      </div>
    </div>
  );
}

function MetricCard({ title, value, unit }) {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '200px' }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</p>
      <p>{unit}</p>
    </div>
  );
}

export default SustainabilityTracking;

