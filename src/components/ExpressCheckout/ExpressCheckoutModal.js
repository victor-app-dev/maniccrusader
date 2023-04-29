import React, { useEffect, useState } from "react";
import { useCartContext } from "../Context/useCart";
import "../Styles/StyleExpressCheckoutModal.css";
import { useExpressCheckoutContext } from "../Context/useExpressCheckout";
export default function ExpressCheckoutModal(props) {
  const cart = useCartContext();
  const express = useExpressCheckoutContext();
  const [localProductInfo, setLocalProductInfo] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

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
        selectedVariant = localProductInfo.result.sync_variants.find(
          (variant) => variant.name.includes(selectedColor)
        );
        // filter out sizes that do not exist for selected color
        // eslint-disable-next-line
        sizeOptions = localProductInfo.result.sync_variants
          .filter((variant) => variant.name.includes(selectedColor))
          .map((variant) => variant.name.split(" / ")[1])
          .filter((size, index, self) => self.indexOf(size) === index);
      } else if (selectedSize) {
        selectedVariant = localProductInfo.result.sync_variants.find(
          (variant) => variant.name.includes(selectedSize)
        );
        // filter out colours that do not exist for selected sizes
        // eslint-disable-next-line
        colorOptions = localProductInfo.result.sync_variants
          .filter((variant) => variant.name.includes(selectedSize))
          .map((variant) => variant.name.split(" / ")[0])
          .filter((color, index, self) => self.indexOf(color) === index);
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

  const variantNameExpress = express.selectedEditItem.result.name;
  let color = variantNameExpress.split(" - ")[1]?.split(" / ")[0];
  let size = variantNameExpress.split(" - ")[1]?.split(" / ")[1];
  if (selectedColor === "" && selectedSize === "") {
    setSelectedColor(color);
    setSelectedSize(size);
  }

  useEffect(() => {
    fetch(
      `${cart.API_URL}products-details/${express.selectedEditItem.result.sync_product_id}/`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocalProductInfo(data);
      })
      .catch((error) => console.error(error));
  }, [express.selectedEditItem, cart.API_URL]);

  function HandleSave(id) {
    selectedVariantId &&
      fetch(`${cart.API_URL}variant-details/${selectedVariantId}/`)
        .then((response) => response.json())
        .then((data) => {
          express.setVariant_id(data);
          express.removeFromBasket(id);
          express.setSelectedEditItem(null);
        })
        .catch((error) => console.error(error));
  }
  useEffect(() => {
    if (
      localProductInfo &&
      localProductInfo.result.sync_variants.length === 1
    ) {
      setSelectedVariantId(localProductInfo.result.sync_variants[0].id);
    }
  }, [localProductInfo]);

  const handleChange = (value) => {
    let inputValue = value;
    if (inputValue === "") {
      express.setExpressEditQty("");
    } else if (inputValue < 1) {
      express.setExpressEditQty(1);
    } else if (inputValue > 100) {
      express.setExpressEditQty(100);
    } else {
      express.setExpressEditQty(inputValue);
    }
  };

  useEffect(() => {
    if (selectedColor && localProductInfo) {
      const variant = localProductInfo?.result?.sync_variants?.find(variant => variant?.name?.includes(selectedColor));
      if (variant) {
        setPreviewImg(variant?.files[1]?.preview_url);
      }
    }
  }, [selectedColor, localProductInfo]);

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <button
            onClick={() => {
              express.setSelectedEditItem(null);
            }}
            className="close-button"
          >
            X
          </button>
          <div>
            <h4>{express.selectedEditItem.result.name}</h4>
            <img
              width="200px"
              alt="product you wish to edit"
              src={!previewImg ? express.selectedEditItem?.result?.files[1]?.preview_url : previewImg}
            />
            <p>£{express.selectedEditItem.result.retail_price}</p>
            <div>
              <span>Color:</span>
              {colorOptions.map((color, index) => (
                <label key={index}>
                  {color ? (
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={handleVariantChange}
                      disabled={
                        !localProductInfo.result.sync_variants.some(
                          (variant) =>
                            variant.name.includes(selectedSize) &&
                            variant.name.includes(color)
                        )
                      }
                    />
                  ) : (
                    " no options"
                  )}
                  {color}
                </label>
              ))}
            </div>
            <div>
              <span>Size:</span>
              {sizeOptions.map((size, index) => (
                <label key={index}>
                  {size ? (
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={handleVariantChange}
                      disabled={
                        !localProductInfo.result.sync_variants.some(
                          (variant) =>
                            variant.name.includes(selectedColor) &&
                            variant.name.includes(size)
                        )
                      }
                    />
                  ) : (
                    " no options"
                  )}
                  {size}
                </label>
              ))}
            </div>
            <div>
              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={express.expressEditQty}
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  // onChange={(e) => {
                  //   express.setExpressEditQty(e.target.value);
                  // }}
                />
              </label>
            </div>
            <button
              onClick={() => {
                HandleSave(express.selectedEditItem.result.id);
              }}
              type="button"
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
