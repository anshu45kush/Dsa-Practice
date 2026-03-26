// js/actions.js
// ============================================================
// STATE MUTATIONS & BUSINESS LOGIC
// All functions that modify STATE live here
// ============================================================

import { STATE, getProduct } from './state.js'

// ============================================================
// 🛒 CART ACTIONS
// ============================================================

/**
 * Add product to cart
 * @param {number} productId - Product ID
 * @param {number} qty - Quantity to add (default 1)
 * @param {string} size - Selected size (optional)
 * @returns {{ success: boolean, message: string }}
 */
export function addToCart(productId, qty = 1, size = null) {
  const product = getProduct(productId)
  if (!product) return { success: false, message: 'Product not found' }
  if (product.stock < qty) return { success: false, message: 'Not enough stock' }

  const existing = STATE.cart.items.find(
    item => item.productId === productId && item.size === size
  )

  if (existing) {
    existing.qty += qty
  } else {
    STATE.cart.items.push({ productId, qty, size })
  }

  recalcCartTotal()
  return { success: true, message: 'Added to cart' }
}

/**
 * Remove product from cart
 * @param {number} productId - Product ID
 * @param {string} size - Size variant (optional)
 * @returns {{ success: boolean }}
 */
export function removeFromCart(productId, size = null) {
  STATE.cart.items = STATE.cart.items.filter(
    item => !(item.productId === productId && item.size === size)
  )
  recalcCartTotal()
  return { success: true }
}

/**
 * Update quantity of a cart item
 * @param {number} productId - Product ID
 * @param {number} qty - New quantity
 * @param {string} size - Size variant (optional)
 * @returns {{ success: boolean }}
 */
export function updateCartQty(productId, qty, size = null) {
  if (qty <= 0) return removeFromCart(productId, size)

  const item = STATE.cart.items.find(
    i => i.productId === productId && i.size === size
  )
  if (!item) return { success: false }

  item.qty = qty
  recalcCartTotal()
  return { success: true }
}

/**
 * Clear all items from cart
 */
export function clearCart() {
  STATE.cart.items = []
  STATE.cart.total = 0
}

/**
 * Recalculate cart total from current items
 */
function recalcCartTotal() {
  STATE.cart.total = STATE.cart.items.reduce((sum, item) => {
    const product = getProduct(item.productId)
    if (!product) return sum
    const price = parseInt(product.price.replace(/[₹,]/g, ''))
    return sum + price * item.qty
  }, 0)
}

/**
 * Get cart item count
 * @returns {number} Total number of items in cart
 */
export function getCartCount() {
  return STATE.cart.items.reduce((sum, item) => sum + item.qty, 0)
}

// ============================================================
// ❤️ WISHLIST ACTIONS
// ============================================================

/**
 * Toggle a product in the wishlist
 * @param {number} productId - Product ID
 * @returns {{ isWishlisted: boolean }}
 */
export function toggleWishlist(productId) {
  const idx = STATE.wishlist.indexOf(productId)
  if (idx === -1) {
    STATE.wishlist.push(productId)
    return { isWishlisted: true }
  } else {
    STATE.wishlist.splice(idx, 1)
    return { isWishlisted: false }
  }
}

/**
 * Check if a product is in the wishlist
 * @param {number} productId - Product ID
 * @returns {boolean}
 */
export function isInWishlist(productId) {
  return STATE.wishlist.includes(productId)
}

// ============================================================
// 🔍 FILTER ACTIONS
// ============================================================

/**
 * Set active filters
 * @param {object} filters - Filter values to apply
 */
export function setFilters(filters) {
  Object.assign(STATE.filters, filters)
}

/**
 * Reset all filters to defaults
 */
export function resetFilters() {
  STATE.filters = {
    categories: [],
    price: null,
    sizes: [],
    rating: 0,
  }
}

/**
 * Toggle a category in the filter
 * @param {string} category - Category name
 */
export function toggleCategoryFilter(category) {
  const idx = STATE.filters.categories.indexOf(category)
  if (idx === -1) {
    STATE.filters.categories.push(category)
  } else {
    STATE.filters.categories.splice(idx, 1)
  }
}

// ============================================================
// 👤 ROLE ACTIONS
// ============================================================

/**
 * Switch user role
 * @param {string} role - 'customer' | 'retailer' | 'manufacturer'
 */
export function setRole(role) {
  const validRoles = ['customer', 'retailer', 'manufacturer']
  if (!validRoles.includes(role)) return
  STATE.role = role
}
