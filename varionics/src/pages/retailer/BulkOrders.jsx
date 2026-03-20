import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

export default function BulkOrders() {
  const { orders } = useApp()
  const navigate = useNavigate()
  const bulkOrders = orders.filter(o => o.quantity >= 10)

  return (
    <div className="px-4 py-5 space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900">Bulk Orders</h2>
        <p className="text-xs text-gray-400 mt-0.5">{bulkOrders.length} wholesale orders</p>
      </div>

      {bulkOrders.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-4xl">📋</div>
          <h3 className="text-base font-bold text-gray-900">No bulk orders</h3>
          <p className="text-sm text-gray-500">Place bulk orders from product pages</p>
          <Button onClick={() => navigate('/')}>Browse Products</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {bulkOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex gap-3 mb-3">
                <img src={order.product.image} alt={order.product.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{order.product.title}</p>
                  <p className="text-xs text-gray-400">{order.date}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-[#6C63FF]">₹{order.total.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">· {order.quantity} units</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold">{order.status}</span>
                <span className="text-xs text-gray-400">#{order.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
