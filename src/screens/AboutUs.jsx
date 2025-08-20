import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUtensils, FaShippingFast, FaSmile } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">About Foodie</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            At Foodie, we believe in delivering fresh, delicious, and high-quality meals straight to your doorstep. 
            Our mission is to make every meal a delightful experience.
          </p>
        </div>

        {/* Features / Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-16">
          <div className="bg-gray-800 p-8 rounded-lg shadow hover:shadow-xl transition">
            <FaUtensils className="text-yellow-400 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Fresh & Tasty</h2>
            <p className="text-gray-300">We prepare meals using fresh ingredients and authentic recipes to ensure taste in every bite.</p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg shadow hover:shadow-xl transition">
            <FaShippingFast className="text-yellow-400 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Fast Delivery</h2>
            <p className="text-gray-300">Get your food delivered quickly and safely, right to your doorsteps.</p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg shadow hover:shadow-xl transition">
            <FaSmile className="text-yellow-400 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Customer Happiness</h2>
            <p className="text-gray-300">We prioritize your satisfaction with every order, because happy customers are our top priority.</p>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Our Story</h2>
          <p className="text-gray-300 mb-6">
            Foodie started with a simple idea: to make ordering food online an enjoyable and hassle-free experience.
            Over the years, we’ve grown into a trusted platform that connects people with their favorite meals. 
            From quick snacks to full meals, we ensure quality, taste, and speed.
          </p>
          <p className="text-gray-300">
            Want to learn more about us? Check our <a href="/contact" className="text-yellow-400 underline hover:text-yellow-300">Contact page</a> or explore our <a href="/" className="text-yellow-400 underline hover:text-yellow-300">Home page</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
