import React, { createContext, useContext, useEffect, useState } from "react";

export const ExpressCheckoutContext = createContext(undefined);

export const ExpressCheckoutContextProvider = ({ context, children }) => {
    const [variant_id, setVariant_id] = useState(null);
    const [expressBasket, setExpressBasket] = useState([]);
    const [expressEditQty, setExpressEditQty] = useState(1);
    const [selectedEditItem, setSelectedEditItem] = useState(null)
    const [priceExclShippingExpress, setPriceExclShippingExpress] = useState(null);

    useEffect(() => {
        if (variant_id) {
          const quantity = expressEditQty ? parseInt(expressEditQty) : 1;
          const newBasket = [...expressBasket]; // create a copy of the current basket array
          for (let i = 0; i < quantity; i++) {
            newBasket.push(variant_id); // add the variant_id to the new basket array
          }
          setExpressBasket(newBasket); // set the new basket array as the updated basket state
          setVariant_id(null);
          setExpressEditQty("")
        }
      }, [variant_id, expressEditQty, expressBasket]);
      function removeFromBasket(id) {
        setExpressBasket(expressBasket.filter(item => item.result.id !== id));
      }
      useEffect(() => {
        const sum = expressBasket.reduce((acc, item) => {
          const retailPrice = parseFloat(item.result.retail_price);
          return acc + retailPrice;
        }, 0);
        setPriceExclShippingExpress(sum.toFixed(2));
      }, [expressBasket]);


  let contextData = {
    setVariant_id:setVariant_id,
    variant_id:variant_id,
    expressBasket:expressBasket,
    setExpressBasket:setExpressBasket,
    expressEditQty:expressEditQty,
    setExpressEditQty: setExpressEditQty,
    setSelectedEditItem: setSelectedEditItem,
    selectedEditItem:selectedEditItem,
    removeFromBasket:removeFromBasket,
    priceExclShippingExpress: priceExclShippingExpress,
    ...context,
  };

  return (
    <ExpressCheckoutContext.Provider value={contextData}>
      {children}
    </ExpressCheckoutContext.Provider>
  );
};

// Define the useExpressCheckoutContext hook
export const useExpressCheckoutContext = () => useContext(ExpressCheckoutContext);
