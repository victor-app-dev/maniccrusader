import React,{} from "react"
import { useCheckout } from "../../Context/useCheckout"
import { useCartContext } from "../../Context/useCart";

const CheckoutInfo = () => {
    const check = useCheckout();
    const cart = useCartContext();
    return(
        <>
        <div>
            <h4>Checkout Information</h4>
            <p>Item subtotal:{"s"}</p>
            <p>Cart Price:£{cart.priceExclShipping}</p>
            <p>Delivery Fee:{"s"}</p>
        </div>
        </>
    )
}

export default CheckoutInfo