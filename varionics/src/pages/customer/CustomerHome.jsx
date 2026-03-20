import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import ProductCard from '../../components/ProductCard'
import SkeletonCard from '../../components/SkeletonCard'

const CATEGORIES = [
  { label: 'All',         emoji: '✦' },
  { label: 'Electronics', emoji: '⚡' },
  { label: 'Fashion',     emoji: '👗' },
  { label: 'Home',        emoji: '🏠' },
  { label: 'Sports',      emoji: '🏃' },
  { label: 'Beauty',      emoji: '✨' },
  { label: 'Books',       emoji: '📚' },
]

export default function CustomerHome() {
  const { products, user } = useApp()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const filtered = products.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  )

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div className="px-4 pt-5 pb-6 space-y-6">

      {/* ── Greeting + Search ── */}
      <div className="space-y-4">
        <div>
          <p className="text-[13px] text-gray-400 font-medium">{greeting} 👋</p>
          <h1 className="text-[22px] font-extrabold text-gray-900 leading-tight tracking-tight mt-0.5">
            {firstName}, what are<br />you looking for?
          </h1>
        </div>

        <button
          onClick={() => navigate('/search')}
          className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] active:scale-[0.99] transition-all"
        >
          <svg className="w-[18px] h-[18px] text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[14px] text-gray-400 font-medium">Search products, brands…</span>
        </button>
      </div>

      {/* ── Promo Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1A1147] px-5 py-6 shadow-[0_8px_30px_rgba(108,99,255,0.28)]">
        {/* decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#6C63FF]/30" />
        <div className="absolute -bottom-10 -right-2 w-28 h-28 rounded-full bg-[#9C6FFF]/20" />

        <div className="relative z-10">
          <span className="text-[11px] font-semibold text-[#A89FFF] uppercase tracking-widest">Bulk Special</span>
          <h2 className="mt-1.5 text-[20px] font-extrabold text-white leading-tight">
            Up to 40% off<br />on bulk orders
          </h2>
          <p className="mt-1.5 text-[12px] text-white/50">Exclusive deals for retailers & manufacturers</p>
          <button
            onClick={() => navigate('/search')}
            className="mt-4 inline-flex items-center gap-1.5 bg-white text-[#1A1147] text-[12px] font-bold px-4 py-2.5 rounded-xl active:scale-95 transition-all"
          >
            Explore deals
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="space-y-3">
        <h2 className="text-[16px] font-bold text-gray-900">Categories</h2>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-0.5">
          {CATEGORIES.map(({ label, emoji }) => {
            const active = activeCategory === label
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-[12px] font-semibold transition-all duration-150 active:scale-95 ${
                  active
                    ? 'bg-[#6C63FF] text-white shadow-[0_4px_12px_rgba(108,99,255,0.35)]'
                    : 'bg-white text-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.07)]'
                }`}
              >
                <span className="text-[13px]">{emoji}</span>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-gray-900">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
          </h2>
          {!loading && filtered.length > 0 && (
            <span className="text-[12px] font-semibold text-[#6C63FF]">
              {filtered.length} items
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-[14px] font-semibold text-gray-700">No products found</p>
            <p className="text-[12px] text-gray-400">Try a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>

    </div>
  )
}
