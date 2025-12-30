import React from "react";
import {
  Package,
  AlertTriangle,
  Database,
  TrendingUp,
  BoxIcon,
} from "lucide-react";
import { StatsCard } from "../../components/Admin/StatsCard";
import { ShipmentTable } from "../../components/Admin/ShipmentTable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const chartData = [
  {
    name: "T2",
    shipments: 12,
  },
  {
    name: "T3",
    shipments: 19,
  },
  {
    name: "T4",
    shipments: 15,
  },
  {
    name: "T5",
    shipments: 25,
  },
  {
    name: "T6",
    shipments: 32,
  },
  {
    name: "T7",
    shipments: 28,
  },
  {
    name: "CN",
    shipments: 18,
  },
];
export function AdminDashboard() {
  const navigate = useNavigate();
  const handleAlertClick = (batchId: string) => {
    navigate(`/shipments?search=${batchId}`);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tổng Quan Bảng Điều Khiển
          </h1>
          <p className="text-gray-500">
            Chào mừng trở lại, Admin. Đây là những gì đang diễn ra hôm nay.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Tổng Lô Hàng"
            value={125}
            icon={Package}
            trend="12%"
            trendUp={true}
            color="blue"
            delay={0}
          />
          <StatsCard
            title="Lô Hàng Hoạt Động"
            value={18}
            icon={BoxIcon}
            trend="5%"
            trendUp={true}
            color="emerald"
            delay={0.1}
          />
          <StatsCard
            title="Cảnh Báo Rủi Ro"
            value={3}
            icon={AlertTriangle}
            trend="2"
            trendUp={false}
            color="orange"
            delay={0.2}
          />
          <StatsCard
            title="Giao Dịch Blockchain"
            value={1247}
            icon={Database}
            trend="100%"
            trendUp={true}
            color="purple"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Khối Lượng Vận Chuyển
              </h2>
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5% so với tuần trước</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#6B7280",
                      fontSize: 12,
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#6B7280",
                      fontSize: 12,
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="shipments"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={{
                      fill: "#059669",
                      strokeWidth: 2,
                      r: 4,
                      stroke: "#fff",
                    }}
                    activeDot={{
                      r: 6,
                      strokeWidth: 0,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity / Alerts */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Cảnh Báo Hệ Thống
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Biến Động Nhiệt Độ",
                  batch: "DRF-2024-002",
                  time: "2h trước",
                  type: "warning",
                },
                {
                  title: "Chậm Trễ Vận Chuyển",
                  batch: "DRF-2024-003",
                  time: "4h trước",
                  type: "info",
                },
                {
                  title: "Lô Hàng Mới Được Tạo",
                  batch: "DRF-2024-005",
                  time: "5h trước",
                  type: "success",
                },
                {
                  title: "Xác Thực Thất Bại",
                  batch: "DRF-2024-001",
                  time: "1 ngày trước",
                  type: "error",
                },
              ].map((alert, i) => (
                <div
                  key={i}
                  onClick={() => handleAlertClick(alert.batch)}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${
                      alert.type === "warning"
                        ? "bg-orange-500"
                        : alert.type === "error"
                        ? "bg-red-500"
                        : alert.type === "success"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {alert.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Lô Hàng: {alert.batch} • {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Shipments Table */}
        <ShipmentTable />
      </div>
    </div>
  );
}
