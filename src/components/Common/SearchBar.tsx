import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
export function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/trace/${query.trim()}`);
    }
  };
  return <motion.form initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.2
  }} onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input type="text" className="block w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 text-lg shadow-lg" placeholder="Nhập Mã Lô Hàng (ví dụ: DRF-2024-001)" value={query} onChange={e => setQuery(e.target.value)} />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button type="button" className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50" title="Quét Mã QR">
            <QrCode className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2 text-sm text-gray-500">
        <span>Thử:</span>
        <button type="button" onClick={() => setQuery('DRF-2024-001')} className="text-emerald-600 hover:underline font-medium">
          DRF-2024-001
        </button>
        <span>hoặc</span>
        <button type="button" onClick={() => setQuery('DRF-2024-002')} className="text-emerald-600 hover:underline font-medium">
          DRF-2024-002
        </button>
      </div>
    </motion.form>;
}