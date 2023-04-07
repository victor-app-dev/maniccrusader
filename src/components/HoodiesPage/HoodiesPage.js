import React from "react";
import ProductContainer from "../Product/ProductContainer";
import { ProductContextProvider } from "../Context/useProduct";
function HoodiesPage() {
  return (
    <>
      <ProductContextProvider fetchType="hoodies">
        <ProductContainer />
      </ProductContextProvider>
    </>
  );
}

export default HoodiesPage;
