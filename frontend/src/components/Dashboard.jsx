

import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Export Platform</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <DashboardCard title="AI Document Builder" link="/ai-doc-builder" />
        <DashboardCard title="Real-Time Communication" link="/communication" />
        <DashboardCard title="Blockchain Documentation" link="/documentation" />
        <DashboardCard title="Sustainability Tracking" link="/sustainability" />
        <DashboardCard title="Data Visualization" link="/data-visualization" />
        <DashboardCard title="AI Chatbot" link="/ai-chat" />
      </div>
    </div>
  );
}

function DashboardCard({ title, link }) {
  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2>{title}</h2>
        <p>Click to access this feature</p>
      </div>
    </Link>
  );
}

export default Dashboard;
