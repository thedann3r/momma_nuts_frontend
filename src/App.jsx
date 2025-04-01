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

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/admin-products" element={<AProduct />} />
        <Route path="/user-products" element={<UProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-items/:orderId" element={<OrderItems />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/mpesa" element={<Mpesa />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App