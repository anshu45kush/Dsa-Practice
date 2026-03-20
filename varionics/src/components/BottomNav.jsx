import { useLocation, useNavigate } from 'react-router-dom'

const navConfig = {
  customer: [
    {
      label: 'Home',
      path: '/',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Search',
      path: '/search',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      label: 'Orders',
      path: '/orders',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ],
  retailer: [
    {
      label: 'Shop',
      path: '/',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Products',
      path: '/products',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      ),
    },
    {
      label: 'Orders',
      path: '/orders',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ],
  manufacturer: [
    {
      label: 'Products',
      path: '/products',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      ),
    },
    {
      label: 'Add Product',
      path: '/add-product',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      label: 'Orders',
      path: '/orders',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: (active) => (
        <svg className={`w-5 h-5 ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ],
}

export default function BottomNav({ role = 'customer' }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const navItems = navConfig[role] || navConfig.customer

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
      <div className="bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 pt-2 pb-safe">
        <div className="flex items-center justify-around pb-1">
          {navItems.map((item) => {
            const active = isActive(item.path)
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200 active:scale-95 ${
                  active ? 'bg-[#EEF0FF]' : 'hover:bg-gray-50'
                }`}
              >
                {item.icon(active)}
                <span className={`text-[10px] font-semibold ${active ? 'text-[#6C63FF]' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
