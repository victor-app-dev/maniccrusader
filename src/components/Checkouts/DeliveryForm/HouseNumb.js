import React,{} from "react";
import { useCheckout } from "../../Context/useCheckout";

function HouseNumb() {
  const check = useCheckout()
  const handleChange = (event) => {
    check.setSelectedHouseNumb(event.target.value);
  };
  return (
    <>
      <label className="label-del" htmlFor="house-number">*House Number:</label>
      <input
      className="input-del"
        type="text"
        id="house-number"
        name="house-number"
        value={check.selectedHouseNumb}
        onChange={handleChange}
        required
      />
      
    </>
  );
}

export default HouseNumb;