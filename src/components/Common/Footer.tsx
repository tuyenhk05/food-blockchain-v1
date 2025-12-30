import React from "react";
import { Facebook, Linkedin, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-emerald-950 via-teal-800 to-emerald-900 text-emerald-100 mt-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Intro */}
        <div>
          <h3 className="text-3xl font-extrabold mb-4 tracking-wide bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            AgriTrust
          </h3>
          <p className="text-sm text-emerald-200 leading-relaxed">
            Nền tảng truy xuất nguồn gốc thực phẩm bằng Blockchain. Minh bạch –
            An toàn – Tin cậy – Đẳng cấp quốc tế.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="/trace/DRF-2024-001"
                className="hover:text-white transition"
              >
                Truy xuất
              </a>
            </li>
            <li>
              <a href="/admin" className="hover:text-white transition">
                Quản trị
              </a>
            </li>
            <li>
              <a href="/admin/users" className="hover:text-white transition">
                Người dùng
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Đăng ký nhận tin</h4>
          <p className="text-sm text-emerald-200 mb-4">
            Nhận thông báo mới nhất về công nghệ Blockchain trong chuỗi cung ứng
            thực phẩm.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-3 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 rounded-lg text-white font-medium transition shadow-lg"
            >
              <Mail className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
          <p className="text-sm text-emerald-200">
            Email: support@agritrust.com
          </p>
          <p className="text-sm text-emerald-200">Hotline: 0123 456 789</p>
          <p className="text-sm text-emerald-200 mb-4">
            Địa chỉ: Tp. Hồ Chí Minh, Việt Nam
          </p>

          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-400 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 hover:shadow-lg hover:shadow-teal-400 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 hover:shadow-lg hover:shadow-gray-400 transition"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-700 text-center py-6 text-sm text-emerald-300 relative">
        © {new Date().getFullYear()} AgriTrust. All rights reserved.
      </div>
    </footer>
  );
}
