import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define Redux action types
const ADD_TO_BASKET = "ADD_TO_BASKET";
const CLEAR_BASKET = "CLEAR_BASKET";
const REMOVE_FROM_BASKET = "REMOVE_FROM_BASKET";

// Define a Redux reducer function
function cartReducer(state = { addedToBasket: [] }, action) {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        addedToBasket: [...state.addedToBasket, action.payload],
      };
    case CLEAR_BASKET:
      return {
        ...state,
        addedToBasket: [],
      };
      case REMOVE_FROM_BASKET:
        return {
          ...state,
          addedToBasket: state.addedToBasket.filter(
            (item) => item.result.id !== action.payload
          ),
        };
    default:
      return state;
  }
}

const store = createStore(
    cartReducer,
    JSON.parse(localStorage.getItem("cartState")) || undefined
  );
  
  // Subscribe to the Redux store to save state changes to localStorage
  store.subscribe(() => {
    localStorage.setItem("cartState", JSON.stringify(store.getState()));
  });
  
  export default store;

// Define Redux action creators
const addToBasket = (variant_id) => {
  return {
    type: ADD_TO_BASKET,
    payload: variant_id,
  };
};

const clearBasket = () => {
  return {
    type: CLEAR_BASKET,
  };
};
const removeFromBasket = (id) => {
  return {
    type: REMOVE_FROM_BASKET,
    payload: id,
  };
};


// Create a custom hook that provides access to the Redux store and action creators
export const useCart = () => {
  const dispatch = useDispatch();
  const addedToBasket = useSelector((state) => state.addedToBasket);
  const addToBasketHandler = (variant_id, qty) => dispatch(addToBasket(variant_id));
  const clearBasketHandler = () => dispatch(clearBasket());
  const removeFromBasketHandler = (id) => dispatch(removeFromBasket(id));

  return {
    addedToBasket,
    addToBasket: addToBasketHandler,
    clearBasket: clearBasketHandler,
    removeFromBasket: removeFromBasketHandler,
  };
};

// Define the CartContext and CartContextProvider
export const CartContext = createContext(undefined);

export const CartContextProvider = ({ context, children}) => {
  const { addedToBasket, addToBasket, clearBasket, removeFromBasket } = useCart();

  const [variant_id, setVariant_id] = useState(null);
  const [priceExclShipping, setPriceExclShipping] = useState(null);
  const [selectedEditItem, setSelectedEditItem] = useState(null)
  const [editQty, setEditQty] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (variant_id) {
      const quantity = editQty ? parseInt(editQty) : 1; // default to 1 if qty is null, 0, "", or undefined
      for (let i = 0; i < quantity; i++) {
        addToBasket(variant_id);
      }
      setVariant_id(null);
      setEditQty("");
    }
    //eslint-disable-next-line
  }, [variant_id, editQty]);
  useEffect(() => {
    const sum = addedToBasket.reduce((acc, item) => {
      const retailPrice = parseInt(item.result.retail_price);
      return acc + retailPrice;
    }, 0);
    setPriceExclShipping(sum);
  }, [addedToBasket]);
  

  let contextData = {
    variant_id: variant_id,
    setVariant_id: setVariant_id,
    addedToBasket: addedToBasket,
    clearBasket: clearBasket,
    removeFromBasket: removeFromBasket,
    setSelectedEditItem: setSelectedEditItem,
    selectedEditItem:selectedEditItem,
    API_URL:API_URL,
    editQty:editQty,
    setEditQty:setEditQty,
    priceExclShipping : priceExclShipping,
    ...context,
  };

  return (
    <CartContext.Provider value={contextData}>
      {children}
    </CartContext.Provider>
  );
};

// Define the useCartContext hook
export const useCartContext = () => useContext(CartContext);
