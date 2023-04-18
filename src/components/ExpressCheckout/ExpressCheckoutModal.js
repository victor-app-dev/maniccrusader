import React,{useEffect, useState } from "react";
import { useCartContext } from "../Context/useCart";
import "../Styles/StyleExpressCheckoutModal.css";
import { useExpressCheckoutContext } from "../Context/useExpressCheckout";
export default function ExpressCheckoutModal() {
  const cart = useCartContext();
  const express = useExpressCheckoutContext();
  const [localProductInfo , setLocalProductInfo] = useState(null)
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
    if (localProductInfo) {
      let selectedVariant = null;
      if (selectedColor && selectedSize) {
        selectedVariant = localProductInfo.result.sync_variants.find(
          (variant) =>
            variant.name.includes(selectedColor) &&
            variant.name.includes(selectedSize)
        );
      } else if (selectedColor) {
        selectedVariant = localProductInfo.result.sync_variants.find((variant) =>
          variant.name.includes(selectedColor)
        );
      } else if (selectedSize) {
        selectedVariant = localProductInfo.result.sync_variants.find((variant) =>
          variant.name.includes(selectedSize)
        );
      }
      if (!selectedVariant) {
        selectedVariant = localProductInfo.result.sync_variants[0];
        setSelectedColor("");
        setSelectedSize("");
      }
      setSelectedVariantId(selectedVariant.id);
    } 
  }, [localProductInfo, selectedColor, selectedSize]);

  localProductInfo?.result?.sync_variants?.forEach((variant) => {
    const variantName = variant.name;
    const color = variantName.split(" - ")[1]?.split(" / ")[0];
    const size = variantName.split(" - ")[1]?.split(" / ")[1];
    if (!colorOptions.includes(color)) colorOptions.push(color);
    if (!sizeOptions.includes(size)) sizeOptions.push(size);
  });


  useEffect(() => {
    fetch(`${cart.API_URL}products-details/${express.selectedEditItem.result.sync_product_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setLocalProductInfo(data);
      })
      .catch((error) => console.error(error));
  }, [express.selectedEditItem, cart.API_URL]);

  function HandleSave(id){
    selectedVariantId && fetch(`${cart.API_URL}variant-details/${selectedVariantId}/`)
      .then((response) => response.json())
      .then((data) => {
        express.setVariant_id(data);
        express.removeFromBasket(id)
        express.setSelectedEditItem(null)
      })
      .catch((error) => console.error(error));
}
useEffect(() => {
    if (localProductInfo && localProductInfo.result.sync_variants.length === 1) {
      setSelectedVariantId(localProductInfo.result.sync_variants[0].id);
    }
  }, [localProductInfo]);


  const handleChange = (event) => {
    let inputValue = event.target.value;
    if (inputValue === '') {
      express.setExpressEditQty('');
    } else if (inputValue < 1) {
      express.setExpressEditQty(1);
    } else if (inputValue > 100) {
      express.setExpressEditQty(100);
    } else {
      express.setExpressEditQty(inputValue);
    }
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <button onClick={() => {express.setSelectedEditItem(null)}} className="close-button">X</button>
            <div>
                <h4>{express.selectedEditItem.result.name}</h4>
                <img width="200px" alt="edit proudcts" src={express.selectedEditItem.result.product.image}/>
                <p>£{express.selectedEditItem.result.retail_price}</p>
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
              <div>
                <label>
                Quantity:
                <input value={express.expressEditQty} onChange={handleChange} type="number" min="1" max="100" required/>
              </label>
              </div>
              <button onClick={() => {HandleSave(express.selectedEditItem.result.id)}} type="button">SAVE CHANGES</button>
            </div>
        </div>
      </div>
    </>
  );
}