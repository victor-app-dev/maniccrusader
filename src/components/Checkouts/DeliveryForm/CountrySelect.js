import React, {} from "react";
import { useCheckout } from "../../Context/useCheckout";

function CountrySelect(props) {
  const check = useCheckout();

  const handleSelectChange = (e) => {
    check.setSelectedCountryName(e.target.options[e.target.selectedIndex].text);
    check.setSelectedCountryCode(e.target.value);
  };

  return (
    <>
      <label className="label-del" htmlFor="country-select">Country:</label>
      <select required className="select-del" id="country-select" onChange={handleSelectChange}>
        <option value="">--Select Your Country--</option>
        {check.listOfAllCountries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default CountrySelect;
