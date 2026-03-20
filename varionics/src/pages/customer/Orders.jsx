import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

const STATUS_CONFIG = {
  Placed: { color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  Accepted: { color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  Shipped: { color: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500' },
  Delivered: { color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  Cancelled: { color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}

const STATUSES = ['Placed', 'Accepted', 'Shipped', 'Delivered']

export default function Orders() {
  const { orders } = useApp()
  const navigate = useNavigate()

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4 px-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl">📦</div>
        <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
        <p className="text-sm text-gray-500">Start shopping to see your orders here</p>
        <Button onClick={() => navigate('/')}>Browse Products</Button>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
        <span className="text-sm text-gray-400">{orders.length} orders</span>
      </div>

      <div className="space-y-3">
        {orders.map(order => {
          const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.Placed
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.99] transition-all">
              <div className="flex gap-3 p-4">
                <img
                  src={order.product.image}
                  alt={order.product.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{order.product.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Qty: {order.quantity} · {order.date}</p>
                  <p className="text-sm font-bold text-[#6C63FF] mt-1">₹{order.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="px-4 pb-4 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${statusConfig.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                  {order.status}
                </span>
                <span className="text-xs text-gray-400">#{order.id}</span>
              </div>
              {/* Status progress bar */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-1">
                  {STATUSES.map((s, i) => {
                    const currentIdx = STATUSES.indexOf(order.status)
                    const isCompleted = i <= currentIdx
                    return (
                      <div key={s} className="flex-1 flex items-center gap-1">
                        <div className={`h-1.5 flex-1 rounded-full transition-all ${isCompleted ? 'bg-[#6C63FF]' : 'bg-gray-100'}`} />
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  {STATUSES.map((s, i) => {
                    const currentIdx = STATUSES.indexOf(order.status)
                    return (
                      <span key={s} className={`text-[9px] font-medium ${i <= currentIdx ? 'text-[#6C63FF]' : 'text-gray-300'}`}>{s}</span>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
