import React from 'react';
import { ShieldCheck, Leaf, Search } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { FeatureCard } from '../components/FeatureCard';
import { motion } from 'framer-motion';
export function LandingPage() {
  return <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/50 to-emerald-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <div className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-emerald-100">
                Truy Xuất Nguồn Gốc Bằng Blockchain
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Từ Nông Trại Đến Bàn Ăn, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Xác Thực Bởi Blockchain
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-emerald-100 mb-10">
              Theo dõi hành trình thực phẩm của bạn với các bản ghi blockchain
              không thể thay đổi. Đảm bảo an toàn, chất lượng và tính xác thực
              với mỗi lần quét.
            </p>
          </motion.div>

          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn AgriTrust?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi kết hợp cảm biến IoT tiên tiến với công nghệ blockchain để
            mang đến chuỗi cung ứng thực phẩm minh bạch nhất thế giới.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={ShieldCheck} title="Bảo Mật Tuyệt Đối" description="Mọi bước trong chuỗi cung ứng đều được ghi lại trên blockchain, tạo ra lịch sử không thể giả mạo về hành trình sản phẩm của bạn." delay={0.1} />
          <FeatureCard icon={Leaf} title="Chất Lượng Tươi Ngon" description="Giám sát nhiệt độ và độ ẩm theo thời gian thực đảm bảo sản phẩm duy trì độ tươi ngon từ khi thu hoạch đến khi giao hàng." delay={0.2} />
          <FeatureCard icon={Search} title="Minh Bạch Hoàn Toàn" description="Quét bất kỳ sản phẩm nào để xem ngay toàn bộ lịch sử, bao gồm chi tiết về nông dân, dữ liệu chế biến và thông tin vận chuyển." delay={0.3} />
        </div>
      </section>
    </div>;
}