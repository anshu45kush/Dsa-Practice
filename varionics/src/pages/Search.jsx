import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Sports']

export default function Search() {
  const { products, searchQuery, setSearchQuery } = useApp()
  const [query, setQuery] = useState(searchQuery)
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    if (query) {
      setLoading(true)
      const t = setTimeout(() => setLoading(false), 500)
      return () => clearTimeout(t)
    }
  }, [query])

  const filtered = products.filter(p => {
    const matchesQuery = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.seller.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = activeFilter === 'All' || p.category === activeFilter
    return matchesQuery && matchesFilter
  })

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSearchQuery(e.target.value) }}
          placeholder="Search products, brands..."
          autoFocus
          className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-10 py-3.5 text-sm focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all shadow-sm"
        />
        {query && (
          <button onClick={() => { setQuery(''); setSearchQuery('') }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeFilter === cat
                ? 'bg-[#6C63FF] text-white'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {!query && !loading ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500 text-sm font-medium">Search for products</p>
          <p className="text-gray-400 text-xs mt-1">Find electronics, fashion, home &amp; more</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">😕</div>
          <p className="text-gray-500 text-sm">No results for &quot;{query}&quot;</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-500">{filtered.length} results{query ? ` for "${query}"` : ''}</p>
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </>
      )}
    </div>
  )
}
