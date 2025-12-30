import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { mockBatches } from "../../data/mockData";
import { Timeline } from "../../components/User/Timeline";
import { ProductInfoCard } from "../../components/User/ProductInfoCard";
import { motion } from "framer-motion";
export function TraceabilityPage() {
  const { batchId } = useParams();
  const batch = mockBatches.find((b) => b.batchId === batchId);
  const getStatusText = (status: string) => {
    switch (status) {
      case "Delivered":
        return "Đã Giao";
      case "In Transit":
        return "Đang Vận Chuyển";
      case "Processing":
        return "Đang Xử Lý";
      default:
        return status;
    }
  };
  if (!batch) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Không Tìm Thấy Lô Hàng
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Mã lô hàng "{batchId}" không tồn tại trong hệ thống. Vui lòng kiểm tra
          và thử lại.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Trở Về Trang Chủ
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Quay Lại Tìm Kiếm
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {batch.product}
              </h1>
              <p className="text-gray-500 mt-1">
                Mã Lô Hàng:{" "}
                <span className="font-mono font-medium text-gray-700">
                  {batch.batchId}
                </span>
              </p>
            </div>
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                batch.currentStatus === "Delivered"
                  ? "bg-emerald-100 text-emerald-800"
                  : batch.currentStatus === "In Transit"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {getStatusText(batch.currentStatus)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Timeline Column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Hành Trình Sản Phẩm
              </h2>
              <Timeline stages={batch.stages} />
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <ProductInfoCard
              conditions={batch.conditions}
              expiryDate={batch.expiryDate}
              harvestDate={batch.harvestDate}
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">
                Chi Tiết Nguồn Gốc
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Địa Điểm
                  </label>
                  <p className="text-gray-900 font-medium">{batch.origin}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">
                    Chứng Nhận
                  </label>
                  <div className="flex gap-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      VietGAP
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ISO 22000
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
