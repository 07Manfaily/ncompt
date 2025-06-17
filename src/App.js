import './App.css';
import Sidebar from './components/layouts/sidebar';
import Header from './components/layouts/header';
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
import Plan from './pages/formationPlan'
import Task from './pages/task'
import Form from './pages/test'
import Chart from './pages/chart'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chart" element={<Chart />} />
        <Route
          path="*"
          element={
            <div className="app-layout">
              <Sidebar className={isSidebarOpen ? 'active' : ''} />
              <div className="main-section">
                <Header toggleSidebar={toggleSidebar} />
                <main className="content-section">
                  <Routes>
                  
                    <Route path="/home" element={<Home />} />
                    <Route path="/formation-plan" element={<Plan />} />
                    <Route path="/sessions" element={<Task />} />
                    <Route path="/form" element={<Form />} />

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
