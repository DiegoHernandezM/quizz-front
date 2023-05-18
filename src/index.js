import "react-app-polyfill/stable";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "chart.js/auto";

import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import { ThemeProvider } from "./contexts/ThemeContext";

// Note: Remove the following line if you want to disable the API mocks.
import "./mocks";

import "animate.css/animate.min.css";
import { AuthProvider } from "./contexts/JWTContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const container = document.getElementById("root");
const root = createRoot(container);
  
const initialOptions = {
  "client-id":
    "AbhmG5DCb8R8ellA-bS0BvTqdDArpCYiNSGCCA2PFQUeLkzjBLmQSexRtq9dHIDKjj6jAI64m7US0ATu",
  currency: "MXN",
};

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <PayPalScriptProvider options={initialOptions}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PayPalScriptProvider>
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
