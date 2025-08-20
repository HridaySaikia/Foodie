import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: ''
  });
  const [loading, setLoading] = useState(false);

  // ✅ Use environment variable for backend URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, password, geolocation } = credentials;

      const res = await fetch(`${API_BASE_URL}/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, location: geolocation })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Account created successfully!");
        navigate("/login");
      } else {
        alert("❌ Signup failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-gray-100 p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Your Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="geolocation" className="block mb-1 font-semibold">Address</label>
          <input
            type="text"
            id="geolocation"
            name="geolocation"
            value={credentials.geolocation}
            onChange={handleChange}
            placeholder="Your Address"
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

