// js/state.js
// ============================================================
// GLOBAL STATE MANAGEMENT
// All data and state variables centralized here
// ============================================================

// Products Data
export const FASHION_PRODUCTS = [
  {
    id:1, name:'Banarasi Silk Saree', sub:'Zari Border · Royal Blue', cat:'Ethnic',
    price:'₹3,299', old:'₹5,999', disc:'-45%', badge:'bestseller',
    img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
    img2:'https://images.unsplash.com/photo-1583391733981-8498408ee4b6?w=600&q=80',
    rating:4.9, reviews:1284, seller:'Threads & Co.', bulk:'₹2,549/pc',
    sizes:['FS','5.5m','6m'], stock:6
  },
  {
    id:2, name:'Linen Blend Kurta', sub:'Men · Sage Green', cat:'Men',
    price:'₹1,499', old:'₹2,299', disc:'-35%', badge:'',
    img:'https://images.unsplash.com/photo-1594938298603-c8148c4b4b5c?w=600&q=80',
    img2:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    rating:4.6, reviews:842, seller:'FabriTex Co.', bulk:'₹899/pc',
    sizes:['S','M','L','XL'], stock:87
  },
  {
    id:3, name:'Anarkali Suit Set', sub:'Women · 3 piece', cat:'Women',
    price:'₹4,799', old:'₹7,999', disc:'-40%', badge:'trending',
    img:'https://images.unsplash.com/photo-1583391733981-8498408ee4b6?w=600&q=80',
    img2:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
    rating:4.8, reviews:620, seller:'Threads & Co.', bulk:'₹3,590/pc',
    sizes:['XS','S','M','L','XL'], stock:24
  },
  {
    id:4, name:'Embroidered Potli Bag', sub:'Bridal · Ivory Gold', cat:'Accessories',
    price:'₹899', old:'₹1,499', disc:'-40%', badge:'lowstock',
    img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    img2:'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
    rating:4.7, reviews:388, seller:'Artisan Collective', bulk:'₹549/pc',
    sizes:['One Size'], stock:4
  },
  {
    id:5, name:'Palazzo Pant Set', sub:'Women · Floral Print', cat:'Women',
    price:'₹1,899', old:'₹2,999', disc:'-37%', badge:'new',
    img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    img2:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    rating:4.5, reviews:210, seller:'FabriTex Co.', bulk:'₹1,199/pc',
    sizes:['S','M','L','XL','XXL'], stock:52
  },
  {
    id:6, name:'Khadi Cotton Kurta', sub:'Men · Handwoven', cat:'Ethnic',
    price:'₹1,299', old:'', disc:'', badge:'new',
    img:'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=600&q=80',
    img2:'https://images.unsplash.com/photo-1594938298603-c8148c4b4b5c?w=600&q=80',
    rating:4.7, reviews:512, seller:'Threads & Co.', bulk:'₹749/pc',
    sizes:['S','M','L','XL'], stock:200
  },
  {
    id:7, name:'Kolhapuri Chappals', sub:'Unisex · Handcrafted', cat:'Footwear',
    price:'₹699', old:'₹999', disc:'-30%', badge:'',
    img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    img2:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    rating:4.4, reviews:730, seller:'CraftFoot Co.', bulk:'₹449/pc',
    sizes:['6','7','8','9','10'], stock:65
  },
  {
    id:8, name:'Wireless Earbuds Pro', sub:'Electronics · 30hr', cat:'Electronics',
    price:'₹2,499', old:'₹4,999', disc:'-50%', badge:'bestseller',
    img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    img2:'https://images.unsplash.com/photo-1606741965509-717bf2be2e6e?w=600&q=80',
    rating:4.3, reviews:1840, seller:'TechCore Ind.', bulk:'₹1,599/pc',
    sizes:['One Size'], stock:120
  },
];

