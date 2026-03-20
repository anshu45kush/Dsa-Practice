import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

export default function MyShop() {
  const { shopProducts, updateShopPrice } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(null)
  const [editPrice, setEditPrice] = useState('')

  const startEdit = (product) => {
    setEditing(product.id)
    setEditPrice(String(product.retailPrice))
  }

  const saveEdit = (productId) => {
    if (editPrice && !isNaN(editPrice) && Number(editPrice) > 0) {
      updateShopPrice(productId, Number(editPrice))
    }
    setEditing(null)
  }

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">My Shop</h2>
          <p className="text-xs text-gray-400 mt-0.5">{shopProducts.length} products</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/')} className="!py-2.5 !px-4 !text-xs">
          + Browse
        </Button>
      </div>

      {shopProducts.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-4xl">🏪</div>
          <h3 className="text-base font-bold text-gray-900">Your shop is empty</h3>
          <p className="text-sm text-gray-500 px-8 text-center">Browse products and add them to your shop to start selling</p>
          <Button onClick={() => navigate('/')}>Browse Products</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {shopProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex gap-3 mb-3">
                <img src={product.image} alt={product.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{product.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                  <p className="text-xs text-gray-400">Cost: ₹{product.originalPrice?.toLocaleString()}</p>
                </div>
              </div>

              {/* Price Editor */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Your Selling Price</p>
                  {editing === product.id ? (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-500 font-semibold">₹</span>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={e => setEditPrice(e.target.value)}
                        className="flex-1 bg-white border border-[#6C63FF] rounded-lg px-2 py-1 text-sm font-bold text-gray-900 focus:outline-none w-20"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <p className="text-lg font-extrabold text-[#6C63FF]">₹{product.retailPrice?.toLocaleString()}</p>
                  )}
                </div>
                {editing === product.id ? (
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(product.id)} className="bg-[#6C63FF] text-white text-xs px-3 py-2 rounded-lg font-semibold active:scale-95 transition-all">Save</button>
                    <button onClick={() => setEditing(null)} className="bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-lg font-semibold active:scale-95 transition-all">Cancel</button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(product)}
                    className="flex items-center gap-1.5 text-xs text-[#6C63FF] font-semibold bg-[#EEF0FF] px-3 py-2 rounded-lg active:scale-95 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Price
                  </button>
                )}
              </div>

              {/* Margin Display */}
              {product.originalPrice && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(0, ((product.retailPrice - product.originalPrice) / product.retailPrice) * 100))}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-green-600">
                    {product.retailPrice > product.originalPrice
                      ? `+₹${(product.retailPrice - product.originalPrice).toLocaleString()} margin`
                      : 'No margin'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
