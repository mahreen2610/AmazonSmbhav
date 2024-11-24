import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ backgroundColor: '#4a90e2', padding: '1rem' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>Export Platform</Link>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li><Link to="/ai-doc-builder" style={{ color: 'white', textDecoration: 'none' }}>AI Doc Builder</Link></li>
          <li><Link to="/communication" style={{ color: 'white', textDecoration: 'none' }}>Communication</Link></li>
          <li><Link to="/documentation" style={{ color: 'white', textDecoration: 'none' }}>Documentation</Link></li>
          <li><Link to="/sustainability" style={{ color: 'white', textDecoration: 'none' }}>Sustainability</Link></li>
          <li><Link to="/data-visualization" style={{ color: 'white', textDecoration: 'none' }}>Data Visualization</Link></li>
          <li><Link to="/ai-chat" style={{ color: 'white', textDecoration: 'none' }}>AI Chat</Link></li>
          <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></li>
          <li><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
