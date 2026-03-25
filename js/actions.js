// js/actions.js
// ============================================================
// ACTIONS LAYER — Centralized State Mutations
// All state changes MUST go through this file.
// No DOM manipulation. No UI code. Pure business logic only.
// ============================================================

import { STATE, FASHION_PRODUCTS, APPLICATIONS } from './state.js';

// Internal counter for generating unique IDs within the same millisecond
let _idCounter = 0;

/** Generate a unique ID string with a timestamp + monotonic counter. */
function _uid(prefix) {
  return `${prefix}-${Date.now()}-${++_idCounter}`;
}

// ============================================================
// 🛒 CART ACTIONS
// ============================================================

/**
 * Add a product to the cart.
 * @param {number} productId
 * @param {number} [qty=1]
 * @returns {{ cartItemId: string, productId: number, qty: number }}
 */
export function addToCart(productId, qty = 1) {
  const existing = STATE.cart.find(item => item.productId === productId);
  if (existing) {
    existing.qty += qty;
    console.log('[action] addToCart (updated qty):', existing);
    return existing;
  }
  const cartItem = {
    cartItemId: _uid('cart'),
    productId,
    qty,
  };
  STATE.cart.push(cartItem);
  console.log('[action] addToCart:', cartItem);
  return cartItem;
}

/**
 * Remove a specific item from the cart by its cartItemId.
 * @param {string} cartItemId
 */
export function removeFromCart(cartItemId) {
  const idx = STATE.cart.findIndex(item => item.cartItemId === cartItemId);
  if (idx !== -1) {
    const removed = STATE.cart.splice(idx, 1)[0];
    console.log('[action] removeFromCart:', removed);
    return removed;
  }
  console.warn('[action] removeFromCart: item not found', cartItemId);
  return null;
}

/**
 * Update the quantity of a cart item.
 * Removes the item if qty <= 0.
 * @param {string} cartItemId
 * @param {number} qty
 */
export function updateCartQty(cartItemId, qty) {
  if (qty <= 0) {
    return removeFromCart(cartItemId);
  }
  const item = STATE.cart.find(item => item.cartItemId === cartItemId);
  if (item) {
    item.qty = qty;
    console.log('[action] updateCartQty:', item);
    return item;
  }
  console.warn('[action] updateCartQty: item not found', cartItemId);
  return null;
}

/**
 * Empty the entire cart.
 */
export function clearCart() {
  STATE.cart.length = 0;
  console.log('[action] clearCart');
}

// ============================================================
// ❤️ WISHLIST ACTIONS
// ============================================================

/**
 * Add a product to the wishlist.
 * @param {number} productId
 */
export function addToWishlist(productId) {
  STATE.wishlist.add(productId);
  console.log('[action] addToWishlist:', productId);
}

/**
 * Remove a product from the wishlist.
 * @param {number} productId
 */
export function removeFromWishlist(productId) {
  STATE.wishlist.delete(productId);
  console.log('[action] removeFromWishlist:', productId);
}

/**
 * Toggle a product's wishlist status.
 * @param {number} productId
 * @returns {boolean} true if now in wishlist, false if removed
 */
export function toggleWishlist(productId) {
  if (STATE.wishlist.has(productId)) {
    removeFromWishlist(productId);
    return false;
  }
  addToWishlist(productId);
  return true;
}

/**
 * Check whether a product is in the wishlist.
 * @param {number} productId
 * @returns {boolean}
 */
export function isInWishlist(productId) {
  return STATE.wishlist.has(productId);
}

// ============================================================
// 👤 ROLE & NAVIGATION ACTIONS
// ============================================================

/**
 * Switch the active user role.
 * @param {'customer'|'retailer'|'manufacturer'} role
 */
export function switchRole(role) {
  STATE.currentRole = role;
  console.log('[action] switchRole:', role);
}

/**
 * Navigate to a specific screen.
 * @param {string} screenId
 */
export function setCurrentScreen(screenId) {
  STATE.currentScreen = screenId;
  console.log('[action] setCurrentScreen:', screenId);
}

/**
 * Move to a specific onboarding step.
 * @param {number} step
 */
export function goStep(step) {
  STATE.OB.step = step;
  console.log('[action] goStep:', step);
}

