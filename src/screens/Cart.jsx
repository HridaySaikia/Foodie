import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { loadRazorpay } from "../utils/loadRazorpay"; // <-- add this import at top

export default function Cart({ onClose }) {
  const data = useCart() || [];
  const dispatch = useDispatchCart();

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full text-center text-2xl font-semibold text-gray-400">
        The Cart is Empty!
      </div>
    );
  }

  // FIXED: price already includes qty
  const totalPrice = data.reduce((total, food) => total + food.price, 0);


  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("User not logged in!");
      return;
    }

    // ✅ Prepare cart items
    const validatedData = data.map((item) => ({
      name: String(item.name),
      qty: Number(item.qty),
      size: String(item.size || ""),
      price: Number(item.price),
      img: String(item.img || "")
    }));

    // ✅ Step 1: Load Razorpay script
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Check internet connection.");
      return;
    }

    try {
      // ✅ Step 2: Create order from backend
      const orderRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice })
      });

      const { order } = await orderRes.json();

      if (!order) {
        alert("Failed to create Razorpay order");
        return;
      }

      // ✅ Step 3: Open Razorpay Checkout
      const options = {
        key: "rzp_test_R7EZJFloSc6RNZ", // 🔑 Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Foodie App",
        description: "Food Order Payment",
        order_id: order.id,
        handler: async function (response) {
          // ✅ Step 4: Save order in DB after payment success
          const payload = {
            email: userEmail,
            order_data: [
              {
                order_date: new Date().toDateString(),
                items: validatedData,
                total: totalPrice,
                payment_id: response.razorpay_payment_id
              }
            ],
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          };

          const saveRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orderData`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          const saveJson = await saveRes.json();

          if (saveJson.success) {
            alert("✅ Payment Successful & Order Placed!");
            dispatch({ type: "DROP" });
            if (onClose) onClose();
          } else {
            alert("Payment done but order save failed!");
          }
        },
        prefill: {
          email: userEmail
        },
        theme: {
          color: "#22c55e"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong while processing payment: " + error.message);
    }
  };


  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <table className="min-w-full border border-gray-700 bg-neutral-800 rounded-lg text-white">
          <thead>
            <tr className="bg-green-700 text-lg">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Option</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={`${food.id || food.name}-${index}`} className="border-t border-gray-600 hover:bg-neutral-700 transition">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{food.name}</td>
                <td className="py-3 px-4">{food.qty}</td>
                <td className="py-3 px-4">{food.size}</td>
                <td className="py-3 px-4">₹{food.price}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => dispatch({ type: "REMOVE", id: food.id, size: food.size })}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove item from cart"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700 pt-4">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">
          Total: <span className="text-green-400">₹{totalPrice}/-</span>
        </h1>
        <button
          onClick={handleCheckOut}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
          disabled={data.length === 0}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}
