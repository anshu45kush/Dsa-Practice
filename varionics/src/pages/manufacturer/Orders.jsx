import { useApp } from '../../context/AppContext'

const STATUS_STYLE = {
  Placed: 'bg-blue-50 text-blue-700 border-blue-100',
  Accepted: 'bg-amber-50 text-amber-700 border-amber-100',
  Shipped: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  Delivered: 'bg-green-50 text-green-700 border-green-100',
}

export default function ManufacturerOrders() {
  const { orders, user } = useApp()
  const myOrders = orders.filter(o => o.product.seller === user.name)

  if (myOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4 px-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl">📦</div>
        <h3 className="text-lg font-bold text-gray-900">No incoming orders</h3>
        <p className="text-sm text-gray-500">Orders from retailers will appear here</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Incoming Orders</h2>
        <span className="text-sm text-gray-400">{myOrders.length} total</span>
      </div>

      <div className="space-y-3">
        {myOrders.map(order => {
          const badge = STATUS_STYLE[order.status] || STATUS_STYLE.Placed
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <img src={order.product.image} alt={order.product.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2">{order.product.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Qty: {order.quantity} · {order.date}</p>
                  <p className="text-sm font-bold text-[#6C63FF] mt-1">₹{order.total.toLocaleString()}</p>
                </div>
                <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border ${badge}`}>
                  {order.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
