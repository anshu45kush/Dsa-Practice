import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Button from '../../components/Button'

export default function ManufacturerDashboard() {
  const { products, user, orders } = useApp()
  const navigate = useNavigate()
  const myProducts = products.filter(p => p.seller === user.name)
  const incomingOrders = orders.filter(o => o.product.seller === user.name)
  const averageMoq = myProducts.length ? Math.round(myProducts.reduce((sum, p) => sum + p.moq, 0) / myProducts.length) : 0

  return (
    <div className="px-4 py-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Manufacturer</p>
          <h1 className="text-2xl font-extrabold text-gray-900">Product Console</h1>
          <p className="text-xs text-gray-500 mt-1">{myProducts.length} products listed</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/add-product')} className="!px-4 !py-2.5 !text-xs">
          + Add Product
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Live Products', value: myProducts.length, color: 'from-[#6C63FF] to-[#9C6FFF]', onClick: () => navigate('/products') },
          { label: 'Incoming Orders', value: incomingOrders.length, color: 'from-[#00B4DB] to-[#0083B0]', onClick: () => navigate('/orders') },
          { label: 'Pending Requests', value: incomingOrders.filter(o => o.status !== 'Delivered').length, color: 'from-[#FF9A9E] to-[#FAD0C4]', onClick: () => navigate('/orders') },
          { label: 'Avg. MOQ', value: averageMoq, color: 'from-[#11998e] to-[#38ef7d]' },
        ].map(card => (
          <button
            key={card.label}
            type="button"
            onClick={card.onClick}
            disabled={!card.onClick}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left transition-all ${card.onClick ? 'active:scale-95' : 'opacity-90 cursor-default'}`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} text-white font-extrabold text-sm flex items-center justify-center mb-2`}>
              {card.value}
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{card.label}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Next steps</p>
            <p className="text-sm text-gray-600">Manage your catalog and orders</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => navigate('/products')} className="!w-full !py-3">
            View Products
          </Button>
          <Button variant="ghost" onClick={() => navigate('/orders')} className="!w-full !py-3">
            Incoming Orders
          </Button>
          <Button variant="primary" onClick={() => navigate('/add-product')} className="!w-full !py-3 col-span-2">
            List New Product
          </Button>
        </div>
      </div>
    </div>
  )
}
