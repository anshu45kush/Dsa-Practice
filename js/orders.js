// js/orders.js
// ============================================================
// ORDER MANAGEMENT
// Handles order creation and retrieval using cart state
// ============================================================

import { STATE } from './state.js'
import { clearCart } from './actions.js'

// ============================================================
// 📋 ORDER CREATION
// ============================================================

/**
 * Place an order using current cart items
 * Moves cart.items → STATE.orders, then clears the cart
 * @returns {{ success: boolean, orderId: string, message: string }}
 */
export function placeOrder() {
  if (!STATE.cart.items || STATE.cart.items.length === 0) {
    return { success: false, orderId: null, message: 'Cart is empty' }
  }

  const orderId = `ORD-${Date.now()}`

  const newOrder = {
    id: orderId,
    items: [...STATE.cart.items],
    total: STATE.cart.total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  STATE.orders.unshift(newOrder)
  clearCart()

  return { success: true, orderId, message: 'Order placed successfully' }
}

// ============================================================
// 📦 ORDER RETRIEVAL
// ============================================================

/**
 * Get all orders
 * @returns {array} All orders
 */
export function getOrders() {
  return STATE.orders
}

/**
 * Get a single order by ID
 * @param {string} orderId - Order ID (e.g. 'ORD-1234567890')
 * @returns {object|undefined} Order or undefined if not found
 */
export function getOrderById(orderId) {
  return STATE.orders.find(order => order.id === orderId)
}

// ============================================================
// 🔄 ORDER STATUS UPDATES
// ============================================================

/**
 * Update the status of an order
 * @param {string} orderId - Order ID
 * @param {string} status - New status ('pending'|'confirmed'|'shipped'|'delivered'|'cancelled')
 * @returns {{ success: boolean, message: string }}
 */
export function updateOrderStatus(orderId, status) {
  const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

  if (!validStatuses.includes(status)) {
    return { success: false, message: `Invalid status: ${status}` }
  }

  const order = getOrderById(orderId)
  if (!order) {
    return { success: false, message: `Order ${orderId} not found` }
  }

  order.status = status
  return { success: true, message: `Order ${orderId} updated to ${status}` }
}
