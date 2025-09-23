import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

// Layouts
import Header from './components/layouts/header';
import Side from './pages/side2'; // Ta nouvelle sidebar

// Pages
import Home from './pages/Home';
import Bookings from './pages/afroid';
import RatePlans from './pages/RatePlans';
import Apartments from './pages/Apartments';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import Login from './pages/Login';
import BusinessCard from './pages/BusinessCard';
import BusinessCardOrange from './pages/BusinessCardOrange';
import Plan from './pages/formationPlan';
import Task from './pages/task';
import Form from './pages/form'; // Utilisation du bon formulaire
import Chart from './pages/ntest';
import Notif from './pages/notif';
import ParticipantList from './pages/participant';
import Table from './pages/table';
import Test from './pages/head';


// Le composant de Layout principal qui inclut la Sidebar et le Header
const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-layout">
      <Side isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-section">
        <Header toggleSidebar={toggleSidebar} />
        <main className="content-section">
          <Outlet /> {/* Les routes enfants s'afficheront ici */}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes sans la sidebar */}
        <Route path="/table" element={<Table />} />
        <Route path="/" element={<Login />} />
                <Route path="/" element={<Login />} />
            <Route path="/test" element={<Test />} />
        <Route path="/chart" element={<Chart />} />

        {/* Routes qui utilisent le layout principal (avec sidebar) */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/notif" element={<Notif />} />
          <Route path="/participantList" element={<ParticipantList />} />

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
