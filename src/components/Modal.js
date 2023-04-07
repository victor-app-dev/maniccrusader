import React,{useEffect,useState} from "react";
import "./Styles/StyleModal.css";

export default function Modal(props) {
    const [ProductDetails, setProductsDetails] = useState(null);
    useEffect(() => {
          fetch(`http://127.0.0.1:8000/api/products-details/${props.selectedId}/`)
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