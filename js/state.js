// js/state.js
// ============================================================
// GLOBAL STATE MANAGEMENT
// Single source of truth for all app state
// ============================================================

// ============================================================
// 📦 PRODUCT DATA
// ============================================================

export const PRODUCTS = [
  {
    id: 1,
    name: 'Floral Midi Dress',
    sub: 'Summer Collection · Women',
    cat: 'Dresses',
    seller: 'FloraWear Mfg.',
    img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
    price: '₹2,499',
    old: '₹4,999',
    disc: '50% OFF',
    bulk: '₹1,200/pc',
    rating: 4.8,
    reviews: 1204,
    stock: 23,
    badge: 'bestseller',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Oversized Linen Shirt',
    sub: 'Casual Wear · Unisex',
    cat: 'Tops',
    seller: 'LinenCraft Co.',
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    price: '₹1,299',
    old: '₹2,199',
    disc: '41% OFF',
    bulk: '₹650/pc',
    rating: 4.5,
    reviews: 876,
    stock: 67,
    badge: 'trending',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 3,
    name: 'High-Waist Palazzo',
    sub: 'Ethnic Fusion · Women',
    cat: 'Bottoms',
    seller: 'EthnicWave Mfg.',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop',
    price: '₹999',
    old: '₹1,799',
    disc: '44% OFF',
    bulk: '₹490/pc',
    rating: 4.3,
    reviews: 543,
    stock: 8,
    badge: 'lowstock',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Denim Jacket',
    sub: 'Street Style · Unisex',
    cat: 'Outerwear',
    seller: 'DenimCo Mfg.',
    img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop',
    price: '₹3,299',
    old: '₹5,499',
    disc: '40% OFF',
    bulk: '₹1,650/pc',
    rating: 4.7,
    reviews: 2103,
    stock: 45,
    badge: 'new',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 5,
    name: 'Embroidered Kurti',
    sub: 'Festive Collection · Women',
    cat: 'Ethnic',
    seller: 'KurtiKraft Mfg.',
    img: 'https://images.unsplash.com/photo-1614258235355-fa16f6c52c97?w=400&h=500&fit=crop',
    price: '₹1,599',
    old: '₹2,999',
    disc: '47% OFF',
    bulk: '₹799/pc',
    rating: 4.6,
    reviews: 987,
    stock: 112,
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 6,
    name: 'Slim Fit Chinos',
    sub: 'Formal Casual · Men',
    cat: 'Bottoms',
    seller: 'SlimLine Apparel',
    img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
    price: '₹1,899',
    old: '₹3,299',
    disc: '42% OFF',
    bulk: '₹950/pc',
    rating: 4.4,
    reviews: 654,
    stock: 34,
    badge: null,
    sizes: ['28', '30', '32', '34', '36', '38'],
  },
  {
    id: 7,
    name: 'Crop Top Set',
    sub: 'Co-ord Set · Women',
    cat: 'Sets',
    seller: 'TrendSet Mfg.',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop',
    price: '₹2,199',
    old: '₹3,999',
    disc: '45% OFF',
    bulk: '₹1,099/pc',
    rating: 4.9,
    reviews: 3201,
    stock: 5,
    badge: 'lowstock',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 8,
    name: 'Wool Blend Blazer',
    sub: 'Office Wear · Women',
    cat: 'Outerwear',
    seller: 'WoolMaster Co.',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
    price: '₹4,499',
    old: '₹7,999',
    disc: '44% OFF',
    bulk: '₹2,249/pc',
    rating: 4.6,
    reviews: 421,
    stock: 89,
    badge: 'trending',
    sizes: ['S', 'M', 'L', 'XL'],
  },
]

// ============================================================
// 🌐 GLOBAL STATE
// ============================================================

export const STATE = {
  // Current user role
  role: 'customer', // 'customer' | 'retailer' | 'manufacturer'

  // Cart
  cart: {
    items: [],       // [{ productId, qty, size }]
    total: 0,
  },

  // Wishlist
  wishlist: [],      // [productId, ...]

  // Orders
  orders: [],        // [{ id, items, status, createdAt }]

  // Active filters
  filters: {
    categories: [],  // ['Dresses', 'Tops', ...]
    price: null,     // max price string e.g. '5000'
    sizes: [],       // ['S', 'M', 'L', ...]
    rating: 0,       // min rating
  },

  // UI state
  currentScreen: 'home',
  saleEndTime: Date.now() + 2 * 60 * 60 * 1000, // 2 hours from now
}

// ============================================================
// 🔧 STATE HELPERS
// ============================================================

/**
 * Get a product by ID from PRODUCTS array
 * @param {number} productId - Product ID
 * @returns {object|undefined} Product or undefined
 */
export function getProduct(productId) {
  return PRODUCTS.find(p => p.id === productId)
}
