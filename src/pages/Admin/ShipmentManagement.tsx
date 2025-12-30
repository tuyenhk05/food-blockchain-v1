import React, { useState } from "react";
import { Plus } from "lucide-react";
import { ShipmentTable } from "../../components/Admin/ShipmentTable";
import { CreateShipmentModal } from "../../components/Admin/CreateShipmentModal";
import { Batch } from "../../data/mockData";
export function ShipmentManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleCreateSuccess = (newBatch: Batch) => {
    // In a real app, this would update the global state or refetch data
    // Since ShipmentTable uses local state initialized from mockData,
    // we'd need a more robust state management solution (Context/Redux)
    // For this demo, we'll just log it and close the modal
    console.log("New batch created:", newBatch);
    // To make it visible in the table immediately without page reload,
    // we would need to lift the state up from ShipmentTable to here
    // or use a global store. For now, we'll just close the modal.
    alert("Lô hàng mới đã được tạo thành công! (Dữ liệu demo không được lưu)");
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Quản Lý Lô Hàng
            </h1>
            <p className="text-gray-500">
              Tạo mới, cập nhật và theo dõi tất cả các lô hàng đang hoạt động.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo Lô Hàng Mới
          </button>
        </div>

        <ShipmentTable />

        <CreateShipmentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      </div>
    </div>
  );
}
