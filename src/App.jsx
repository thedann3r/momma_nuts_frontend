import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"
import './App.css'
import Authorization from "./authorization/Authorization"
import SignupForm from "./authorization/Signup"
import LoginForm from "./authorization/Login"

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App