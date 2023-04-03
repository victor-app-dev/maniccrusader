import React, { } from "react";
function LandingPage() {
  fetch('https://api.printful.com/stores', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer '+ process.env.REACT_APP_SHOP_TOKEN
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
  function auth0Code() {
      console.log("s")
  }
  return (
    <>
      landing page for website, needs wireframe, will show content, i.e. hot
      items, new drops, news? etc.
      <button onClick={auth0Code}>request autho code!</button>
    </>
  );
}

export default LandingPage;