// ============================================================
// 💰 ORDER ACTIONS
// ============================================================

/**
 * Place an order from the provided cart items.
 * Clears the cart after placing.
 * @param {Array<{ cartItemId: string, productId: number, qty: number }>} [cartItems]
 * @returns {{ orderId: string, items: Array, status: string, createdAt: string }}
 */
export function placeOrder(cartItems) {
  const items = cartItems ?? [...STATE.cart];
  const order = {
    orderId: `ORD-${Date.now()}`,
    items: items.map(item => ({ ...item })),
    status: 'placed',
    createdAt: new Date().toISOString(),
  };
  STATE.orders.push(order);
  clearCart();
  console.log('[action] placeOrder:', order);
  return order;
}

/**
 * Update the status of an existing order.
 * @param {string} orderId
 * @param {string} status
 */
export function updateOrderStatus(orderId, status) {
  const order = STATE.orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = status;
    console.log('[action] updateOrderStatus:', orderId, '->', status);
    return order;
  }
  console.warn('[action] updateOrderStatus: order not found', orderId);
  return null;
}

/**
 * Retailer: add a bulk order directly (without going through cart).
 * @param {number} productId
 * @param {number} quantity
 * @param {number|string} supplierId
 * @returns {{ orderId: string, productId: number, quantity: number, supplierId: number|string, status: string, createdAt: string }}
 */
export function addBulkOrder(productId, quantity, supplierId) {
  const order = {
    orderId: `BULK-${Date.now()}`,
    productId,
    quantity,
    supplierId,
    status: 'placed',
    createdAt: new Date().toISOString(),
  };
  STATE.orders.push(order);
  console.log('[action] addBulkOrder:', order);
  return order;
}

// ============================================================
// 🎛️ FILTER & SEARCH ACTIONS
// ============================================================

/**
 * Update a single filter value.
 * @param {'categories'|'price'|'sizes'|'rating'} filterType
 * @param {*} value
 */
export function updateFilter(filterType, value) {
  STATE.filters[filterType] = value;
  console.log('[action] updateFilter:', filterType, '=', value);
}

/**
 * Reset all filters to their default values.
 */
export function clearAllFilters() {
  STATE.filters.categories = [];
  STATE.filters.price = 10000;
  STATE.filters.sizes = [];
  STATE.filters.rating = 0;
  console.log('[action] clearAllFilters');
}

/**
 * Set the maximum price filter.
 * @param {number} price
 */
export function setPrice(price) {
  STATE.filters.price = price;
  console.log('[action] setPrice:', price);
}

/**
 * Toggle a size on/off in the sizes filter.
 * @param {string} size
 * @returns {boolean} true if size is now active, false if removed
 */
export function toggleSize(size) {
  const idx = STATE.filters.sizes.indexOf(size);
  if (idx !== -1) {
    STATE.filters.sizes.splice(idx, 1);
    console.log('[action] toggleSize OFF:', size);
    return false;
  }
  STATE.filters.sizes.push(size);
  console.log('[action] toggleSize ON:', size);
  return true;
}

// ============================================================
// 👥 ONBOARDING ACTIONS
// ============================================================

/**
 * Select a role during the onboarding flow.
 * @param {'retailer'|'manufacturer'} role
 */
export function obSelectRole(role) {
  STATE.OB.role = role;
  console.log('[action] obSelectRole:', role);
}

/**
 * Submit Step 1 (account info) of onboarding.
 * @param {{ email: string, [key: string]: * }} data
 */
export function obStep1Submit(data) {
  STATE.OB.email = data.email ?? STATE.OB.email;
  Object.assign(STATE.OB, data);
  STATE.OB.step = 2;
  console.log('[action] obStep1Submit:', data);
}

/**
 * Verify OTP entered during onboarding.
 * @param {string} otp
 * @returns {boolean} true if OTP is valid (mock: always true)
 */
export function obVerifyOtp(otp) {
  // Mock verification — replace with real check when backend is ready
  const isValid = otp.length === 6;
  if (isValid) {
    STATE.OB.step = 3;
  }
  console.log('[action] obVerifyOtp:', otp, '->', isValid ? 'valid' : 'invalid');
  return isValid;
}

