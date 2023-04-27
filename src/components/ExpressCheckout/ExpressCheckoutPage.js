import React from "react";
import { useExpressCheckoutContext } from "../Context/useExpressCheckout";
import ExpressCheckoutModal from "./ExpressCheckoutModal";

function ExpressCheckoutPage() {
  const express = useExpressCheckoutContext();
  // create an object with the items and their quantities
  const cartItems = express.expressBasket.reduce((acc, item) => {
    const itemId = item?.result?.id;
    if (acc[itemId]) {
      acc[itemId].quantity += 1;
    } else {
      acc[itemId] = { item, quantity: 1 };
    }
    return acc;
  }, {});
  return (
    <>
      {Object.values(cartItems).map(({ item, quantity }, index) => (
        <div key={index}>
          <img
            width="200px"
            src={item?.result?.files[1]?.preview_url}
            alt={item?.result?.name}
          />
          <h2>
            {item?.result?.name} ({quantity})
          </h2>
          <p>£{item?.result?.retail_price}</p>
          <button
            onClick={() => {
              express.setSelectedEditItem(item);
              express.setExpressEditQty(cartItems[item?.result?.id]?.quantity || 1);
            }}
            type="button"
          >
            Edit
          </button>
        </div>
      ))}
      {express.expressBasket.length > 0 && (
        <button type="button"> Checkout</button>
      )}
      {express.selectedEditItem && <ExpressCheckoutModal />}

      <div>Total: £{express.priceExclShippingExpress} Excluding shipping.</div>
    </>
  );
}

export default ExpressCheckoutPage;
