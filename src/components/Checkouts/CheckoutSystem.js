import React,{} from "react";
import DeliveryForm from "./DeliveryForm/DeliveryForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import CheckoutInfo from "./CheckoutInfo/CheckoutInfo";
import { useCheckout } from "../Context/useCheckout";


function CheckoutSystem() {
  const check = useCheckout();
  return (
    <>
        <CheckoutInfo />
        <DeliveryForm />
        { check.formSubmitted &&
        <PaymentForm />
        }

    </>
  );
}

export default CheckoutSystem;