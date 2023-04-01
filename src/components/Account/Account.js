import React,{} from "react";
import "../Styles/StyleAccount.css"
import { useAuth0 } from "@auth0/auth0-react";
function Account() {
  const {user,logout,isAuthenticated, loginWithRedirect} = useAuth0();
  return (
    <>
      <div className="dropdown">
        { !user ?  <div>Account</div> : 
        <img alt="s" className={"userAccountImg"} src={user.picture}/> }
        
       
        <ul className="dropdown-content">
        { !isAuthenticated &&
        <p onClick={() => loginWithRedirect()}>Login</p>
          }
          { isAuthenticated &&
        <p onClick={() => logout()}>Logout</p>
          }
        </ul>
      </div>
    </>
  );
}

export default Account;
