import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './screens/Home'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './screens/Login'
import Signup from './screens/Signup'
import CartProvider from './components/ContextReducer'
import Cart from './screens/Cart'
import MyOrder from './screens/MyOrder'
import AdminLogin from './screens/AdminLogin'
import AdminDashboard from './screens/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AboutUs from './screens/AboutUs'
import ContactUs from './screens/ContactUs'

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <div style={{ position: "fixed", bottom: 10, right: 10, background: "black", color: "white", padding: "6px 10px", borderRadius: 8, zIndex: 9999 }}>
          </div>

          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myOrder' element={<MyOrder />} />
            <Route exact path='/about' element={<AboutUs />} />
            <Route exact path='/contact' element={<ContactUs />} />

            {/* Admin Routes */}
            <Route exact path='/admin' element={<Navigate to="/admin/login" replace />} />
            <Route exact path='/admin/login' element={<AdminLogin />} />
            <Route
              exact
              path='/admin/dashboard'
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
