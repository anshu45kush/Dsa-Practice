import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const ROLES = ['customer', 'retailer', 'manufacturer']

const roleNavItems = {
  customer: [
    { label: 'My Orders', icon: '📦', path: '/orders', desc: 'View order history' },
    { label: 'Wishlist', icon: '❤️', path: '/search', desc: 'Saved products' },
  ],
  retailer: [
    { label: 'My Orders', icon: '📦', path: '/orders', desc: 'View order history' },
    { label: 'My Shop', icon: '🏪', path: '/shop', desc: 'Manage your store' },
    { label: 'Bulk Orders', icon: '📋', path: '/orders', desc: 'Wholesale orders' },
  ],
  manufacturer: [
    { label: 'My Products', icon: '🏭', path: '/products', desc: 'Manage products' },
    { label: 'Add Product', icon: '➕', path: '/add-product', desc: 'List new product' },
    { label: 'Orders', icon: '📦', path: '/orders', desc: 'View all orders' },
  ],
}

const roleBadgeStyle = {
  customer: 'from-blue-400 to-blue-600',
  retailer: 'from-green-400 to-green-600',
  manufacturer: 'from-purple-400 to-purple-600',
}

export default function Profile() {
  const { user, role, setRole } = useApp()
  const navigate = useNavigate()
  const navItems = roleNavItems[role] || []

  return (
    <div className="px-4 py-5 space-y-5">
      {/* User Card */}
      <div className={`bg-gradient-to-br ${roleBadgeStyle[role]} rounded-3xl p-5 text-white shadow-lg`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold backdrop-blur">
            {user.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-white/70 text-sm">{user.email}</p>
            <span className="inline-block mt-1 text-xs bg-white/20 backdrop-blur-sm px-3 py-0.5 rounded-full font-semibold capitalize">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Switch Role (Demo) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Switch Role (Demo)</p>
        <div className="flex gap-2">
          {ROLES.map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all active:scale-95 ${
                role === r
                  ? 'bg-[#6C63FF] text-white shadow-[0_2px_10px_rgba(108,99,255,0.35)]'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 pt-4 pb-2">Quick Access</p>
        <div className="divide-y divide-gray-50">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
            >
              <span className="text-xl w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 pt-4 pb-2">Settings</p>
        <div className="divide-y divide-gray-50">
          {[
            { icon: '🔔', label: 'Notifications', desc: 'Manage alerts' },
            { icon: '🌍', label: 'Language', desc: 'English' },
            { icon: '🎨', label: 'Appearance', desc: 'Light mode' },
            { icon: '🔒', label: 'Privacy', desc: 'Security settings' },
          ].map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
            >
              <span className="text-xl w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-red-500 font-semibold text-sm active:scale-[0.98] transition-all">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sign Out
      </button>
    </div>
  )
}
