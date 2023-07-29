import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useCheckout = () => {
  const context = useCheckoutContext();
  return context;
};

export const CheckoutContext = createContext(undefined);

export const CheckoutContextProvider = ({ context, children }) => {
    const {user} = useAuth0();
    const [listOfAllCountries, setListOfAllCountries] = useState([]);
    const [selectedCountryName, setSelectedCountryName] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');    
    const [selectedName, setSelectedName] = useState('');    
    const [selectedPostcode, setSelectedPostcode] = useState('');  
    const [selectedHouseNumb, setSelectedHouseNumb] = useState('');  
    const [selectedAdd1, setSelectedAdd1] = useState('');
    const [selectedAdd2, setSelectedAdd2] = useState('');
    const [selectedTownOrCity, setSelectedTownOrCity] = useState('');
    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedGuestCheckout, setSelectedGuestCheckout] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(()=>{
      if(user){
        setSelectedGuestCheckout(user.email)
      }
    },[user])
    const API_URL = process.env.REACT_APP_API_URL
     useEffect(()=>{
         fetch(`${API_URL}countries/`)
         .then((response) => response.json())
         .then((data) => {
           setListOfAllCountries(data.result);
         })
         .catch((error) => console.error(error));
     },[API_URL])

// useEffect to make the API call when formSubmitted becomes true
useEffect(() => {
  if (formSubmitted) {
    // Prepare the payload for the API call
    const payload = {
      recipient: {
        address1: selectedAdd1, // Assuming you have these state variables available in your context
        city: selectedTownOrCity,
        country_code: selectedCountryCode,
        state_code: selectedCounty,
        zip: selectedPostcode,
      },
      items: [
        {
            "quantity": 1,
            "variant_id": 2
        },
        {
            "quantity": 5,
            "variant_id": 202
        }
    ]
    };

    // Make the API call to your Django backend
    fetch(`${API_URL}shipping_rates/${payload}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error("Error fetching shipping details:", error);
      })
      .finally(() => {
        // Reset the formSubmitted state to false after the API call is completed
        setFormSubmitted(false);
      });
  }
}, [formSubmitted, selectedCountryCode /* Add other dependencies here if needed */]);


  let contextData = {
    listOfAllCountries:listOfAllCountries,
    selectedCountryName:selectedCountryName,
    setSelectedCountryName:setSelectedCountryName,
    setSelectedCountryCode:setSelectedCountryCode,
    selectedCountryCode:selectedCountryCode,
    selectedName:selectedName,
    setSelectedName:setSelectedName,
    selectedPostcode:selectedPostcode,
    setSelectedPostcode:setSelectedPostcode,
    selectedHouseNumb:selectedHouseNumb,
    setSelectedHouseNumb:setSelectedHouseNumb,
    selectedAdd1:selectedAdd1,
    setSelectedAdd1:setSelectedAdd1,
    selectedAdd2:selectedAdd2,
    setSelectedAdd2:setSelectedAdd2,
    selectedTownOrCity:selectedTownOrCity,
    setSelectedTownOrCity:setSelectedTownOrCity,
    selectedCounty:selectedCounty,
    setSelectedCounty:setSelectedCounty,
    selectedGuestCheckout:selectedGuestCheckout,
    setSelectedGuestCheckout:setSelectedGuestCheckout,
    setFormSubmitted: setFormSubmitted,
    formSubmitted: formSubmitted,
    ...context,
  };
  return (
    <CheckoutContext.Provider value={contextData}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => useContext(CheckoutContext);