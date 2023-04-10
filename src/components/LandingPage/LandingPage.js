import React from "react";
import ProductContainer from "../Product/ProductContainer";
import { ProductContextProvider } from "../Context/useProduct";

function LandingPage() {
  return (
    <>
      <ProductContextProvider fetchType="">
        <ProductContainer />
      </ProductContextProvider>
    </>
  );
}

export default LandingPage;
