import React, { useState } from 'react';
import { Link as LinkIcon, ExternalLink, Clock, CheckCircle, Search, Filter, RefreshCw } from 'lucide-react';
import { mockBatches } from '../data/mockData';
import { BlockchainTransactionModal } from '../components/BlockchainTransactionModal';
export function BlockchainMonitoring() {
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  // Flatten all transactions from mock data
  const transactions = mockBatches.flatMap(batch => batch.stages.filter(stage => stage.blockchain.verified).map(stage => ({
    hash: stage.blockchain.txHash,
    timestamp: stage.blockchain.timestamp,
    batchId: batch.batchId,
    stage: stage.name,
    status: 'Confirmed',
    // Add simulated extra data for the modal
    blockNumber: Math.floor(18000000 + Math.random() * 1000000),
    gasUsed: Math.floor(21000 + Math.random() * 50000),
    validator: '0x' + Math.random().toString(16).substr(2, 40)
  }))).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const filteredTransactions = transactions.filter(tx => tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) || tx.batchId.toLowerCase().includes(searchTerm.toLowerCase()) || tx.stage.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  return <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-emerald-600" />
              Sổ Cái Blockchain
            </h1>
            <p className="text-gray-500 mt-1">
              Giám sát thời gian thực tất cả các giao dịch chuỗi cung ứng trên
              blockchain.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleRefresh} className={`p-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all ${isRefreshing ? 'animate-spin text-emerald-600 border-emerald-200' : ''}`} title="Làm mới dữ liệu">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats / Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng Giao Dịch</p>
              <p className="text-2xl font-bold text-gray-900">
                {transactions.length}
              </p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Tìm kiếm theo Hash, Mã Lô Hàng hoặc Giai Đoạn..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Bộ Lọc
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã Giao Dịch (Hash)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã Lô Hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giai Đoạn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời Gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Xem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? filteredTransactions.map((tx, idx) => <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-50 rounded text-blue-600 group-hover:bg-blue-100 transition-colors">
                            <LinkIcon className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-sm text-gray-600 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedTx(tx)}>
                            {tx.hash.substring(0, 10)}...
                            {tx.hash.substring(tx.hash.length - 8)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900 font-mono">
                          {tx.batchId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          {tx.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(tx.timestamp).toLocaleString('vi-VN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Đã Xác Nhận
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => setSelectedTx(tx)} className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors" title="Xem chi tiết giao dịch">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>) : <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search className="w-8 h-8 text-gray-300" />
                        <p>Không tìm thấy giao dịch nào phù hợp</p>
                      </div>
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BlockchainTransactionModal transaction={selectedTx} isOpen={!!selectedTx} onClose={() => setSelectedTx(null)} />
    </div>;
}