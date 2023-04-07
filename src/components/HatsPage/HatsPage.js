import React from "react";
import ProductContainer from "../Product/ProductContainer";
import { ProductContextProvider } from "../Context/useProduct";
function HatsPage() {
  return (
    <>
      <ProductContextProvider fetchType="hats">
        <ProductContainer />
      </ProductContextProvider>
    </>
  );
}

export default HatsPage;
