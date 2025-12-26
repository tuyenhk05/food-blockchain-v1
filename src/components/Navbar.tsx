import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Package, Link as LinkIcon, Users, Search, CheckCircle } from 'lucide-react';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navLinks = [{
    path: '/admin',
    label: 'Tổng Quan',
    icon: LayoutDashboard
  }, {
    path: '/admin/shipments',
    label: 'Quản Lý Lô Hàng',
    icon: Package
  }, {
    path: '/admin/blockchain',
    label: 'Blockchain',
    icon: LinkIcon
  }, {
    path: '/admin/confirmed-orders',
    label: 'Đơn Đã Xác Nhận',
    icon: CheckCircle
  }, {
    path: '/admin/users',
    label: 'Người Dùng',
    icon: Users
  }];
  return <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">AgriTrust</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navLinks.map(link => <Link key={link.path} to={link.path} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive(link.path) ? 'border-emerald-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.label}
                </Link>)}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <input type="text" placeholder="Tra cứu mã lô hàng..." className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 text-sm transition-all" />
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-2.5" />
            </div>
            <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              <span className="sr-only">View notifications</span>
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                A
              </div>
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(link.path) ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`} onClick={() => setIsOpen(false)}>
                <div className="flex items-center">
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.label}
                </div>
              </Link>)}
          </div>
        </div>}
    </nav>;
}