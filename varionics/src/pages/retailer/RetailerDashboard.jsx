import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Button from '../../components/Button'

export default function RetailerDashboard() {
  const { shopProducts, orders, products } = useApp()
  const navigate = useNavigate()
  const bulkOrders = orders.filter(o => o.quantity >= 10)

  return (
    <div className="px-4 py-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Retailer</p>
          <h1 className="text-2xl font-extrabold text-gray-900">Shop Dashboard</h1>
        </div>
        <Button variant="primary" onClick={() => navigate('/products')} className="!px-4 !py-2.5 !text-xs">
          View Catalog
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'In My Shop', value: shopProducts.length, color: 'from-[#6C63FF] to-[#9C6FFF]', onClick: () => navigate('/shop') },
          { label: 'Products Available', value: products.length, color: 'from-[#00B09B] to-[#96C93D]', onClick: () => navigate('/products') },
          { label: 'Bulk Orders', value: bulkOrders.length, color: 'from-[#FF9A9E] to-[#FECFEF]', onClick: () => navigate('/orders') },
          { label: 'All Orders', value: orders.length, color: 'from-[#1FA2FF] to-[#12D8FA]', onClick: () => navigate('/orders') },
        ].map(card => (
          <button
            key={card.label}
            onClick={card.onClick}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left active:scale-95 transition-all"
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
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Quick Actions</p>
            <p className="text-sm text-gray-600">Manage your wholesale flow</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => navigate('/shop')} className="!w-full !py-3">
            Go to My Shop
          </Button>
          <Button variant="ghost" onClick={() => navigate('/orders')} className="!w-full !py-3">
            View Orders
          </Button>
          <Button variant="primary" onClick={() => navigate('/products')} className="!w-full !py-3 col-span-2">
            Browse Manufacturer Products
          </Button>
        </div>
      </div>
    </div>
  )
}
