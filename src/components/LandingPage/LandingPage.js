import React, { useState } from "react";
function LandingPage() {
  const [stores, setStores] = useState(null)
  async function auth0Code() {
      fetch('https://maniccrusader-preprod-api.onrender.com/api/stores/')
    .then(response => response.json())
    .then(data => {
      setStores(data); // Do something with the response data here
    })
    .catch(error => console.error(error));
    
      console.log(stores)
  }
  return (
    <>
      landing page for website, needs wireframe, will show content, i.e. hot
      items, new drops, news? etc.
      <button onClick={auth0Code}>request autho code!</button>
      <h1>{stores && stores.result[0].name}</h1>
    </>
  );
}

export default LandingPage;
