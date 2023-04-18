import React from "react";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import ShirtsPage from "./components/ShirtsPages/ShirtsPage";
import HoodiesPage from "./components/HoodiesPage/HoodiesPage";
import HatsPage from "./components/HatsPage/HatsPage";
import Banner from "./components/Banner";
import CartPage from "./components/Cart/CartPage";
import ExpressCheckoutPage from "./components/ExpressCheckout/ExpressCheckoutPage";


function App() {

  return (
    <>
          <Banner />
          <Nav />
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/t-shirts" element={<ShirtsPage />} />
              <Route path="/hoodies" element={<HoodiesPage />} />
              <Route path="/hats" element={<HatsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/express-checkout" element={<ExpressCheckoutPage />} />
            </Routes>
          </div>
    </>
  );
}

export default App;
