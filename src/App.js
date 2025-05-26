import './App.css';
import Sidebar from './layouts/sidebar';
import Header from './layouts/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import RatePlans from './pages/RatePlans';
import Apartments from './pages/Apartments';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import Login from './pages/Login';
import BusinessCard from './pages/BusinessCard';
import BusinessCardOrange from './pages/BusinessCardOrange';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <div className="app-layout">
              <Sidebar className={isSidebarOpen ? 'active' : ''} />
              <div className="main-section">
                <Header toggleSidebar={toggleSidebar} />
                <main className="content-section">
                  <Routes>
                 
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/rate-plans" element={<RatePlans />} />
                    <Route path="/apartments" element={<Apartments />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/business-card" element={<BusinessCard />} />
                    <Route path="/business-card-orange" element={<BusinessCardOrange />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
