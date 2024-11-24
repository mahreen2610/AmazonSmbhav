import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AIDocBuilder from './components/AIDocBuilder';
import Communication from './components/Communication';
import Documentation from './components/Documentation';
import SustainabilityTracking from './components/SustainabilityTracking';
import DataVisualization from './components/DataVisualization';
import AIChat from './components/AIChat';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ai-doc-builder" element={<AIDocBuilder />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/sustainability" element={<SustainabilityTracking />} />
          <Route path="/data-visualization" element={<DataVisualization />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
