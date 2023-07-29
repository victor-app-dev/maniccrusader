import React,{} from "react";
import { useCheckout } from "../../Context/useCheckout";

function Address2() {
  const check = useCheckout()
  const handleChange = (event) => {
    check.setSelectedAdd2(event.target.value);
  };
  return (
    <>
      <label className="label-del" htmlFor="add2">Address2:</label>
      <input
      className="input-del"
        type="text"
        id="add2"
        name="add2"
        value={check.selectedAdd2}
        onChange={handleChange}
      />
      
    </>
  );
}

export default Address2;