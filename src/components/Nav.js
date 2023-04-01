import React,{} from "react"
import NavItem from "./NavItem";
import Account from "./Account/Account";
export default function Nav(){
    return(
        <nav>
            <ul>
                <NavItem to="/t-shirts">
                t-shirts
                </NavItem>
                <NavItem to="/hats">
                hats
                </NavItem>
                <NavItem to="/hoodies">
                hoodies
                </NavItem>
                <Account />

            </ul>
        </nav>
    );
}