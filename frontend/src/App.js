import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Public layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Portfolio from './pages/public/Portfolio';
import HowToOrder from './pages/public/HowToOrder';
import Contact from './pages/public/Contact';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Production from './pages/admin/Production';
import Inventory from './pages/admin/Inventory';
import Finance from './pages/admin/Finance';
import Customers from './pages/admin/Customers';
import AdminPortfolio from './pages/admin/Portfolio';

/** Wraps public pages with Navbar + Footer */
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow"><Outlet /></main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes ─────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ── Auth Routes (no layout) ───────────── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Admin Routes (protected) ──────────── */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="production" element={<Production />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="finance" element={<Finance />} />
          <Route path="customers" element={<Customers />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
