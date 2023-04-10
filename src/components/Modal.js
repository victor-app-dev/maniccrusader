import React, { useEffect, useState } from "react";
import "./Styles/StyleModal.css";

export default function Modal(props) {
  const [productDetails, setProductsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}products-details/${props.selectedId}/`)
      .then((response) => response.json())
      .then((data) => {
        setProductsDetails(data);
        setLoading(false)
      })
      .catch((error) => console.error(error));
  }, [props.selectedId, API_URL]);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  let colorOptions = [];
  let sizeOptions = [];

  const handleVariantChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
  
    if (name === "color") {
      setSelectedColor(value);
    } else if (name === "size") {
      setSelectedSize(value);
    }
  };
  
  useEffect(() => {
    if (productDetails) {
      let selectedVariant = null;
      if (selectedColor && selectedSize) {
        selectedVariant = productDetails.result.sync_variants.find(
          (variant) =>
            variant.name.includes(selectedColor) && variant.name.includes(selectedSize)
        );
      } else if (selectedColor) {
        selectedVariant = productDetails.result.sync_variants.find(
          (variant) => variant.name.includes(selectedColor)
        );
      } else if (selectedSize) {
        selectedVariant = productDetails.result.sync_variants.find(
          (variant) => variant.name.includes(selectedSize)
        );
      }
      if (!selectedVariant) {
        selectedVariant = productDetails.result.sync_variants[0];
        setSelectedColor("");
        setSelectedSize("");
      }
      setSelectedVariantId(selectedVariant.id);
    }
  }, [productDetails, selectedColor, selectedSize]);

  productDetails?.result?.sync_variants?.forEach((variant) => {
    const variantName = variant.name;
    const color = variantName.split(" - ")[1]?.split(" / ")[0];
    const size = variantName.split(" - ")[1]?.split(" / ")[1];
    if (!colorOptions.includes(color)) colorOptions.push(color);
    if (!sizeOptions.includes(size)) sizeOptions.push(size);
  });

  // Automatically select the variant id if there is only one option available
  useEffect(() => {
    if (productDetails && productDetails.result.sync_variants.length === 1) {
      setSelectedVariantId(productDetails.result.sync_variants[0].id);
    }
  }, [productDetails]);
  productDetails && console.log("Variant List: ",productDetails.result.sync_variants)
  productDetails && console.log("Selected variant: ",selectedVariantId)
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={props.onClose}>
          &times;
        </button>
        {loading && <p>Loading...</p>}
        {!loading && (
          <div>
            <h1>{productDetails.result.sync_product.name}</h1>
            <img alt="product" width="350px" src={productDetails.result.sync_product.thumbnail_url} />
            <p>£{productDetails.result.sync_variants[0].retail_price}</p>
            <form>
              <div>
                <span>Color:</span>
                {colorOptions.map((color, index) => (
                  <label key={index}>
                    { color ?
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={handleVariantChange}
                    /> : " no options"}
                    {color} 
                  </label>
                ))}
              </div>
              <div>
                <span>Size:</span>
                {sizeOptions.map((size, index) => (
                  <label key={index}>
                    { size ?
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={handleVariantChange}
                    /> : " no options"}
                    {size}
                  </label>
                ))}
              </div>
            </form>
            <button type="button">ADD TO CART</button>
            <button type="button">EXPRESS CHECKOUT</button>
          </div>
        )}
      </div>
    </div>
  );  
}