// Onboarding Applications Data
export const APPLICATIONS = [
  { id:1,  biz:'Mehra Fashion House',   contact:'Rahul Mehra',   email:'rahul@mehra.com',    role:'retailer',      gst:'09MFHE1234F1Z5', city:'Lucknow, UP',      applied:'Today, 2 hr ago',  docs:3, status:'review'   },
  { id:2,  biz:'Threads & Co. Mills',   contact:'Anil Gupta',    email:'anil@threads.co',    role:'manufacturer',  gst:'09TCML1234W1Z2', city:'Varanasi, UP',     applied:'Today, 4 hr ago',  docs:4, status:'approved' },
  { id:3,  biz:'Kumar Electronics',     contact:'Suresh Kumar',  email:'suresh@kumar.in',    role:'retailer',      gst:'27KMEL5678P1Z3', city:'Mumbai, MH',       applied:'Yesterday',        docs:3, status:'approved' },
  { id:4,  biz:'FabriTex Co.',          contact:'Priya Joshi',   email:'priya@fabritex.in',  role:'manufacturer',  gst:'08FBTX2345R1Z4', city:'Jaipur, RJ',       applied:'Yesterday',        docs:3, status:'approved' },
  { id:5,  biz:'Sharma Readymade',      contact:'Vikram Sharma', email:'vikram@sharma.in',   role:'retailer',      gst:'09SRME6789S1Z5', city:'Varanasi, UP',     applied:'2 days ago',       docs:2, status:'new'      },
  { id:6,  biz:'Khan Emporium',         contact:'Faiz Khan',     email:'faiz@khan.in',       role:'retailer',      gst:'09KHEM3456T1Z6', city:'Lucknow, UP',      applied:'2 days ago',       docs:3, status:'review'   },
  { id:7,  biz:'Artisan Collective',    contact:'Neha Singh',    email:'neha@artisan.in',    role:'manufacturer',  gst:'09ARTC4567U1Z7', city:'Lucknow, UP',      applied:'3 days ago',       docs:4, status:'approved' },
  { id:8,  biz:'Singh Retail Hub',      contact:'Amrit Singh',   email:'amrit@singh.in',     role:'retailer',      gst:'03SRTH5678V1Z8', city:'Chandigarh, PB',   applied:'3 days ago',       docs:1, status:'rejected' },
  { id:9,  biz:'Gupta Saree Centre',    contact:'Ravi Gupta',    email:'ravi@gupta.in',      role:'retailer',      gst:'09GSCP6789W1Z9', city:'Kanpur, UP',       applied:'4 days ago',       docs:3, status:'approved' },
  { id:10, biz:'LumiLight Mfg.',        contact:'Dev Sharma',    email:'dev@lumilight.in',   role:'manufacturer',  gst:'27LLMF7890X1Z1', city:'Pune, MH',         applied:'4 days ago',       docs:4, status:'approved' },
  { id:11, biz:'Patel Textiles',        contact:'Kavya Patel',   email:'kavya@patel.in',     role:'manufacturer',  gst:'24PTXT8901Y1Z2', city:'Surat, GJ',        applied:'5 days ago',       docs:3, status:'approved' },
  { id:12, biz:'Rajesh Stores',         contact:'Rajesh Verma',  email:'rajesh@stores.in',   role:'retailer',      gst:'09RJST9012Z1Z3', city:'Agra, UP',         applied:'5 days ago',       docs:2, status:'review'   },
  { id:13, biz:'Mehta Distributor',     contact:'Paresh Mehta',  email:'paresh@mehta.in',    role:'retailer',      gst:'24MHDT0123A2Z4', city:'Ahmedabad, GJ',    applied:'6 days ago',       docs:3, status:'approved' },
  { id:14, biz:'CraftFoot Co.',         contact:'Sunita Rao',    email:'sunita@craftfoot.in',role:'manufacturer',  gst:'29CRFT1234B2Z5', city:'Kolhapur, MH',     applied:'6 days ago',       docs:3, status:'approved' },
  { id:15, biz:'Varma Traders',         contact:'Rohit Varma',   email:'rohit@varma.in',     role:'retailer',      gst:'09VMTR2345C2Z6', city:'Gorakhpur, UP',    applied:'7 days ago',       docs:2, status:'new'      },
  { id:16, biz:'Neon Fabrics',          contact:'Anjali Mishra', email:'anjali@neon.in',     role:'manufacturer',  gst:'09NFBR3456D2Z7', city:'Meerut, UP',       applied:'7 days ago',       docs:3, status:'review'   },
  { id:17, biz:'Star Fashion Hub',      contact:'Imran Sheikh',  email:'imran@star.in',      role:'retailer',      gst:'27SFHB4567E2Z8', city:'Pune, MH',         applied:'8 days ago',       docs:3, status:'approved' },
  { id:18, biz:'TechCore Ind.',         contact:'Arjun Nair',    email:'arjun@techcore.in',  role:'manufacturer',  gst:'27TCOR5678F2Z9', city:'Pune, MH',         applied:'8 days ago',       docs:4, status:'approved' },
  { id:19, biz:'Lotus Boutique',        contact:'Divya Kapoor',  email:'divya@lotus.in',     role:'retailer',      gst:'07LTBT6789G2Z1', city:'Delhi, DL',        applied:'9 days ago',       docs:2, status:'rejected' },
  { id:20, biz:'Regal Textiles',        contact:'Harish Tiwari', email:'harish@regal.in',    role:'manufacturer',  gst:'09RGTX7890H2Z2', city:'Banaras, UP',      applied:'9 days ago',       docs:3, status:'approved' },
  { id:21, biz:'Prime Retail Co.',      contact:'Sanjay Dubey',  email:'sanjay@prime.in',    role:'retailer',      gst:'09PRTL8901I2Z3', city:'Allahabad, UP',    applied:'10 days ago',      docs:1, status:'new'      },
  { id:22, biz:'Golden Threads Mfg',    contact:'Meera Agarwal', email:'meera@golden.in',    role:'manufacturer',  gst:'09GDTH9012J2Z4', city:'Varanasi, UP',     applied:'10 days ago',      docs:4, status:'approved' },
  { id:23, biz:'Sunrise Fashion',       contact:'Aakash Chandra',email:'aakash@sunrise.in',  role:'retailer',      gst:'09SNRS0123K2Z5', city:'Kanpur, UP',       applied:'11 days ago',      docs:3, status:'approved' },
  { id:24, biz:'Heritage Looms',        contact:'Lalita Devi',   email:'lalita@heritage.in', role:'manufacturer',  gst:'09HRTS1234L2Z6', city:'Varanasi, UP',     applied:'11 days ago',      docs:4, status:'rejected' },
];

