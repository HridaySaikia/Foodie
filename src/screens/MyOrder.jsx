import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) return;

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/myOrderData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      const safeData = Array.isArray(data.orderData)
        ? data.orderData.map(order => ({
            order_date: order.order_date || "Unknown",
            items: Array.isArray(order.items) ? order.items : []
          }))
        : [];

      setOrderData(safeData);
    } catch (error) {
      console.error("❌ Fetch orders error:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">My Orders</h1>

        {orderData.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No orders found</p>
        ) : (
          orderData.slice(0).reverse().map((order, idx) => (
            <div
              key={idx}
              className="mb-8 bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-4 text-center text-yellow-300">
                Order Date: {order.order_date}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(order.items || []).map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-transform duration-300"
                  >
                    <img
                      src={item.img || "https://placehold.co/300x200"}
                      alt={item.name || "Item"}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-yellow-400">{item.name || "Unnamed Item"}</h3>
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Qty: {item.qty ?? "N/A"}</span>
                        <span>Size: {item.size || "N/A"}</span>
                      </div>
                      <p className="font-bold mt-3 text-right text-green-400">₹{item.price ?? 0}/-</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}
