import React,{} from "react";
import { useCheckout } from "../../Context/useCheckout";

function TownOrCity() {
  const check = useCheckout()
  const handleChange = (event) => {
    check.setSelectedTownOrCity(event.target.value);
  };
  return (
    <>
      <label className="label-del" htmlFor="town-or-city">*Town/City:</label>
      <input
      className="input-del"
        type="text"
        id="town-or-city"
        name="town-or-city"
        value={check.selectedTownOrCity}
        onChange={handleChange}
        required
      />
      
    </>
  );
}

export default TownOrCity;