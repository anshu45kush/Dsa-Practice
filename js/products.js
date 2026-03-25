// js/products.js
// ============================================================
// PRODUCT LOGIC & RENDERING
// Handles product data, filtering, and card generation
// ============================================================
// 📝 NOTE: onclick handlers are still inline in HTML
// TODO (Step 5): Move these to event listeners in ui.js
// For now: Make sure these are available globally in main.js:
//   - toggleWishBtn()
//   - addToCartBtn()
//   - toggleSizeDot()
//   - openBulkModal()
//   - showScreen()
// ============================================================

import { PRODUCTS, STATE } from './state.js'
import { isInWishlist, toggleWishlist, addToCart } from './actions.js'

// ============================================================
// 🔍 PRODUCT LOOKUP & FILTERING
// ============================================================

/**
 * Get product by ID
 * @param {number} productId - Product ID
 * @returns {object|undefined} Product object or undefined
 */
export function getProductById(productId) {
  return PRODUCTS.find(p => p.id === productId)
}

/**
 * Filter products by criteria
 * @param {array} products - Products to filter
 * @param {object} filters - Filter object {categories, price, sizes, rating}
 * @returns {array} Filtered products
 */
export function filterProducts(products, filters = {}) {
  let filtered = [...products]

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(p => filters.categories.includes(p.cat))
  }

  if (filters.price) {
    const priceNum = parseInt(filters.price) || 10000
    filtered = filtered.filter(p => {
      const price = parseInt(p.price.replace(/[₹,]/g, ''))
      return price <= priceNum
    })
  }

  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter(p =>
      p.sizes.some(s => filters.sizes.includes(s))
    )
  }

  if (filters.rating && filters.rating > 0) {
    filtered = filtered.filter(p => p.rating >= filters.rating)
  }

  return filtered
}

/**
 * Search products by name or category
 * @param {array} products - Products to search
 * @param {string} query - Search query
 * @returns {array} Matching products
 */
export function searchProducts(products, query = '') {
  if (!query.trim()) return products

  const q = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.sub.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q) ||
    p.seller.toLowerCase().includes(q)
  )
}

/**
 * Get products with applied filters and search
 * @param {string} searchQuery - Search term
 * @returns {array} Filtered and searched products
 */
export function getFilteredProducts(searchQuery = '') {
  const searched = searchProducts(PRODUCTS, searchQuery)
  return filterProducts(searched, STATE.filters)
}

// ============================================================
// 💎 BADGE LOGIC
// ============================================================

/**
 * Get badge HTML for product
 * @param {object} product - Product object
 * @returns {string} Badge HTML or empty string
 */
export function getBadge(product) {
  if (!product) return ''

  if (product.badge === 'bestseller') {
    return `<span class="product-badge-bs">🏆 Best Seller</span>`
  }
  if (product.badge === 'lowstock') {
    return `<span class="product-badge-low">⚡ Only ${product.stock} left</span>`
  }
  if (product.badge === 'trending') {
    return `<span class="product-badge-tr">🔥 Trending</span>`
  }
  if (product.badge === 'new') {
    return `<span class="product-new">NEW</span>`
  }
  if (product.disc) {
    return `<span class="product-discount">${product.disc}</span>`
  }

  return ''
}

// ============================================================
// 📦 STOCK METER LOGIC
// ============================================================

/**
 * Get stock meter HTML
 * @param {object} product - Product object
 * @returns {string} Stock meter HTML
 */
export function getStockMeter(product) {
  if (!product) return ''

  const pct = Math.min(100, Math.round((product.stock / 200) * 100))

  let color = 'var(--c-sage)'
  let label = `${product.stock} in stock`

  if (product.stock <= 10) {
    color = 'var(--c-rose)'
    label = `⚡ Only ${product.stock} left — hurry!`
  } else if (product.stock <= 40) {
    color = 'var(--c-gold)'
    label = `${product.stock} in stock`
  }

  return `
    <div class="stock-meter">
      <div style="font-size:10px;color:${color};font-weight:600;margin-bottom:3px">
        ${label}
      </div>
      <div class="stock-bar">
        <div class="stock-fill" style="width:${pct}%;background:${color}"></div>
      </div>
    </div>
  `
}

/**
 * Get stock status
 * @param {object} product - Product object
 * @returns {object} Stock info
 */
export function getStockInfo(product) {
  return {
    available: product.stock > 0,
    lowStock: product.stock <= 10,
    mediumStock: product.stock > 10 && product.stock <= 40,
    abundantStock: product.stock > 40,
    count: product.stock,
  }
}

