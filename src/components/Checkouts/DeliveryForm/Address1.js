import React,{} from "react";
import { useCheckout } from "../../Context/useCheckout";

function Address1() {
  const check = useCheckout()
  const handleChange = (event) => {
    check.setSelectedAdd1(event.target.value);
  };
  return (
    <>
      <label className="label-del" htmlFor="add1">*Address 1:</label>
      <input
        className="input-del"
        type="text"
        id="add1"
        name="add1"
        value={check.selectedAdd1}
        onChange={handleChange}
        required
      />
    </>
  );
}

export default Address1;