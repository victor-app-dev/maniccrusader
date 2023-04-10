import React, { useState } from "react";
import { useProductContext } from "../Context/useProduct";
import Modal from "../Modal";
import "../Styles/StyleProductContainer.css";

export default function ProductContainer(p) {
  const prod = useProductContext();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  let mappedProducts = null;
  if (prod.products && prod.products.result) {
    mappedProducts = prod.products.result.map((product) => (
      <div className="ProductContainer" key={product.id} onClick={() => handleProductClick(product)}>
        <img alt="1" width={"100px"} src={product.thumbnail_url} />
        <h4>{product.name}</h4>
      </div>
    ));
  } else {
    mappedProducts = <p>Loading...</p>;
  }

  return (
    <>
      {mappedProducts}
      {selectedProduct && (
        <Modal selectedId={selectedProduct.id} onClose={() => setSelectedProduct(null)}/>
      )}
    </>
  );
}
