import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden text-left active:scale-[0.97] transition-all duration-150 hover:shadow-[0_6px_20px_rgba(0,0,0,0.11)] w-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {/* Rating pill — bottom-left of image */}
        {product.rating > 0 && (
          <div className="absolute bottom-2 left-2 bg-black/55 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
            <svg className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[11px] font-semibold text-white">{product.rating}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-3.5 pt-3 pb-3.5 space-y-1.5">
        <p className="text-[13px] font-medium text-gray-800 line-clamp-2 leading-[1.4]">{product.title}</p>
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
          <p className="text-[11px] text-gray-400 truncate max-w-[50%] text-right">{product.seller}</p>
        </div>
      </div>
    </button>
  )
}
