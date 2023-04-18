import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { CartContextProvider } from "./components/Context/useCart";
import { Provider } from "react-redux";
import store from "./components/Context/useCart";
import { ExpressCheckoutContextProvider } from "./components/Context/useExpressCheckout";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ExpressCheckoutContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <React.StrictMode>
            <Auth0Provider
              domain={domain}
              clientId={clientId}
              redirectUri={window.location.origin}
            >
              <App />
            </Auth0Provider>
          </React.StrictMode>
        </BrowserRouter>
      </CartContextProvider>
    </ExpressCheckoutContextProvider>
  </Provider>
);