// ============================================================
// 💰 PRICE LOGIC
// ============================================================

/**
 * Get price HTML (regular + old + savings)
 * @param {object} product - Product object
 * @param {boolean} isBulk - Show bulk price instead?
 * @returns {string} Price HTML
 */
export function getProductPrice(product, isBulk = false) {
  if (!product) return ''

  if (isBulk) {
    return `<span class="product-price">${product.bulk}</span>`
  }

  let html = `<span class="product-price">${product.price}</span>`

  if (product.old) {
    html += `<span class="product-price-old">${product.old}</span>`
  }
  if (product.disc) {
    html += `<span class="product-saving">${product.disc}</span>`
  }

  return html
}

/**
 * Calculate discount percentage
 * @param {object} product - Product object
 * @returns {number} Discount % or 0
 */
export function getDiscountPercent(product) {
  if (!product.old || !product.price) return 0

  const old = parseInt(product.old.replace(/[₹,]/g, ''))
  const current = parseInt(product.price.replace(/[₹,]/g, ''))

  if (old === 0) return 0
  return Math.round(((old - current) / old) * 100)
}

// ============================================================
// 🎨 PRODUCT CARD RENDERING
// ============================================================

/**
 * Build a single product card HTML
 * @param {object} product - Product object
 * @param {boolean} isBulk - Is this for bulk ordering?
 * @returns {string} Product card HTML
 */
export function buildProductCard(product, isBulk = false) {
  if (!product) return ''

  const badgeHtml = getBadge(product)
  const stockMeterHtml = !isBulk ? getStockMeter(product) : ''
  const priceHtml = getProductPrice(product, isBulk)
  const isWishlisted = isInWishlist(product.id)

  const sizesHtml = !isBulk
    ? product.sizes.slice(0, 4).map((s, i) =>
        `<div class="size-dot${i === 0 ? ' sel' : ''}" onclick="event.stopPropagation();toggleSizeDot(this)">${s}</div>`
      ).join('') +
      (product.sizes.length > 4 ? `<div class="size-dot">+${product.sizes.length - 4}</div>` : '')
    : ''

  const bulkActionHtml = isBulk
    ? `<button class="btn btn-dark btn-sm" onclick="event.stopPropagation();openBulkModal(${product.id})">Bulk Order</button>`
    : `
        <div class="product-hover-actions">
          <button class="phb phb-cart" onclick="event.stopPropagation();addToCartBtn(${product.id}, this)">🛍 Add to Bag</button>
          <button class="phb phb-view" onclick="event.stopPropagation();showScreen('c-product')">👁 Quick View</button>
        </div>
      `

  const wishlistBtnHtml = !isBulk
    ? `<button class="product-wish${isWishlisted ? ' active' : ''}" onclick="event.stopPropagation();toggleWishBtn(${product.id}, this)">♡</button>`
    : ''

  const hoverLayerHtml = !isBulk
    ? `<div class="product-img-hover-layer"></div>`
    : ''

  return `
    <div class="product-card" onclick="${isBulk ? `openBulkModal(${product.id})` : `showScreen('c-product')`}">
      <div class="product-img" style="background:#F0EAE4">
        <img
          src="${product.img}"
          alt="${product.name}"
          class="product-real-img"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
          loading="lazy"
        >
        <div class="product-img-fallback" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;font-size:64px">👗</div>
        ${hoverLayerHtml}
        ${badgeHtml}
        ${wishlistBtnHtml}
        ${bulkActionHtml}
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-meta">${product.sub}</div>
        <div class="flex items-center gap-4 mb-8">
          <span class="stars" style="font-size:11px">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span style="font-size:11px;color:var(--text3)">${product.rating} (${product.reviews.toLocaleString()})</span>
        </div>
        <div class="flex items-center justify-between mb-6">
          <div>${priceHtml}</div>
        </div>
        ${!isBulk ? `
          <div class="product-sizes">${sizesHtml}</div>
          ${stockMeterHtml}
        ` : `
          <div style="font-size:11px;color:var(--c-sage);margin-top:8px">📦 ${product.seller} · Verified Manufacturer</div>
        `}
      </div>
    </div>
  `
}

/**
 * Render products into a container
 * @param {string} containerId - Container element ID
 * @param {array} items - Product items
 * @param {boolean} isBulk - Is this for bulk ordering?
 */
