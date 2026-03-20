import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

export default function MyProducts() {
  const { products, user } = useApp()
  const navigate = useNavigate()
  const myProducts = products.filter(p => p.seller === user.name)

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">My Products</h2>
          <p className="text-xs text-gray-400 mt-0.5">{myProducts.length} listed</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/manufacturer/add-product')} className="!py-2.5 !px-4 !text-xs">
          + Add New
        </Button>
      </div>

      {myProducts.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-4xl">🏭</div>
          <h3 className="text-base font-bold text-gray-900">No products yet</h3>
          <p className="text-sm text-gray-500">Start adding products for retailers</p>
          <Button onClick={() => navigate('/manufacturer/add-product')}>Add First Product</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {myProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-3 p-4 active:scale-[0.99] transition-all">
              <img src={product.image} alt={product.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 line-clamp-1">{product.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product.category} · MOQ: {product.moq}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-[#6C63FF]">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Bulk: ₹{product.bulkPrice?.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="text-gray-400 hover:text-[#6C63FF] transition-colors self-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