/**
 * Submit Step 3 (business info) of onboarding.
 * @param {Object} data
 */
export function obStep3Submit(data) {
  Object.assign(STATE.OB, data);
  STATE.OB.step = 4;
  console.log('[action] obStep3Submit:', data);
}

/**
 * Confirm that required documents have been uploaded (Step 4).
 */
export function obStep4Submit() {
  STATE.OB.uploadedDocs = { gst: true, pan: true, bank: true };
  STATE.OB.step = 5;
  console.log('[action] obStep4Submit: docs confirmed');
}

/**
 * Select a subscription plan (Step 5).
 * @param {string} plan
 */
export function obStep5Submit(plan) {
  STATE.OB.selectedPlan = plan;
  STATE.OB.step = 6;
  console.log('[action] obStep5Submit:', plan);
}

/**
 * Admin: approve an onboarding application.
 * @param {number} appId
 */
export function obApproveApplication(appId) {
  const app = APPLICATIONS.find(a => a.id === appId);
  if (app) {
    app.status = 'approved';
    STATE.adminReviewTarget = null;
    console.log('[action] obApproveApplication:', appId);
    return app;
  }
  console.warn('[action] obApproveApplication: app not found', appId);
  return null;
}

/**
 * Admin: reject an onboarding application.
 * @param {number} appId
 */
export function obRejectApplication(appId) {
  const app = APPLICATIONS.find(a => a.id === appId);
  if (app) {
    app.status = 'rejected';
    STATE.adminReviewTarget = null;
    console.log('[action] obRejectApplication:', appId);
    return app;
  }
  console.warn('[action] obRejectApplication: app not found', appId);
  return null;
}

// ============================================================
// 🛒 BULK ORDER MODAL ACTIONS
// ============================================================

/**
 * Open the bulk order modal for a product.
 * @param {number} productId
 * @param {number|string|null} [supplierId=null]
 */
export function openBulkModal(productId, supplierId = null) {
  STATE.bulkOrder.selectedProductId = productId;
  STATE.bulkOrder.supplierId = supplierId;
  console.log('[action] openBulkModal:', productId, 'supplier:', supplierId);
}

/**
 * Update the quantity in the bulk order modal.
 * @param {number} qty
 */
export function updateBulkQty(qty) {
  STATE.bulkOrder.quantity = qty;
  console.log('[action] updateBulkQty:', qty);
}

/**
 * Confirm and place the bulk order from the modal.
 * Resets the modal state afterwards.
 * @returns {{ orderId: string, productId: number, quantity: number, status: string, createdAt: string }|null}
 */
export function confirmBulkOrder() {
  const { selectedProductId, quantity, supplierId } = STATE.bulkOrder;
  if (!selectedProductId) {
    console.warn('[action] confirmBulkOrder: no product selected');
    return null;
  }
  const order = addBulkOrder(selectedProductId, quantity, supplierId ?? null);
  // Reset modal state
  STATE.bulkOrder.selectedProductId = null;
  STATE.bulkOrder.quantity = 60;
  STATE.bulkOrder.supplierId = null;
  console.log('[action] confirmBulkOrder:', order);
  return order;
}

// ============================================================
// 📦 PRODUCT ACTIONS
// ============================================================

/**
 * Add a new product to the products list.
 * @param {{ name: string, price: string, cat: string, [key: string]: * }} product
 * @returns {{ id: number, [key: string]: * }}
 */
export function addProduct(product) {
  const newProduct = {
    ...product,
    id: _uid('prod'),
    rating: product.rating ?? 0,
    reviews: product.reviews ?? 0,
  };
  STATE.products.push(newProduct);
  console.log('[action] addProduct:', newProduct);
  return newProduct;
}

/**
 * Delete a product by id.
 * @param {number} productId
 * @returns {{ id: number, [key: string]: * }|null}
 */
export function deleteProduct(productId) {
  const idx = STATE.products.findIndex(p => p.id === productId);
  if (idx !== -1) {
    const removed = STATE.products.splice(idx, 1)[0];
    console.log('[action] deleteProduct:', removed);
    return removed;
  }
  console.warn('[action] deleteProduct: product not found', productId);
  return null;
}
