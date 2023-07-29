import React,{} from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentButton() {
    const PayPal_ID = process.env.REACT_APP_PayPal_CLIENT_ID
  return (
    <>
      <PayPalScriptProvider options={{ "client-id": PayPal_ID }}>
        <PayPalButtons/>
      </PayPalScriptProvider>
    </>
  );
}
