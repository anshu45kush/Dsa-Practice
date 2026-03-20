import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import ProductDetail from './pages/ProductDetail'
import CustomerHome from './pages/customer/CustomerHome'
import CustomerOrders from './pages/customer/Orders'
import CustomerProfile from './pages/customer/Profile'
import CustomerSearch from './pages/customer/Search'
import RetailerDashboard from './pages/retailer/RetailerDashboard'
import RetailerProducts from './pages/retailer/Products'
import MyShop from './pages/retailer/MyShop'
import BulkOrders from './pages/retailer/BulkOrders'
import ManufacturerDashboard from './pages/manufacturer/ManufacturerDashboard'
import MyProducts from './pages/manufacturer/MyProducts'
import AddProduct from './pages/manufacturer/AddProduct'
import ManufacturerOrders from './pages/manufacturer/Orders'
import { useApp } from './context/AppContext'

function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerHome />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/search" element={<CustomerSearch />} />
      <Route path="/orders" element={<CustomerOrders />} />
      <Route path="/profile" element={<CustomerProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function RetailerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RetailerDashboard />} />
      <Route path="/products" element={<RetailerProducts />} />
      <Route path="/orders" element={<BulkOrders />} />
      <Route path="/shop" element={<MyShop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<CustomerProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function ManufacturerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ManufacturerDashboard />} />
      <Route path="/products" element={<MyProducts />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/orders" element={<ManufacturerOrders />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<CustomerProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const { role } = useApp()

  const renderRoutes = () => {
    if (role === 'retailer') return <RetailerRoutes />
    if (role === 'manufacturer') return <ManufacturerRoutes />
    return <CustomerRoutes />
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#F7F8FA] relative">
      <Navbar />
      <main className="pt-16 pb-20 min-h-screen">
        {renderRoutes()}
      </main>
      <BottomNav role={role} />
    </div>
  )
}
