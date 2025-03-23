import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"
import './App.css'
import Authorization from "./authorization/Authorization"
import SignupForm from "./authorization/Signup"
import LoginForm from "./authorization/Login"
import AProduct from "./productAdmin/AProduct"

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/admin-products" element={<AProduct />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App