import React, { createContext, useContext, useEffect, useState } from "react";
export const useProduct = () => {
  const context = useProductContext();
  return context;
};

export const ProductContext = createContext(undefined);

export const ProductContextProvider = ({ context, children, fetchType }) => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    async function getProducts() {
      try {
        let url;
        switch (fetchType) {
          case "tshirts":
            url = "https://maniccrusader-preprod-api.onrender.com/api/products-tshirts/";
            break;
          case "hoodies":
            url = "https://maniccrusader-preprod-api.onrender.com/api/products-hoodies/";
            break;
          case "hats":
            url = "https://maniccrusader-preprod-api.onrender.com/api/products-hats/";
            break;
          default:
            url = "https://maniccrusader-preprod-api.onrender.com/api/products/";
        }
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, [fetchType]);

  let mappedProducts = null;
  if (products && products.result) {
    mappedProducts = products.result.map((x) => (
      <div key={x.id}>
        <img alt="1" width={"100px"} src={x.thumbnail_url} />
        <h4>{x.name}</h4>
        <p>£HOLDER_PRICE</p>
      </div>
    ));
  }

  let contextData = {
    products: products,
    mappedProducts: mappedProducts,
    ...context,
  };
  return (
    <ProductContext.Provider value={contextData}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
