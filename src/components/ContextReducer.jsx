import React, { createContext, useContext, useReducer } from "react";

// Create Contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Check if item with same id & size exists
      const existingIndex = state.findIndex(
        (item) => item.id === action.id && item.size === action.size
      );

      if (existingIndex >= 0) {
        const updatedState = [...state];
        const existingItem = updatedState[existingIndex];
        const unitPrice = action.price / action.qty; // price per 1 item
        const newQty = existingItem.qty + action.qty;

        updatedState[existingIndex] = {
          ...existingItem,
          qty: newQty,
          price: unitPrice * newQty,
        };

        return updatedState;
      } else {
        return [
          ...state,
          {
            id: action.id,
            name: action.name,
            qty: action.qty,
            size: action.size,
            price: action.price,
            img: action.img,
          },
        ];
      }

    case "REMOVE":
      // Remove by id + size combination
      return state.filter(
        (item) => !(item.id === action.id && item.size === action.size)
      );

    case "UPDATE_QTY":
      return state.map((item) => {
        if (item.id === action.id && item.size === action.size) {
          const unitPrice = item.price / item.qty; // price per unit
          return {
            ...item,
            qty: action.qty,
            price: unitPrice * action.qty,
          };
        }
        return item;
      });

    case "DROP":
      return [];

    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;

// Custom hooks
export const useCart = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useDispatchCart = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useDispatchCart must be used within a CartProvider");
  }
  return context;
};
