import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Foodie</h1>
          <p className="text-sm">
            Satisfy your cravings anytime, anywhere. Order fresh, fast & delicious meals at your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>



        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <ul className="space-y-2">
            <li><a href="https://www.instagram.com/hriday__saikia/" className="hover:text-white">Instagram</a></li>
            <li><a href="https://x.com/HSaikia38499" className="hover:text-white">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Foodie. All rights reserved. Developed by <a href="https://portfolio-full-new.vercel.app/" target="_blank">Hridayananda Saikia</a>
      </div>
    </footer>
  )
}

export default Footer
