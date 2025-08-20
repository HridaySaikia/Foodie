import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/ContextReducer';
import Modal from '../screens/Modal';
import Cart from '../screens/Cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [cartView, setCartView] = useState(false); // Modal toggle
  const navigate = useNavigate();
  const data = useCart();
  
  // Check both tokens for consistency
  const authToken = localStorage.getItem("authToken");
  const userEmail = localStorage.getItem("userEmail");
  const isLoggedIn = authToken && userEmail;

  const handleLogout = () => {
    // Clear both tokens
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-slate-300 text-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="inline-block text-3xl font-serif italic tracking-wide no-underline text-orange-500 font-bold transition-transform duration-300 hover:scale-110 hover:text-orange-400 transform-gpu"
              >
                🍽 Foodie
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="p-2 rounded-md hover:bg-gray-500 transition"
              >
                <svg
                  className="w-6 h-6 text-orange-500 hover:text-orange-600 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                to="/"
                className="inline-block px-3 py-2 no-underline text-gray-800 font-medium transition-all duration-200 transform-gpu hover:scale-105 hover:text-orange-500"
              >
                Home
              </Link>

              {isLoggedIn && (
                <Link
                  to="/myOrder"
                  className="inline-block px-3 py-2 no-underline text-gray-800 font-medium transition-all duration-200 transform-gpu hover:scale-105 hover:text-orange-500"
                >
                  My Orders
                </Link>
              )}

              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="inline-block px-3 py-2 no-underline text-gray-800 font-medium transition-all duration-200 transform-gpu hover:scale-105 hover:text-orange-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/createuser"
                    className="inline-block px-3 py-2 no-underline text-gray-800 font-medium transition-all duration-200 transform-gpu hover:scale-105 hover:text-orange-500"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCartView(true)}
                    className="relative inline-block px-3 py-2 no-underline text-gray-800 font-medium transition-all duration-200 transform-gpu hover:scale-105 hover:text-orange-500"
                  >
                    My Cart
                    {data.length > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {data.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-block px-3 py-2 no-underline text-gray-800 font-medium transition-all duration-200 transform-gpu hover:scale-105 hover:text-orange-500"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 bg-gray-400">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-800 font-medium hover:text-orange-500 transition-all duration-200 transform-gpu"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {isLoggedIn && (
                <Link
                  to="/myOrder"
                  className="block px-3 py-2 text-gray-800 font-medium hover:text-orange-500 transition-all duration-200 transform-gpu"
                  onClick={() => setIsOpen(false)}
                >
                  My Orders
                </Link>
              )}

              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-800 font-medium hover:text-orange-500 transition-all duration-200 transform-gpu"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/createuser"
                    className="block px-3 py-2 text-gray-800 font-medium hover:text-orange-500 transition-all duration-200 transform-gpu"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setCartView(true);
                      setIsOpen(false);
                    }}
                    className="relative block px-3 py-2 text-gray-800 font-medium hover:text-orange-500 transition-all duration-200 transform-gpu text-left w-full"
                  >
                    My Cart
                    {data.length > 0 && (
                      <span className="absolute top-1 left-20 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {data.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block px-3 py-2 text-gray-800 font-medium hover:text-orange-500 transition-all duration-200 transform-gpu text-left w-full"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Modal - Fixed: Added onClose prop */}
      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart onClose={() => setCartView(false)} />
        </Modal>
      )}
    </>
  );
};

export default Navbar;