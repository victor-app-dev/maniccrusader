import React from "react";
import { CheckoutContextProvider } from "../Context/useCheckout";
import { CartContextProvider } from "../Context/useCart";
import CheckoutSystem from "./CheckoutSystem";

function CheckoutPageN() {
  return (
    <>
      <CartContextProvider>
        <CheckoutContextProvider>
          <CheckoutSystem />
        </CheckoutContextProvider>
      </CartContextProvider>
    </>
  );
}

export default CheckoutPageN;