// ============================================================
// MUTABLE STATE (to be updated by actions.js)
// ============================================================

export const STATE = {
  // Current role/view
  currentRole: 'customer', // 'customer' | 'retailer' | 'manufacturer'
  currentScreen: 'c-home',

  // Customer state
  wishlist: new Set([1, 3]),
  cart: 3,
  qty: 1,
  saleSeconds: 7 * 3600 + 42 * 60 + 18,

  // Onboarding state
  OB: {
    role: 'retailer',
    step: 1,
    email: '',
    selectedPlan: 'starter',
    uploadedDocs: { gst: false, pan: false, bank: false },
    otpTimer: null,
    reviewTarget: null,
  },

  // Filter state
  filters: {
    categories: ["Women's Fashion", "Men's Fashion", 'Ethnic Wear'],
    price: 4000,
    sizes: ['XS'],
    rating: 5,
  },

  // Bulk order state
  bulkOrder: {
    selectedProductId: null,
    quantity: 60,
  },

  // Admin state
  adminReviewTarget: null,
};

// ============================================================
// GETTERS (read-only access to state)
// ============================================================

export function getState() {
  return STATE;
}

export function getCurrentRole() {
  return STATE.currentRole;
}

export function getCurrentScreen() {
  return STATE.currentScreen;
}

export function getWishlist() {
  return STATE.wishlist;
}

export function getCart() {
  return STATE.cart;
}

export function getOBState() {
  return STATE.OB;
}

export function getFilters() {
  return STATE.filters;
}

export function getProduct(id) {
  return FASHION_PRODUCTS.find(p => p.id === id);
}

export function getApplication(id) {
  return APPLICATIONS.find(a => a.id === id);
}

export function getApplicationsByStatus(status) {
  return APPLICATIONS.filter(a => a.status === status);
}

export function getApplicationCountByStatus(status) {
  return APPLICATIONS.filter(a => a.status === status).length;
}
