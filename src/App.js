import React from "react";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import ShirtsPage from "./components/ShirtsPages/ShirtsPage";
import HoodiesPage from "./components/HoodiesPage/HoodiesPage";
import HatsPage from "./components/HatsPage/HatsPage";
function App() {
  return (
    <>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/t-shirts" element={<ShirtsPage />} />
          <Route path="/hoodies" element={<HoodiesPage />} />
          <Route path="/hats" element={<HatsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
