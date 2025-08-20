import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ children, onClose }) {
  const modalRoot = document.getElementById("cart-root");

  if (!modalRoot) {
    console.error("No element with id 'cart-root' found in index.html");
    return null;
  }

  return ReactDOM.createPortal(
    <>
      {/* Overlay (slightly transparent to see Home behind) */}
      {/* <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div> */}

      {/* Modal Content */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   bg-neutral-900 text-white rounded-xl shadow-lg z-50 
                   w-[90%] h-[90%] p-6 overflow-auto"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 
                     text-white rounded-full w-8 h-8 flex items-center justify-center 
                     text-lg font-bold"
          onClick={onClose}
          aria-label="Close Modal"
        >
          ✕
        </button>

        {children}
      </div>
    </>,
    modalRoot
  );
}
