import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { TraceabilityPage } from './pages/TraceabilityPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ShipmentManagement } from './pages/ShipmentManagement';
import { BlockchainMonitoring } from './pages/BlockchainMonitoring';
import { UserManagement } from './pages/UserManagement';
import { ConfirmedOrders } from './pages/ConfirmedOrders';
export function App() {
  return <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/trace/:batchId" element={<TraceabilityPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/shipments" element={<ShipmentManagement />} />
        <Route path="/admin/blockchain" element={<BlockchainMonitoring />} />
        <Route path="/admin/confirmed-orders" element={<ConfirmedOrders />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Routes>
    </div>;
}