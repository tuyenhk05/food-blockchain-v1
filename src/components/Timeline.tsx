import React, { Children } from 'react';
import { Sprout, Factory, Truck, Store, MapPin, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Stage } from '../data/mockData';
import { BlockchainBadge } from './BlockchainBadge';
interface TimelineProps {
  stages: Stage[];
}
const iconMap = {
  Sprout: Sprout,
  Factory: Factory,
  Truck: Truck,
  Store: Store
};
// Map English keys to Vietnamese labels
const detailKeyMap: Record<string, string> = {
  farmer: 'Nông Dân',
  certification: 'Chứng Nhận',
  facility: 'Cơ Sở',
  qualityCheck: 'Kiểm Tra Chất Lượng',
  driver: 'Tài Xế',
  truck: 'Xe Tải',
  temperature: 'Nhiệt Độ',
  humidity: 'Độ Ẩm',
  store: 'Cửa Hàng',
  shelfLife: 'Hạn Sử Dụng'
};
export function Timeline({
  stages
}: TimelineProps) {
  return <div className="relative pl-4 sm:pl-8 py-8">
      {/* Vertical Line */}
      <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-0.5 bg-gray-200" />

      <motion.div initial="hidden" animate="visible" variants={{
      visible: {
        transition: {
          staggerChildren: 0.2
        }
      }
    }} className="space-y-12">
        {stages.map((stage, index) => {
        const Icon = iconMap[stage.icon];
        const isCompleted = stage.status === 'completed';
        const isCurrent = stage.status === 'current';
        return <motion.div key={index} variants={{
          hidden: {
            opacity: 0,
            y: 20
          },
          visible: {
            opacity: 1,
            y: 0
          }
        }} className="relative flex gap-6 sm:gap-8 items-start">
              {/* Icon Circle */}
              <div className={`relative z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 ${isCompleted ? 'bg-emerald-600 border-emerald-100 text-white' : isCurrent ? 'bg-blue-600 border-blue-100 text-white animate-pulse' : 'bg-white border-gray-200 text-gray-400'}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Content Card */}
              <div className={`flex-1 bg-white rounded-xl p-6 shadow-sm border ${isCurrent ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-100'}`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`text-lg font-bold ${isCurrent ? 'text-blue-700' : 'text-gray-900'}`}>
                      {stage.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{stage.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{stage.location}</span>
                    </div>
                  </div>

                  {stage.blockchain.verified && <BlockchainBadge txHash={stage.blockchain.txHash} timestamp={stage.blockchain.timestamp} />}
                </div>

                {/* Details Grid */}
                {Object.keys(stage.details).length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                    {Object.entries(stage.details).map(([key, value]) => <div key={key} className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {detailKeyMap[key] || key}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {value}
                        </span>
                      </div>)}
                  </div>}
              </div>
            </motion.div>;
      })}
      </motion.div>
    </div>;
}