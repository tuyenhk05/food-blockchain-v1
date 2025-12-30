import React from 'react';
import { motion } from 'framer-motion';
import { BoxIcon } from 'lucide-react';
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: BoxIcon;
  trend?: string;
  trendUp?: boolean;
  color?: 'emerald' | 'blue' | 'purple' | 'orange';
  delay?: number;
}
export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = 'emerald',
  delay = 0
}: StatsCardProps) {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.4,
    delay
  }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {trendUp ? '+' : ''}
            {trend}
          </span>}
      </div>
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
        {title}
      </h3>
      <div className="mt-1 text-3xl font-bold text-gray-900">
        {typeof value === 'number' ? <motion.span initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1
      }}>
            {value.toLocaleString()}
          </motion.span> : value}
      </div>
    </motion.div>;
}