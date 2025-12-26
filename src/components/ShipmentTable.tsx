import React, { useEffect, useState } from 'react';
import { Edit, Eye, Trash2, Filter, Download } from 'lucide-react';
import { mockBatches, Batch } from '../data/mockData';
import { Link, useSearchParams } from 'react-router-dom';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { EditShipmentModal } from './EditShipmentModal';
import { OrderDetailsModal } from './OrderDetailsModal';
export function ShipmentTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('search') || '';
  const [filter, setFilter] = useState(initialFilter);
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  // Modal states
  const [deleteBatch, setDeleteBatch] = useState<Batch | null>(null);
  const [editBatch, setEditBatch] = useState<Batch | null>(null);
  const [viewBatch, setViewBatch] = useState<Batch | null>(null);
  // Update filter when URL param changes
  useEffect(() => {
    const search = searchParams.get('search');
    if (search !== null) {
      setFilter(search);
    }
  }, [searchParams]);
  // Update URL when filter changes (optional, but good for sharing)
  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value) {
      setSearchParams({
        search: value
      });
    } else {
      setSearchParams({});
    }
  };
  const filteredBatches = batches.filter(batch => batch.batchId.toLowerCase().includes(filter.toLowerCase()) || batch.product.toLowerCase().includes(filter.toLowerCase()));
  const handleDelete = (batchId: string) => {
    setBatches(prev => prev.filter(b => b.batchId !== batchId));
  };
  const handleUpdate = (updatedBatch: Batch) => {
    setBatches(prev => prev.map(b => b.batchId === updatedBatch.batchId ? updatedBatch : b));
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'Đã Giao';
      case 'In Transit':
        return 'Đang Vận Chuyển';
      case 'Processing':
        return 'Đang Xử Lý';
      default:
        return status;
    }
  };
  return <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">Lô Hàng Gần Đây</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input type="text" placeholder="Lọc lô hàng..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" value={filter} onChange={e => handleFilterChange(e.target.value)} />
              <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-300">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã Lô Hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản Phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nguồn Gốc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng Thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBatches.length > 0 ? filteredBatches.map(batch => <tr key={batch.batchId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-emerald-600">
                        {batch.batchId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {batch.product}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {batch.origin}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(batch.currentStatus)}`}>
                        {getStatusText(batch.currentStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {batch.harvestDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setViewBatch(batch)} className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditBatch(batch)} className="text-emerald-600 hover:text-emerald-900 p-1 hover:bg-emerald-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteBatch(batch)} className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy lô hàng nào phù hợp với "{filter}"
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmModal batch={deleteBatch} isOpen={!!deleteBatch} onClose={() => setDeleteBatch(null)} onConfirm={handleDelete} />

      <EditShipmentModal batch={editBatch} isOpen={!!editBatch} onClose={() => setEditBatch(null)} onSuccess={handleUpdate} />

      <OrderDetailsModal batch={viewBatch} isOpen={!!viewBatch} onClose={() => setViewBatch(null)} />
    </>;
}