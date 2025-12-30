import React, { useState } from "react";
import {
  CheckCircle,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  MapPin,
  Package,
} from "lucide-react";
import { mockBatches, Batch } from "../../data/mockData";
import { OrderDetailsModal } from "../../components/Admin/OrderDetailsModal";
export function ConfirmedOrders() {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [filter, setFilter] = useState("");
  // Filter only delivered/confirmed orders
  const confirmedBatches = mockBatches.filter(
    (batch) =>
      batch.currentStatus === "Delivered" &&
      (batch.batchId.toLowerCase().includes(filter.toLowerCase()) ||
        batch.product.toLowerCase().includes(filter.toLowerCase()))
  );
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
            Đơn Hàng Đã Xác Nhận
          </h1>
          <p className="text-gray-500 mt-1">
            Danh sách các đơn hàng đã hoàn thành và được xác thực đầy đủ trên
            blockchain.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn hoặc tên sản phẩm..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span>Hiển thị {confirmedBatches.length} đơn hàng</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã Đơn Hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản Phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nguồn Gốc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày Hoàn Thành
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Xác Thực Blockchain
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chi Tiết
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {confirmedBatches.map((batch) => {
                  const verifiedCount = batch.stages.filter(
                    (s) => s.blockchain.verified
                  ).length;
                  const lastStage = batch.stages[batch.stages.length - 1];
                  return (
                    <tr
                      key={batch.batchId}
                      className="hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={() => setSelectedBatch(batch)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                          <span className="font-mono text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                            {batch.batchId}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {batch.product}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <MapPin className="w-3.5 h-3.5" />
                          {batch.origin}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {lastStage.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            {[...Array(verifiedCount)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 h-4 bg-emerald-400 rounded-sm transform skew-x-12 border-r border-white"
                              />
                            ))}
                            {[...Array(4 - verifiedCount)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 h-4 bg-gray-200 rounded-sm transform skew-x-12 border-r border-white"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {verifiedCount}/4 Giai đoạn
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {confirmedBatches.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              Không tìm thấy đơn hàng nào phù hợp.
            </div>
          )}
        </div>
      </div>

      <OrderDetailsModal
        batch={selectedBatch}
        isOpen={!!selectedBatch}
        onClose={() => setSelectedBatch(null)}
      />
    </div>
  );
}
