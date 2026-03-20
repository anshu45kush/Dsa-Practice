import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Button from '../components/Button'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, role, placeOrder, addToShop } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [toast, setToast] = useState(null)

  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="text-5xl">😕</div>
        <p className="text-gray-500">Product not found</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    )
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const handleBuyNow = () => {
    placeOrder(product, quantity)
    showToast('Order placed successfully! 🎉')
    setTimeout(() => navigate('/orders'), 1500)
  }

  const handleAddToShop = () => {
    addToShop(product, Math.round(product.bulkPrice * 1.3))
    showToast('Added to your shop! ✓')
  }

  const handleBulkOrder = () => {
    placeOrder(product, product.moq)
    showToast(`Bulk order of ${product.moq} units placed! 🎉`)
    setTimeout(() => navigate('/orders'), 1500)
  }

  return (
    <div className="relative pb-24">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-5 py-3 rounded-2xl shadow-xl animate-bounce">
          {toast}
        </div>
      )}

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Hero Image */}
      <div className="relative bg-gray-100">
        <img src={product.image} alt={product.title} className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 py-5 space-y-4">
        {/* Category + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xs bg-[#EEF0FF] text-[#6C63FF] px-3 py-1 rounded-full font-semibold">{product.category}</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-gray-800">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 leading-tight">{product.title}</h1>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-[#6C63FF]">₹{product.price.toLocaleString()}</span>
          {role === 'retailer' && product.bulkPrice && (
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-lg">
              Bulk: ₹{product.bulkPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Seller */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-2xl p-3">
          <div className="w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center text-white text-xs font-bold">
            {product.seller[0]}
          </div>
          <div>
            <p className="text-xs text-gray-400">Sold by</p>
            <p className="text-sm font-semibold text-gray-800">{product.seller}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Retailer MOQ info */}
        {role === 'retailer' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-bold text-amber-800">Minimum Order Quantity (MOQ)</span>
            </div>
            <p className="text-2xl font-extrabold text-amber-700">{product.moq} <span className="text-sm font-normal">units</span></p>
            <p className="text-xs text-amber-600">Order {product.moq}+ units at ₹{product.bulkPrice?.toLocaleString()} each</p>
          </div>
        )}

        {/* Quantity selector for customer */}
        {role === 'customer' && (
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
            <span className="text-sm font-semibold text-gray-700">Quantity</span>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm active:scale-95 transition-all font-bold"
              >−</button>
              <span className="text-base font-bold text-gray-900 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-9 h-9 rounded-full bg-[#6C63FF] flex items-center justify-center text-white shadow-sm active:scale-95 transition-all font-bold"
              >+</button>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-[65px] left-0 right-0 max-w-md mx-auto px-4 py-3 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-40">
        {role === 'customer' && (
          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => showToast('Added to cart! 🛒')}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            </Button>
            <Button variant="primary" fullWidth onClick={handleBuyNow}>
              Buy Now · ₹{(product.price * quantity).toLocaleString()}
            </Button>
          </div>
        )}
        {role === 'retailer' && (
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={handleAddToShop}>
              + My Shop
            </Button>
            <Button variant="primary" fullWidth onClick={handleBulkOrder}>
              Order Bulk ({product.moq})
            </Button>
          </div>
        )}
        {role === 'manufacturer' && (
          <Button variant="ghost" fullWidth onClick={() => navigate('/products')}>
            View My Products
          </Button>
        )}
      </div>
    </div>
  )
}
