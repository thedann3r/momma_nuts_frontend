import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"
import './App.css'
import Authorization from "./authorization/Authorization"
import SignupForm from "./authorization/Signup"
import LoginForm from "./authorization/Login"
import AProduct from "./productAdmin/AProduct"
import UProduct from "./productUser/UProduct"
import Orders from "./orders/Orders"
import OrderItems from "./orders/OrderItems"
import Payment from "./payments/Payments"
import CartPage from "./cart/Cart"
import Mpesa from "./mpesa/Mpesa"
import Profile from "./profile/Profile"
import Logout from "./authorization/Logout"
import ResetPassword from "./authorization/ResetPassword"
import ForgotPassword from "./authorization/ForgotPassword"

import MainLayout from "./MainLayout"
  
function App(){
  return(
    <Router>
      <Routes>
         {/* No navbar */}
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* With navbar */}
        <Route path="/admin-products" element={<MainLayout><AProduct /></MainLayout>} />
        <Route path="/user-products" element={<MainLayout><UProduct /></MainLayout>} />
        <Route path="/orders" element={<MainLayout><Orders /></MainLayout>} />
        <Route path="/order-items/:orderId" element={<MainLayout><OrderItems /></MainLayout>} />
        <Route path="/payments" element={<MainLayout><Payment /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
        <Route path="/mpesa" element={<MainLayout><Mpesa /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/logout" element={<MainLayout><Logout /></MainLayout>} />
      </Routes>
    </Router>
  )
}

export default App