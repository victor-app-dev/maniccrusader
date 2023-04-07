import React,{useEffect,useState} from "react";
import "./Styles/StyleModal.css";

export default function Modal(props) {
    const [ProductDetails, setProductsDetails] = useState(null);
    useEffect(() => {
          fetch(`https://maniccrusader-preprod-api.onrender.com/api/products-details/${props.selectedId}/`)
            .then(response => response.json())
            .then(data => {
              setProductsDetails(data);
            })
            .catch(error => console.error(error));
        }
      , [props.selectedId]);
    return (
      <div className="modal">
        <div className="modal-content">
          <button className="close-button" onClick={props.onClose}>
            &times;
          </button>
          <div>
            <p>main content</p>
          </div>
          <button type="button">ADD TO CART</button>
          <button type="button">EXPRESS CHECKOUT</button>
        </div>
      </div>
    );
  }