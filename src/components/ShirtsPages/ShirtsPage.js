import React from "react";
import ProductContainer from "../Product/ProductContainer";
import { ProductContextProvider } from "../Context/useProduct";
function ShirtsPage() {
  return (
    <>
      <ProductContextProvider fetchType="tshirts">
        <ProductContainer />
      </ProductContextProvider>
    </>
  );
}

export default ShirtsPage;
