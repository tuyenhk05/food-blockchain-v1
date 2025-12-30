import React from 'react';
import { Thermometer, Droplets, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
interface ProductInfoCardProps {
  conditions: {
    temperature: string;
    humidity: string;
  };
  expiryDate: string;
  harvestDate: string;
}
export function ProductInfoCard({
  conditions,
  expiryDate,
  harvestDate
}: ProductInfoCardProps) {
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    duration: 0.5
  }} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          Điều Kiện Sản Phẩm
        </h3>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Thermometer className="w-4 h-4" />
            <span>Nhiệt Độ</span>
          </div>
          <p className="text-xl font-bold text-gray-900">
            {conditions.temperature}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Droplets className="w-4 h-4" />
            <span>Độ Ẩm</span>
          </div>
          <p className="text-xl font-bold text-gray-900">
            {conditions.humidity}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Ngày Thu Hoạch</span>
          </div>
          <p className="text-base font-semibold text-gray-900">{harvestDate}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>Ngày Hết Hạn</span>
          </div>
          <p className="text-base font-semibold text-gray-900">{expiryDate}</p>
        </div>
      </div>
    </motion.div>;
}