import React, { useState } from 'react';
import { ShieldCheck, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface BlockchainBadgeProps {
  txHash: string;
  timestamp?: string;
}
export function BlockchainBadge({
  txHash,
  timestamp
}: BlockchainBadgeProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const truncatedHash = `${txHash.substring(0, 6)}...${txHash.substring(txHash.length - 6)}`;
  return <motion.div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-2 sm:pr-4" whileHover={{
    scale: 1.01
  }} transition={{
    type: 'spring',
    stiffness: 400,
    damping: 17
  }}>
      <div className="flex items-center gap-2">
        <motion.div animate={{
        scale: [1, 1.1, 1]
      }} transition={{
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut'
      }} className="bg-emerald-100 p-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </motion.div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          Xác Thực Blockchain
        </span>
      </div>

      <div className="hidden sm:block w-px h-4 bg-emerald-200 mx-1" />

      <div className="flex items-center gap-2 group cursor-pointer" onClick={handleCopy}>
        <code className="text-xs font-mono text-emerald-700 bg-white/50 px-1.5 py-0.5 rounded border border-emerald-100">
          {truncatedHash}
        </code>
        <button className="text-emerald-500 hover:text-emerald-700 transition-colors focus:outline-none" aria-label="Sao chép mã giao dịch">
          <AnimatePresence mode="wait">
            {copied ? <motion.div key="check" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} exit={{
            scale: 0
          }}>
                <Check className="w-3.5 h-3.5" />
              </motion.div> : <motion.div key="copy" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} exit={{
            scale: 0
          }}>
                <Copy className="w-3.5 h-3.5" />
              </motion.div>}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>;
}