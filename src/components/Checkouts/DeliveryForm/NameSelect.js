import React,{} from "react";
import { useCheckout } from "../../Context/useCheckout";

function NameSelect() {
  const check = useCheckout()
  const handleChange = (event) => {
    check.setSelectedName(event.target.value);
  };
  return (
    <>
      <label className="label-del" htmlFor="name">*Full Name:</label>
      <input
      className="input-del"
        type="text"
        id="name"
        name="name"
        value={check.selectedName}
        onChange={handleChange}
        required
      />
      
    </>
  );
}

export default NameSelect;