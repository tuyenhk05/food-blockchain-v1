import React from 'react';
import { User, Shield, Mail, MoreVertical } from 'lucide-react';
const users = [{
  id: 1,
  name: 'Nguyễn Văn A',
  role: 'Nông Dân',
  email: 'nguyen.a@farm.vn',
  status: 'Hoạt Động'
}, {
  id: 2,
  name: 'Trần Văn B',
  role: 'Tài Xế Vận Chuyển',
  email: 'tran.b@logistics.vn',
  status: 'Hoạt Động'
}, {
  id: 3,
  name: 'Lê Thị C',
  role: 'Kiểm Tra Chất Lượng',
  email: 'le.c@freshpack.vn',
  status: 'Hoạt Động'
}, {
  id: 4,
  name: 'Admin User',
  role: 'Quản Trị Hệ Thống',
  email: 'admin@agritrust.vn',
  status: 'Hoạt Động'
}, {
  id: 5,
  name: 'Quản Lý FreshMart',
  role: 'Nhà Bán Lẻ',
  email: 'manager@freshmart.vn',
  status: 'Không Hoạt Động'
}];
export function UserManagement() {
  return <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Quản Lý Người Dùng
            </h1>
            <p className="text-gray-500">
              Quản lý quyền truy cập và vai trò hệ thống.
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            <User className="w-4 h-4 mr-2" />
            Thêm Người Dùng
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người Dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai Trò
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao Tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Shield className="w-4 h-4 text-gray-400" />
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Hoạt Động' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;
}