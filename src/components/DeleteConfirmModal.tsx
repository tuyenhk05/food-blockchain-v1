import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Batch } from '../data/mockData';
interface DeleteConfirmModalProps {
  batch: Batch | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (batchId: string) => void;
}
export function DeleteConfirmModal({
  batch,
  isOpen,
  onClose,
  onConfirm
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  if (!isOpen || !batch) return null;
  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onConfirm(batch.batchId);
    setIsDeleting(false);
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Xác nhận xóa lô hàng?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Bạn có chắc chắn muốn xóa lô hàng{' '}
              <span className="font-mono font-medium text-gray-900">
                {batch.batchId}
              </span>{' '}
              không? Hành động này không thể hoàn tác.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-500">Sản phẩm:</span>
              <span className="font-medium text-gray-900">{batch.product}</span>
              <span className="text-gray-500">Nguồn gốc:</span>
              <span className="font-medium text-gray-900">{batch.origin}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} disabled={isDeleting} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50">
              Hủy bỏ
            </button>
            <button onClick={handleDelete} disabled={isDeleting} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex items-center justify-center">
              {isDeleting ? 'Đang xóa...' : 'Xóa lô hàng'}
            </button>
          </div>
        </div>
      </div>
    </div>;
}