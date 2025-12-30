import React, { useState } from 'react';
import { X, ShieldCheck, Clock, FileJson, Copy, Check, ExternalLink, Hash, Server, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface TransactionDetail {
  hash: string;
  timestamp: string;
  batchId: string;
  stage: string;
  status: string;
  // Additional simulated blockchain data
  blockNumber?: number;
  gasUsed?: number;
  validator?: string;
}
interface BlockchainTransactionModalProps {
  transaction: TransactionDetail | null;
  isOpen: boolean;
  onClose: () => void;
}
export function BlockchainTransactionModal({
  transaction,
  isOpen,
  onClose
}: BlockchainTransactionModalProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'raw'>('details');
  if (!isOpen || !transaction) return null;
  // Simulate additional blockchain data if not present
  const blockNumber = transaction.blockNumber || Math.floor(18000000 + Math.random() * 1000000);
  const gasUsed = transaction.gasUsed || Math.floor(21000 + Math.random() * 50000);
  const validator = transaction.validator || '0x' + Math.random().toString(16).substr(2, 40);
  const networkFee = (gasUsed * 0.00000002).toFixed(8);
  const handleCopyHash = () => {
    navigator.clipboard.writeText(transaction.hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };
  const rawData = {
    jsonrpc: '2.0',
    result: {
      blockHash: '0x' + Math.random().toString(16).substr(2, 64),
      blockNumber: '0x' + blockNumber.toString(16),
      from: validator,
      gas: '0x' + gasUsed.toString(16),
      gasPrice: '0x4a817c800',
      hash: transaction.hash,
      input: '0x' + Math.random().toString(16).substr(2, 128),
      nonce: '0x15',
      to: '0x' + Math.random().toString(16).substr(2, 40),
      transactionIndex: '0x1',
      value: '0x0',
      type: '0x2',
      chainId: '0x1'
    },
    id: 1
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{
      opacity: 0,
      scale: 0.95,
      y: 20
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} exit={{
      opacity: 0,
      scale: 0.95,
      y: 20
    }} transition={{
      duration: 0.2
    }} className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold">Chi Tiết Giao Dịch</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                Đã Xác Thực
              </span>
            </div>
            <p className="text-slate-400 text-sm font-mono flex items-center gap-2">
              {transaction.hash.substring(0, 20)}...
              {transaction.hash.substring(transaction.hash.length - 20)}
              <button onClick={handleCopyHash} className="text-slate-500 hover:text-white transition-colors" title="Sao chép mã giao dịch">
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6">
          <button onClick={() => setActiveTab('details')} className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Tổng Quan
          </button>
          <button onClick={() => setActiveTab('raw')} className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'raw' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Dữ Liệu Thô (JSON)
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto bg-white flex-1">
          {activeTab === 'details' ? <div className="space-y-6">
              {/* Main Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                    Thời Gian
                  </div>
                  <div className="flex items-center gap-2 text-slate-900 font-medium">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {new Date(transaction.timestamp).toLocaleString('vi-VN')}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="text-xs text-blue-500 uppercase tracking-wider font-medium mb-1">
                    Block Number
                  </div>
                  <div className="flex items-center gap-2 text-blue-900 font-medium">
                    <div className="w-4 h-4 text-blue-400" />#
                    {blockNumber.toLocaleString()}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="text-xs text-purple-500 uppercase tracking-wider font-medium mb-1">
                    Giai Đoạn
                  </div>
                  <div className="flex items-center gap-2 text-purple-900 font-medium">
                    <Server className="w-4 h-4 text-purple-400" />
                    {transaction.stage}
                  </div>
                </div>
              </div>

              {/* Detailed List */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 w-1/3">
                        Mã Lô Hàng
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {transaction.batchId}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        Trạng Thái
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          <Check className="w-3 h-3 mr-1" />
                          Thành Công
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        Người Xác Thực
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-mono flex items-center gap-2">
                        {validator.substring(0, 10)}...
                        {validator.substring(validator.length - 8)}
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        Gas Used
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {gasUsed.toLocaleString()} Gwei
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        Phí Mạng
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {networkFee} ETH
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p>
                    Giao dịch này đã được ghi lại vĩnh viễn trên blockchain và
                    không thể thay đổi. Dữ liệu xác thực nguồn gốc sản phẩm từ
                    giai đoạn <strong>{transaction.stage}</strong>.
                  </p>
                </div>
              </div>
            </div> : <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed">
                {JSON.stringify(rawData, null, 2)}
              </pre>
            </div>}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            Đóng
          </button>
          <a href="#" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center gap-2" onClick={e => e.preventDefault()}>
            Xem trên Explorer <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>;
}