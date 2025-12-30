import React from "react";
import { ShieldCheck, Leaf, Search } from "lucide-react";
import { SearchBar } from "../../components/Common/SearchBar";
import { FeatureCard } from "../../components/Common/FeatureCard";
import { motion } from "framer-motion";
import { Footer } from "../../components/Common/Footer";
import { TemperatureChart } from "../../components/Common/TemperatureChart";
import { NewsPreviewSection } from "../../components/User/NewsPreviewSection";
import { Link } from "react-router-dom";
export function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/50 to-emerald-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">
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
              duration: 0.6,
            }}
          >
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
          <FeatureCard
            icon={ShieldCheck}
            title="Bảo Mật Tuyệt Đối"
            description="Mọi bước trong chuỗi cung ứng đều được ghi lại trên blockchain, tạo ra lịch sử không thể giả mạo về hành trình sản phẩm của bạn."
            delay={0.1}
          />
          <FeatureCard
            icon={Leaf}
            title="Chất Lượng Tươi Ngon"
            description="Giám sát nhiệt độ và độ ẩm theo thời gian thực đảm bảo sản phẩm duy trì độ tươi ngon từ khi thu hoạch đến khi giao hàng."
            delay={0.2}
          />
          <FeatureCard
            icon={Search}
            title="Minh Bạch Hoàn Toàn"
            description="Quét bất kỳ sản phẩm nào để xem ngay toàn bộ lịch sử, bao gồm chi tiết về nông dân, dữ liệu chế biến và thông tin vận chuyển."
            delay={0.3}
          />
        </div>
      </section>
      {/* Traceability Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quy Trình Truy Xuất Nguồn Gốc
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mỗi sản phẩm đều được gắn mã lô hàng duy nhất. Khi người dùng quét
              mã, hệ thống sẽ hiển thị toàn bộ hành trình từ nông trại đến bàn
              ăn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                📍 Thu Hoạch
              </h3>
              <p className="text-gray-600">
                Thông tin về nông dân, thời gian và địa điểm thu hoạch được ghi
                lại.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                🚚 Vận Chuyển
              </h3>
              <p className="text-gray-600">
                Dữ liệu từ cảm biến IoT về nhiệt độ, độ ẩm được ghi lên
                blockchain.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                🏪 Phân Phối
              </h3>
              <p className="text-gray-600">
                Thông tin về kho lưu trữ, nhà bán lẻ và thời gian giao hàng được
                xác thực.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lợi Ích Cho Người Dùng
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Hệ thống truy xuất nguồn gốc bằng blockchain mang lại sự tin tưởng
            và minh bạch cho người tiêu dùng.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                🔒 An Toàn
              </h3>
              <p className="text-gray-600">
                Dữ liệu không thể bị giả mạo, đảm bảo nguồn gốc sản phẩm chính
                xác.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                🌱 Tin Cậy
              </h3>
              <p className="text-gray-600">
                Người tiêu dùng biết rõ sản phẩm đến từ đâu và được sản xuất thế
                nào.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                ⚡ Nhanh Chóng
              </h3>
              <p className="text-gray-600">
                Chỉ cần quét mã QR để xem toàn bộ lịch sử sản phẩm ngay lập tức.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Đối Tác Tin Cậy
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            AgriTrust hợp tác với các nông trại, nhà phân phối và nhà bán lẻ uy
            tín để đảm bảo chất lượng thực phẩm.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              Nông Trại A
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              Nhà Phân Phối B
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              Siêu Thị C
            </div>
          </div>
        </div>
      </section>
      {/* Giới thiệu hệ thống */}
      <section className="bg-[#ECFDF5] py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Minh Bạch Chuỗi Cung Ứng Nông Sản
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            AgriTrust là nền tảng ứng dụng <strong>Blockchain</strong> và{" "}
            <strong>IoT</strong> để truy xuất nguồn gốc thực phẩm từ nông trại
            đến bàn ăn. <br /> Chúng tôi cam kết mang đến sự minh bạch, an toàn
            và niềm tin cho người tiêu dùng thông qua dữ liệu thời gian thực và
            tin tức cập nhật liên tục.
          </p>
          <div className="mt-8">
            <Link
              to="/news"
              className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg text-base font-medium hover:bg-emerald-500 transition"
            >
              Xem Tin Tức Mới Nhất →
            </Link>
          </div>
        </div>
      </section>

      {/* Section Tin Tức */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Tin Tức & Cập Nhật
          </h2>
          <NewsPreviewSection />
        </div>
      </section>

      {/* IoT Data Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dữ Liệu IoT Thời Gian Thực
          </h2>
          <p className="text-gray-600 mb-8">
            Giám sát nhiệt độ và độ ẩm trong suốt quá trình vận chuyển để đảm
            bảo chất lượng.
          </p>
          <div className="bg-gray-50 rounded-xl shadow p-6">
            {/* Placeholder chart */}
            <TemperatureChart />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
