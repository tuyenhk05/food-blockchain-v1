import React from 'react';
import { X, Calendar, MapPin, Thermometer, Droplets, CheckCircle, Clock, ExternalLink, Package } from 'lucide-react';
import { Batch } from '../data/mockData';
interface OrderDetailsModalProps {
  batch: Batch | null;
  isOpen: boolean;
  onClose: () => void;
}
export function OrderDetailsModal({
  batch,
  isOpen,
  onClose
}: OrderDetailsModalProps) {
  if (!isOpen || !batch) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl my-8 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-600" />
              Chi Tiết Đơn Hàng
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-mono">
              ID: {batch.batchId}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-sm text-blue-600 font-medium mb-1">
                Sản Phẩm
              </div>
              <div className="text-gray-900 font-bold">{batch.product}</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <div className="text-sm text-emerald-600 font-medium mb-1">
                Trạng Thái
              </div>
              <div className="text-gray-900 font-bold">
                {batch.currentStatus === 'Delivered' ? 'Đã Giao' : batch.currentStatus === 'In Transit' ? 'Đang Vận Chuyển' : 'Đang Xử Lý'}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <div className="text-sm text-orange-600 font-medium mb-1">
                Ngày Thu Hoạch
              </div>
              <div className="text-gray-900 font-bold">{batch.harvestDate}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="text-sm text-purple-600 font-medium mb-1">
                Hạn Sử Dụng
              </div>
              <div className="text-gray-900 font-bold">{batch.expiryDate}</div>
            </div>
          </div>

          {/* Details & Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
                Thông Tin Chi Tiết
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Nguồn Gốc
                    </div>
                    <div className="text-sm text-gray-600">{batch.origin}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Thermometer className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Nhiệt Độ Bảo Quản
                    </div>
                    <div className="text-sm text-gray-600">
                      {batch.conditions.temperature}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Độ Ẩm
                    </div>
                    <div className="text-sm text-gray-600">
                      {batch.conditions.humidity}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
                Xác Thực Blockchain
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Trạng thái xác thực
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Đã Xác Minh
                  </span>
                </div>
                <div className="space-y-3">
                  {batch.stages.filter(s => s.blockchain.verified).map((stage, idx) => <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{stage.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                            {stage.blockchain.txHash.substring(0, 8)}...
                            {stage.blockchain.txHash.substring(stage.blockchain.txHash.length - 6)}
                          </span>
                          <ExternalLink className="w-3 h-3 text-blue-500 cursor-pointer hover:text-blue-700" />
                        </div>
                      </div>)}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
              Hành Trình Sản Phẩm
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

              <div className="space-y-8 relative">
                {batch.stages.map((stage, idx) => <div key={idx} className="flex gap-6">
                    {/* Icon */}
                    <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${stage.status === 'completed' ? 'bg-emerald-100 border-emerald-50 text-emerald-600' : stage.status === 'current' ? 'bg-blue-100 border-blue-50 text-blue-600' : 'bg-gray-100 border-gray-50 text-gray-400'}`}>
                      {/* Using generic icons based on stage name for simplicity in this view,
                       or we could map the icon string to Lucide icons if needed.
                       For now, just showing stage index or first letter */}
                      <span className="font-bold text-lg">{idx + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-gray-900">
                          {stage.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {stage.date}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {stage.location}
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded">
                        {Object.entries(stage.details).map(([key, value]) => <div key={key} className="flex justify-between">
                            <span className="text-gray-500 capitalize">
                              {key}:
                            </span>
                            <span className="font-medium text-gray-900">
                              {value}
                            </span>
                          </div>)}
                      </div>

                      {/* Blockchain Footer */}
                      {stage.blockchain.verified && <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-emerald-600">
                          <CheckCircle className="w-3 h-3" />
                          Đã xác thực trên blockchain lúc{' '}
                          {new Date(stage.blockchain.timestamp).toLocaleTimeString('vi-VN')}
                        </div>}
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            Đóng
          </button>
        </div>
      </div>
    </div>;
}