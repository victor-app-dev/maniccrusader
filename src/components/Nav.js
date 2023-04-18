import React from "react";
import NavItem from "./NavItem";
import Account from "./Account/Account";
import "./Styles/StyleNav.css"

export default function Nav() {
  return (
    <nav>
      <ul>
        <NavItem to="/t-shirts">t-shirts</NavItem>
        <NavItem to="/hats">hats</NavItem>
        <NavItem to="/hoodies">hoodies</NavItem>
        <NavItem to="/cart">Cart</NavItem>
        <li className="account"><Account /></li>
      </ul>
    </nav>
  );
}