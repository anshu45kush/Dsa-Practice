import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import Button from '../components/Button'

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Beauty', 'Books']

export default function Home() {
  const { products, role } = useApp()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesCategory
  })

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Search Bar */}
      <button
        onClick={() => navigate('/search')}
        className="w-full bg-white rounded-2xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow text-left"
      >
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-sm text-gray-400">Search products...</span>
      </button>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#6C63FF] to-[#9C6FFF] rounded-3xl p-5 text-white shadow-[0_8px_30px_rgba(108,99,255,0.35)]">
        <p className="text-xs font-semibold opacity-80 mb-1">🔥 Special Offer</p>
        <h2 className="text-xl font-bold leading-tight mb-1">Bulk Orders<br/>Up to 40% Off</h2>
        <p className="text-xs opacity-70 mb-4">For retailers &amp; manufacturers</p>
        <Button variant="secondary" className="!bg-white !text-[#6C63FF] !py-2.5 !text-xs" onClick={() => navigate('/search')}>
          Explore Now →
        </Button>
      </div>

      {/* Role-specific CTA */}
      {role === 'manufacturer' && (
        <button
          onClick={() => navigate('/manufacturer/add-product')}
          className="w-full bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-all"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Add New Product</p>
            <p className="text-xs text-gray-500">List your product for retailers</p>
          </div>
          <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {role === 'retailer' && (
        <button
          onClick={() => navigate('/retailer/shop')}
          className="w-full bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-all"
        >
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">My Shop</p>
            <p className="text-xs text-gray-500">Manage your retail products</p>
          </div>
          <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 ${
              activeCategory === cat
                ? 'bg-[#6C63FF] text-white shadow-[0_2px_10px_rgba(108,99,255,0.35)]'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-900">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
            <span className="text-sm font-normal text-gray-400 ml-2">({filtered.length})</span>
          </h3>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 text-sm">No products found</p>
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
