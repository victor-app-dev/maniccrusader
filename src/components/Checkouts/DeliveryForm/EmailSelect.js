import React,{} from "react";
import { useCheckout } from "../../Context/useCheckout";

function EmailSelect() {
  const check = useCheckout()
  const handleChange = (event) => {
    check.setSelectedGuestCheckout(event.target.value);
  };
  return (
    <>
      <label className="label-del" htmlFor="town-or-city">*Email:</label>
      <input
      className="input-del"
        type="text"
        id="town-or-city"
        name="town-or-city"
        value={check.selectedGuestCheckout}
        onChange={handleChange}
        required
      />
      
    </>
  );
}

export default EmailSelect;