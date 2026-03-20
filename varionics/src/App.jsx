import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Search from './pages/Search'
import AddProduct from './pages/manufacturer/AddProduct'
import MyProducts from './pages/manufacturer/MyProducts'
import MyShop from './pages/retailer/MyShop'
import BulkOrders from './pages/retailer/BulkOrders'

export default function App() {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#F7F8FA] relative">
      <Navbar />
      <main className="pt-16 pb-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/manufacturer/add-product" element={<AddProduct />} />
          <Route path="/manufacturer/products" element={<MyProducts />} />
          <Route path="/retailer/shop" element={<MyShop />} />
          <Route path="/retailer/bulk-orders" element={<BulkOrders />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
