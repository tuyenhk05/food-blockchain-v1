import React, { useState } from 'react'
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    MoreHorizontal,
    User as UserIcon,
    Shield,
    Mail,
    Calendar,
} from 'lucide-react'
import { CreateUserModal } from "../../components/Admin/CreateUserModal";
import { EditUserModal } from '../../components/Admin/EditUserModal'
import { DeleteConfirmModal } from '../../components/Admin/DeleteConfirmModal'
// Using local interface since we need to ensure type safety
interface User {
    id: string
    name: string
    email: string
    role: 'Admin' | 'Manager' | 'Staff' | 'Viewer'
    status: 'Active' | 'Inactive'
    joinDate: string
}
// Initial mock data
const initialUsers: User[] = [
    {
        id: 'USR-001',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        role: 'Admin',
        status: 'Active',
        joinDate: '2023-01-15',
    },
    {
        id: 'USR-002',
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        role: 'Manager',
        status: 'Active',
        joinDate: '2023-02-20',
    },
    {
        id: 'USR-003',
        name: 'Lê Văn C',
        email: 'levanc@example.com',
        role: 'Staff',
        status: 'Inactive',
        joinDate: '2023-03-10',
    },
    {
        id: 'USR-004',
        name: 'Phạm Thị D',
        email: 'phamthid@example.com',
        role: 'Viewer',
        status: 'Active',
        joinDate: '2023-04-05',
    },
    {
        id: 'USR-005',
        name: 'Hoàng Văn E',
        email: 'hoangvane@example.com',
        role: 'Staff',
        status: 'Active',
        joinDate: '2023-05-12',
    },
]
export function UserManagement() {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState('All')
    // Modal states
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    // Filter users
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === 'All' || user.role === roleFilter
        return matchesSearch && matchesRole
    })
    // Handlers
    const handleCreateUser = (userData: Omit<User, 'id' | 'joinDate'>) => {
        const newUser: User = {
            ...userData,
            id: `USR-${Date.now().toString().slice(-3)}`,
            joinDate: new Date().toISOString().split('T')[0],
        }
        setUsers([newUser, ...users])
    }
    const handleUpdateUser = (updatedUser: User) => {
        setUsers(
            users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
        )
    }
    const handleDeleteUser = () => {
        if (selectedUser) {
            setUsers(users.filter((user) => user.id !== selectedUser.id))
            setIsDeleteOpen(false)
            setSelectedUser(null)
        }
    }
    const openEditModal = (user: User) => {
        setSelectedUser(user)
        setIsEditOpen(true)
    }
    const openDeleteModal = (user: User) => {
        setSelectedUser(user)
        setIsDeleteOpen(true)
    }
    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Quản lý người dùng
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Quản lý quyền truy cập và thông tin nhân sự
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Plus className="h-4 w-4" />
                        Thêm người dùng
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên hoặc email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white min-w-[150px]"
                            >
                                <option value="All">Tất cả vai trò</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Staff">Staff</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 font-medium text-gray-500">
                                        Họ và tên
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-500">
                                        Vai trò
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-500">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-500">
                                        Ngày tham gia
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-500 text-right">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold shrink-0">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                            <Mail className="h-3 w-3" />
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-gray-700">
                                                    <Shield className="h-4 w-4 text-gray-400" />
                                                    {user.role}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}
                                                    />
                                                    {user.status === 'Active'
                                                        ? 'Hoạt động'
                                                        : 'Ngừng hoạt động'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    {user.joinDate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(user)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <UserIcon className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <p>Không tìm thấy người dùng nào phù hợp</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (Static for now) */}
                    <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Hiển thị{' '}
                            <span className="font-medium">{filteredUsers.length}</span> trên
                            tổng số <span className="font-medium">{users.length}</span> người
                            dùng
                        </p>
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                disabled
                            >
                                Trước
                            </button>
                            <button
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                disabled
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modals */}
            <CreateUserModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSubmit={handleCreateUser}
            />

            <EditUserModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={handleUpdateUser}
                initialData={selectedUser}
            />

            <DeleteConfirmModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteUser}
                title="Xóa người dùng"
                message={`Bạn có chắc chắn muốn xóa người dùng ${selectedUser?.name}? Hành động này không thể hoàn tác.`}
            />
        </div>
    )
}
