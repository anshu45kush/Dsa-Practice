import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

const MOCK_PRODUCTS = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    price: 2499,
    bulkPrice: 1800,
    moq: 50,
    description: 'High-fidelity audio with 30hr battery life. Active noise cancellation built-in.',
    seller: 'AudioTech Mfg.',
    sellerRole: 'manufacturer',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 234,
  },
  {
    id: '2',
    title: 'Minimalist Watch',
    price: 3999,
    bulkPrice: 2800,
    moq: 20,
    description: 'Swiss movement, sapphire crystal glass. Water resistant up to 50m.',
    seller: 'TimeWorks Co.',
    sellerRole: 'manufacturer',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 512,
  },
  {
    id: '3',
    title: 'Portable Bluetooth Speaker',
    price: 1299,
    bulkPrice: 900,
    moq: 100,
    description: '360° surround sound, IPX7 waterproof, 12hr playtime.',
    seller: 'SoundWave Ltd.',
    sellerRole: 'manufacturer',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 189,
  },
  {
    id: '4',
    title: 'Organic Cotton T-Shirt',
    price: 599,
    bulkPrice: 350,
    moq: 200,
    description: '100% GOTS certified organic cotton. Available in 12 colors.',
    seller: 'EcoWear Mfg.',
    sellerRole: 'manufacturer',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 876,
  },
  {
    id: '5',
    title: 'Stainless Steel Water Bottle',
    price: 799,
    bulkPrice: 500,
    moq: 150,
    description: 'Double-wall vacuum insulated. Keeps drinks cold 24hrs, hot 12hrs.',
    seller: 'HydroLife Mfg.',
    sellerRole: 'manufacturer',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 1023,
  },
  {
    id: '6',
    title: 'Running Shoes',
    price: 4999,
    bulkPrice: 3500,
    moq: 30,
    description: 'Responsive cushioning with breathable knit upper. Carbon fiber plate.',
    seller: 'SpeedRun Athletics',
    sellerRole: 'manufacturer',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 432,
  },
  {
    id: '7',
    title: 'Smart LED Desk Lamp',
    price: 1899,
    bulkPrice: 1300,
    moq: 75,
    description: 'Adjustable color temp 2700K-6500K, USB-C charging port built-in.',
    seller: 'LumaTech Mfg.',
    sellerRole: 'manufacturer',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    rating: 4.2,
    reviews: 167,
  },
  {
    id: '8',
    title: 'Leather Crossbody Bag',
    price: 2299,
    bulkPrice: 1600,
    moq: 40,
    description: 'Full-grain leather, multiple compartments, magnetic closure.',
    seller: 'LeatherCraft Co.',
    sellerRole: 'manufacturer',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 298,
  },
]

const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    productId: '1',
    product: MOCK_PRODUCTS[0],
    quantity: 2,
    total: 4998,
    status: 'Delivered',
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    productId: '3',
    product: MOCK_PRODUCTS[2],
    quantity: 1,
    total: 1299,
    status: 'Placed',
    date: '2024-01-20',
  },
  {
    id: 'ORD-003',
    productId: '4',
    product: MOCK_PRODUCTS[3],
    quantity: 3,
    total: 1797,
    status: 'Accepted',
    date: '2024-01-22',
  },
]

export function AppProvider({ children }) {
  const [role, setRole] = useState('customer')
  const [user] = useState({ name: 'Rajesh Kumar', email: 'rajesh@example.com' })
  const [products, setProducts] = useState(MOCK_PRODUCTS)
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [shopProducts, setShopProducts] = useState([])
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      rating: 0,
      reviews: 0,
      sellerRole: 'manufacturer',
      seller: user.name,
    }
    setProducts(prev => [newProduct, ...prev])
  }

  const addToShop = (product, retailPrice) => {
    setShopProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) return prev
      return [...prev, { ...product, retailPrice: retailPrice || product.price, originalPrice: product.bulkPrice }]
    })
  }

  const updateShopPrice = (productId, newPrice) => {
    setShopProducts(prev => prev.map(p => p.id === productId ? { ...p, retailPrice: newPrice } : p))
  }

  const placeOrder = (product, quantity = 1) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      productId: product.id,
      product,
      quantity,
      total: product.price * quantity,
      status: 'Placed',
      date: new Date().toISOString().split('T')[0],
    }
    setOrders(prev => [newOrder, ...prev])
  }

  const value = {
    role, setRole,
    user,
    products, addProduct,
    orders, placeOrder,
    shopProducts, addToShop, updateShopPrice,
    cart, setCart,
    searchQuery, setSearchQuery,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
