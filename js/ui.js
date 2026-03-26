// js/ui.js
// ============================================================
// UI EVENT LISTENERS & DOM INTERACTIONS
// Replaces all inline onclick handlers with event delegation
// ============================================================

import { STATE } from './state.js'
import { setFilters, resetFilters, toggleCategoryFilter, setRole, getCartCount } from './actions.js'
import { renderProducts, getFilteredProducts, toggleWishBtn, addToCartBtn, toggleSizeDot, getProductById } from './products.js'
import { placeOrder, getOrders } from './orders.js'

// ============================================================
// 🍞 TOAST NOTIFICATIONS
// ============================================================

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - 'success' | 'error' | 'info'
 * @param {number} duration - Duration in ms
 */
export function showToast(message, type = 'success', duration = 2500) {
  const existing = document.getElementById('toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.id = 'toast'
  toast.className = `toast toast-${type}`
  toast.textContent = message
  document.body.appendChild(toast)

  requestAnimationFrame(() => toast.classList.add('toast-show'))

  setTimeout(() => {
    toast.classList.remove('toast-show')
    setTimeout(() => toast.remove(), 300)
  }, duration)
}

// ============================================================
// 🖥️ SCREEN NAVIGATION
// ============================================================

/**
 * Switch the visible screen
 * @param {string} screenId - Screen element ID to show
 */
export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  const target = document.getElementById(screenId)
  if (target) {
    target.classList.add('active')
    STATE.currentScreen = screenId
  }
}

// ============================================================
// 🛒 CART UI
// ============================================================

/**
 * Update the cart badge count in the navbar
 */
export function updateCartBadge() {
  const badge = document.getElementById('cart-badge')
  const count = getCartCount()
  if (badge) {
    badge.textContent = count
    badge.style.display = count > 0 ? 'flex' : 'none'
  }
}

/**
 * Handle checkout button click
 */
function handleCheckout() {
  const result = placeOrder()
  if (result.success) {
    showToast(`✅ Order ${result.orderId} placed!`, 'success')
    updateCartBadge()
    renderCartItems()
    showScreen('c-orders')
  } else {
    showToast(result.message, 'error')
  }
}

/**
 * Re-render cart item list
 */
export function renderCartItems() {
  const container = document.getElementById('cart-items')
  if (!container) return

  if (STATE.cart.items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛍</div>
        <div class="empty-title">Your bag is empty</div>
        <div class="empty-sub">Add items to get started</div>
      </div>
    `
    return
  }

  container.innerHTML = STATE.cart.items.map(item => {
    const product = getProductById(item.productId)
    if (!product) return ''

    return `
      <div class="cart-item" data-product-id="${item.productId}">
        <img src="${product.img}" alt="${product.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          ${item.size ? `<div class="cart-item-size">Size: ${item.size}</div>` : ''}
          <div class="cart-item-price">${product.price}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn qty-dec" data-id="${item.productId}" data-size="${item.size || ''}">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn qty-inc" data-id="${item.productId}" data-size="${item.size || ''}">+</button>
        </div>
      </div>
    `
  }).join('')
}

// ============================================================
// 🔍 SEARCH & FILTER UI
// ============================================================

/**
 * Handle search input
 * @param {string} query - Search query
 */
function handleSearch(query) {
  const results = getFilteredProducts(query)
  renderProducts('product-grid', results)
}

/**
 * Handle filter form submit
 * @param {Event} e - Form submit event
 */
function handleFilterSubmit(e) {
  e.preventDefault()
  const form = e.target
  const price = form.querySelector('[name="price"]')?.value || null
  const rating = parseFloat(form.querySelector('[name="rating"]')?.value || '0')

  setFilters({ price, rating })
  const results = getFilteredProducts()
  renderProducts('product-grid', results)
  showToast('Filters applied', 'info')
}

/**
 * Handle filter reset
 */
function handleFilterReset() {
  resetFilters()
  renderProducts('product-grid', getFilteredProducts())
  showToast('Filters cleared', 'info')
}

// ============================================================
// 👤 ROLE SWITCHER UI
// ============================================================

/**
 * Handle role switch
 * @param {string} role - New role
 */
function handleRoleSwitch(role) {
  setRole(role)
  document.querySelectorAll('[data-role-tab]').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.roleTab === role)
  })
  showToast(`Switched to ${role} mode`, 'info')
}

// ============================================================
// ⏱️ SALE COUNTDOWN TIMER
// ============================================================

/**
 * Start the sale countdown timer
 */
export function startCountdown() {
  const el = document.getElementById('sale-timer')
  if (!el) return

  function tick() {
    const diff = STATE.saleEndTime - Date.now()
    if (diff <= 0) {
      el.textContent = 'Sale ended'
      return
    }

    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)

    el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    setTimeout(tick, 1000)
  }

  tick()
}

// ============================================================
// 🎯 EVENT DELEGATION SETUP
// ============================================================

/**
 * Attach all event listeners via delegation
 */
export function initEventListeners() {
  // Debounce timer for search input
  let debounceTimer

  // Global click delegation
  document.addEventListener('click', (e) => {
    const target = e.target

    // Cart badge / cart open
    if (target.closest('[data-action="open-cart"]')) {
      showScreen('c-cart')
      renderCartItems()
      return
    }

    // Checkout
    if (target.closest('[data-action="checkout"]')) {
      handleCheckout()
      return
    }

    // Role switch tabs
    const roleTab = target.closest('[data-role-tab]')
    if (roleTab) {
      handleRoleSwitch(roleTab.dataset.roleTab)
      return
    }

    // Category filter chips
    const catChip = target.closest('[data-cat]')
    if (catChip) {
      toggleCategoryFilter(catChip.dataset.cat)
      catChip.classList.toggle('active')
      renderProducts('product-grid', getFilteredProducts())
      return
    }

    // Filter reset button
    if (target.closest('[data-action="reset-filters"]')) {
      handleFilterReset()
      return
    }

    // Screen navigation
    const screenLink = target.closest('[data-screen]')
    if (screenLink) {
      showScreen(screenLink.dataset.screen)
      return
    }
  })

  // Search input
  const searchInput = document.getElementById('search-input')
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => handleSearch(e.target.value), 300)
    })
  }

  // Filter form
  const filterForm = document.getElementById('filter-form')
  if (filterForm) {
    filterForm.addEventListener('submit', handleFilterSubmit)
  }
}

// ============================================================
// 🌐 EXPOSE GLOBALS (for inline onclick handlers until Step 5)
// ============================================================

/**
 * Expose module functions to global scope for compatibility
 */
export function exposeGlobals(modules) {
  window.showScreen = showScreen
  window.showToast = showToast
  window.toggleWishBtn = toggleWishBtn
  window.addToCartBtn = addToCartBtn
  window.toggleSizeDot = toggleSizeDot
  if (modules) {
    window.__varionicsModules = modules
  }
}
