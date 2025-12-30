import React, { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import { Batch } from '../data/mockData';
interface EditShipmentModalProps {
  batch: Batch | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedBatch: Batch) => void;
}
export function EditShipmentModal({
  batch,
  isOpen,
  onClose,
  onSuccess
}: EditShipmentModalProps) {
  const [formData, setFormData] = useState<Batch | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (batch) {
      setFormData(JSON.parse(JSON.stringify(batch))); // Deep copy
    }
  }, [batch]);
  if (!isOpen || !formData) return null;
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };
  const handleConditionChange = (field: string, value: string) => {
    setFormData(prev => prev ? {
      ...prev,
      conditions: {
        ...prev.conditions,
        [field]: value
      }
    } : null);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    onSuccess(formData);
    setIsSubmitting(false);
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Cập Nhật Lô Hàng
            </h2>
            <p className="text-sm text-gray-500 font-mono mt-1">
              {formData.batchId}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sản Phẩm
              </label>
              <input type="text" value={formData.product} onChange={e => handleInputChange('product', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nguồn Gốc
              </label>
              <input type="text" value={formData.origin} onChange={e => handleInputChange('origin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng Thái
              </label>
              <select value={formData.currentStatus} onChange={e => handleInputChange('currentStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option value="Processing">Đang Xử Lý</option>
                <option value="In Transit">Đang Vận Chuyển</option>
                <option value="Delivered">Đã Giao</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày Thu Hoạch
              </label>
              <input type="text" value={formData.harvestDate} onChange={e => handleInputChange('harvestDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhiệt Độ
              </label>
              <input type="text" value={formData.conditions.temperature} onChange={e => handleConditionChange('temperature', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Độ Ẩm
              </label>
              <input type="text" value={formData.conditions.humidity} onChange={e => handleConditionChange('humidity', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Hủy bỏ
          </button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>;
}