import React,{} from "react";
import { useCheckout } from "../../Context/useCheckout";

function County() {
  const check = useCheckout()
  const handleChange = (event) => {
    check.setSelectedCounty(event.target.value);
  };
  return (
    <>
      <label className="label-del" htmlFor="county">County:</label>
      <input
      className="input-del"
        type="text"
        id="county"
        name="county"
        value={check.selectedCounty}
        onChange={handleChange}
      />
      
    </>
  );
}

export default County;