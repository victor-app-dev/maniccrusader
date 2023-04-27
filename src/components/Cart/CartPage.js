import React from "react";
import { useCartContext } from "../Context/useCart";
import CartItemModal from "./CartItemModal";

function CartPage() {
  const cart = useCartContext();
  const removeItem = (id) => {
    cart.removeFromBasket(id);
  };

  // create an object with the items and their quantities
  const cartItems = cart.addedToBasket.reduce((acc, item) => {
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
      <button onClick={cart.clearBasket} type="button">
        Remove All
      </button>
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
          <button type="button" onClick={() => removeItem(item.result.id)}>
            Remove
          </button>
          <button
            onClick={() => {
              cart.setSelectedEditItem(item);
              cart.setEditQty(cartItems[item?.result?.id]?.quantity || 1);
            }}
            type="button"
          >
            Edit
          </button>
        </div>
      ))}
      {cart.addedToBasket.length > 0 && (
        <button type="button"> Checkout</button>
      )}
      {cart.selectedEditItem && <CartItemModal />}
      <div>Total: £{cart.priceExclShipping} Excluding shipping.</div>
    </>
  );
}

export default CartPage;
