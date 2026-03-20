import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { role } = useApp()

  const roleBadgeColor = {
    customer: 'bg-blue-100 text-blue-700',
    retailer: 'bg-green-100 text-green-700',
    manufacturer: 'bg-purple-100 text-purple-700',
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#6C63FF] flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">V</span>
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">Varionics</span>
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleBadgeColor[role]}`}>
            {role}
          </span>
          <button
            onClick={() => navigate('/search')}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
