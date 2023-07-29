import React from "react";
import CountrySelect from "./CountrySelect";
import NameSelect from "./NameSelect";
import PostcodeSelect from "./PostcodeSelect";
import HouseNumb from "./HouseNumb";
import Address1 from "./Address1";
import Address2 from "./Address2";
import TownOrCity from "./TownOrCity";
import County from "./County";
import "../../Styles/StyleDeliveryForm.css";
import EmailSelect from "./EmailSelect";
import { useCheckout } from "../../Context/useCheckout";

function DeliveryForm() {
  const check = useCheckout();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    check.setFormSubmitted(true);
  };

  return (
    <>
      <form className="form-del" onSubmit={handleFormSubmit}>
        <CountrySelect />
        <EmailSelect />
        <NameSelect />
        <PostcodeSelect />
        <HouseNumb />
        <Address1 />
        <Address2 />
        <TownOrCity />
        <County />
        <button type="submit">Continue To Payment</button>
      </form>
    </>
  );
}


export default DeliveryForm;
