import React, { } from "react";
import ProductContainer from "../Product/ProductContainer";
import { ProductContextProvider } from "../Context/useProduct";


function LandingPage() {

  return (
<>  
          <ProductContextProvider fetchType="">
            <ProductContainer />
          </ProductContextProvider>
      landing page for website, needs wireframe, will show content, i.e. hot
      items, new drops, news? etc.
    </>
  );
}

export default LandingPage;