export function renderProducts(containerId, items = [], isBulk = false) {
  const container = document.getElementById(containerId)

  if (!container) {
    console.warn(`⚠️ Container ${containerId} not found`)
    return
  }

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛍</div>
        <div class="empty-title">No products found</div>
        <div class="empty-sub">Try adjusting your filters or search</div>
      </div>
    `
    return
  }

  container.innerHTML = items.map(product => buildProductCard(product, isBulk)).join('')
  console.log(`📦 Rendered ${items.length} products to ${containerId}`)
}

// ============================================================
// 🔄 PRODUCT CARD INTERACTIONS
// ============================================================

/**
 * Toggle wishlist on button click
 * @param {number} productId - Product ID
 * @param {Element} btn - Button element
 */
export function toggleWishBtn(productId, btn) {
  const result = toggleWishlist(productId)

  if (btn) {
    btn.classList.toggle('active', result.isWishlisted)
    btn.classList.add('heart-pop')
    setTimeout(() => btn.classList.remove('heart-pop'), 400)
  }
}

/**
 * Add to cart from product card
 * @param {number} productId - Product ID
 * @param {Element} btn - Button element
 */
export function addToCartBtn(productId, btn) {
  const result = addToCart(productId, 1)

  if (btn && result.success) {
    const orig = btn.textContent
    btn.textContent = '✓ Added!'
    btn.style.background = 'var(--c-sage)'
    btn.style.color = '#fff'

    setTimeout(() => {
      btn.textContent = orig
      btn.style.background = '#fff'
      btn.style.color = 'var(--accent)'
    }, 1600)
  }
}

/**
 * Toggle size selection on product card
 * @param {Element} el - Size dot element
 */
export function toggleSizeDot(el) {
  const container = el.closest('.product-sizes')
  if (!container) return

  container.querySelectorAll('.size-dot').forEach(d => d.classList.remove('sel'))
  el.classList.add('sel')
}

// ============================================================
// 📊 BULK PRICING CALCULATIONS
// ============================================================

/**
 * Get bulk price tier for quantity
 * @param {number} quantity - Order quantity
 * @returns {object} Pricing tier
 */
export function getBulkTier(quantity) {
  if (quantity <= 10) {
    return { minQty: 1, maxQty: 10, unitPrice: 5999, savings: 0, tier: 1 }
  }
  if (quantity <= 50) {
    return { minQty: 11, maxQty: 50, unitPrice: 3999, savings: 2000, tier: 2 }
  }
  if (quantity <= 200) {
    return { minQty: 51, maxQty: 200, unitPrice: 2549, savings: 3450, tier: 3 }
  }
  return { minQty: 201, maxQty: Infinity, unitPrice: 2100, savings: 3899, tier: 4 }
}

/**
 * Calculate bulk order total
 * @param {number} quantity - Order quantity
 * @param {number} unitPrice - Price per unit
 * @returns {object} Calculation result
 */
export function calculateBulkTotal(quantity, unitPrice) {
  const total = quantity * unitPrice
  const mrp = quantity * 5999
  const savings = mrp - total

  return {
    quantity,
    unitPrice,
    total,
    savings,
    savingsPerUnit: Math.round(savings / quantity),
  }
}

// ============================================================
// 📈 PRODUCT ANALYTICS HELPERS
// ============================================================

/**
 * Get products grouped by category
 * @param {array} products - Products to group
 * @returns {object} Products grouped by category
 */
export function groupByCategory(products) {
  return products.reduce((acc, product) => {
    acc[product.cat] = acc[product.cat] || []
    acc[product.cat].push(product)
    return acc
  }, {})
}

/**
 * Get top products sorted by review count
 * @param {array} products - Products to sort
 * @param {number} limit - Number to return
 * @returns {array} Top products
 */
export function getTopProducts(products, limit = 10) {
  return [...products]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit)
}

/**
 * Get products marked as new
 * @param {array} products
 * @returns {array}
 */
export function getNewProducts(products) {
  return products.filter(p => p.badge === 'new')
}

/**
 * Get trending products
 * @param {array} products
 * @returns {array}
 */
export function getTrendingProducts(products) {
  return products.filter(p => p.badge === 'trending')
}

/**
 * Get products currently on sale
 * @param {array} products
 * @returns {array}
 */
export function getSaleProducts(products) {
  return products.filter(p => p.disc && parseInt(p.disc.replace(/\D/g, '')) > 0)
}

/**
 * Get low stock products
 * @param {array} products
 * @param {number} threshold - Stock level threshold
 * @returns {array}
 */
export function getLowStockProducts(products, threshold = 20) {
  return products.filter(p => p.stock <= threshold && p.stock > 0)
}
