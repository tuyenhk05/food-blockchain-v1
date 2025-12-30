import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Common/Navbar";
import { LandingPage } from "./pages/User/LandingPage";
import { TraceabilityPage } from "./pages/User/TraceabilityPage";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { ShipmentManagement } from "./pages/Admin/ShipmentManagement";
import { BlockchainMonitoring } from "./pages/Admin/BlockchainMonitoring";
import { UserManagement } from "./pages/Admin/UserManagement";
import { ConfirmedOrders } from "./pages/Admin/ConfirmedOrders";
import { NewsPage } from "./components/User/NewsPage";
import { NewsDetailPage } from "./components/User/NewsDetailPage";
export function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
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

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
      </Routes>
    </div>
  );
}
