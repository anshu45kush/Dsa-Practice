import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Button from '../../components/Button'

export default function RetailerProducts() {
  const { products, shopProducts, addToShop } = useApp()
  const navigate = useNavigate()

  const inShop = (id) => shopProducts.some(p => p.id === id)

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Manufacturer Catalog</h2>
          <p className="text-xs text-gray-400 mt-0.5">{products.length} products available</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/shop')} className="!px-3 !py-2 !text-xs">
          My Shop
        </Button>
      </div>

      <div className="space-y-3">
        {products.map(product => {
          const alreadyAdded = inShop(product.id)
          return (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3">
              <img src={product.image} alt={product.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2">{product.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product.category} · MOQ {product.moq}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-[#6C63FF]">₹{product.bulkPrice?.toLocaleString()}</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Bulk</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="text-xs text-gray-500 hover:text-[#6C63FF] flex items-center gap-1"
                >
                  View
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <Button
                  variant={alreadyAdded ? 'ghost' : 'primary'}
                  disabled={alreadyAdded}
                  onClick={() => addToShop(product, Math.round(product.bulkPrice * 1.3))}
                  className="!px-3 !py-2 !text-xs"
                >
                  {alreadyAdded ? 'In Shop' : 'Add to Shop'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
