// js/main.js
// ============================================================
// APP INITIALIZATION & ORCHESTRATION
// Entry point — wires all modules together
// ============================================================

import { PRODUCTS, STATE } from './state.js'
import { renderProducts, getFilteredProducts, getProductById } from './products.js'
import { initEventListeners, startCountdown, exposeGlobals, updateCartBadge } from './ui.js'
import { getOrders } from './orders.js'

// ============================================================
// 🚀 INITIALIZATION
// ============================================================

/**
 * Bootstrap the application
 */
function init() {
  console.log('🛍 Varionics — starting app...')

  // Expose globals for inline onclick compatibility
  exposeGlobals({ getProductById, getOrders, STATE })

  // Render initial product grid
  renderProducts('product-grid', PRODUCTS)

  // Render bulk product grid (if present)
  renderProducts('bulk-grid', PRODUCTS, true)

  // Start sale countdown timer
  startCountdown()

  // Attach all event listeners
  initEventListeners()

  // Update cart badge
  updateCartBadge()

  console.log(`✅ App ready — ${PRODUCTS.length} products loaded`)
}

// ============================================================
// ▶️ ENTRY POINT
// ============================================================

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
