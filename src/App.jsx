import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthProvider } from './contexts/HealthContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import SmartLogger from './pages/SmartLogger';
import Profile from './pages/Profile';

function App() {
  return (
    <HealthProvider>
      <Router>
        <div className="flex min-h-screen antialiased font-sans w-full relative">
          <Navigation />
          
          <main className="flex-1 md:ml-64 w-full h-screen overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/log" element={<SmartLogger />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </HealthProvider>
  );
}

export default App;
