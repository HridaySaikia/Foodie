import React, { useEffect, useState, useRef } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

const Card = ({ foodItem = {}, options = {} }) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Half"); // Default to "Half"
  const [showFullDesc, setShowFullDesc] = useState(false); // For read more

  const priceOptions = Object.keys(options);

  // Set size to first option if not valid
  useEffect(() => {
    if (priceOptions.length > 0 && !priceOptions.includes(size)) {
      setSize(priceOptions.includes("Half") ? "Half" : priceOptions[0]);
    }
  }, [priceOptions, size]);

  const finalPrice = qty * Number(options[size] || 0);

  const handleAddToCart = () => {
    if (!foodItem._id) return; 
    dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name || "Unknown",
      qty: Number(qty),
      size: size,
      price: finalPrice,
      img: foodItem.img || ""
    });
  };

  return (
    <div className="max-w-sm bg-[#1E1E1E] text-[#F1F1F1] rounded-lg shadow-md overflow-hidden m-3">
      <img
        className="w-full h-48 object-cover"
        src={foodItem.img || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={foodItem.name || "Food Item"}
      />
      <div className="p-4">
        <h5 className="text-xl font-semibold mb-2">{foodItem.name || "Unknown Food"}</h5>
        
        <p
          className={`text-[#F1F1F1] mb-2 transition-all duration-300 ${
            !showFullDesc ? "line-clamp-2 overflow-hidden" : ""
          }`}
        >
          {foodItem.description || "No description available."}
        </p>

        {foodItem.description && foodItem.description.length > 65 && (
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-blue-400 text-sm font-semibold hover:underline mb-2"
          >
            {showFullDesc ? "Read Less" : "Read More"}
          </button>
        )}
        {foodItem.description.length < 70 && (
          <br/>
        )}

        <div className="flex items-center justify-around mb-2">
          <select
            className='m-2 bg-[#FF6B6B] text-black px-4 py-2 rounded hover:bg-[#FFCC70] transition'
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {Array.from(Array(6), (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select
            className='m-2 bg-[#FF6B6B] text-black px-4 py-2 rounded hover:bg-[#FFCC70] transition'
            ref={priceRef}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.length > 0 ? (
              priceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))
            ) : (
              <option value="">N/A</option>
            )}
          </select>

          <div className="ml-2 font-bold">₹{finalPrice}/-</div>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-green-500 text-black py-2 rounded hover:bg-[#FFCC70] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
