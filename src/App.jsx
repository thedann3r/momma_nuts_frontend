import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"
import './App.css'
import Authorization from "./authorization/Authorization"
import SignupForm from "./authorization/Signup"
import LoginForm from "./authorization/Login"
import AProduct from "./productAdmin/AProduct"
import UProduct from "./productUser/UProduct"

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/admin-products" element={<AProduct />} />
        <Route path="/user-products" element={<UProduct />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App