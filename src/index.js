import "react-app-polyfill/stable";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "chart.js/auto";

import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import { ThemeProvider } from "./contexts/ThemeContext";

import "animate.css/animate.min.css";
import { AuthProvider } from "./contexts/JWTContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

const container = document.getElementById("root");
const root = createRoot(container);

const initialOptions = {
  "client-id":
    "AbhmG5DCb8R8ellA-bS0BvTqdDArpCYiNSGCCA2PFQUeLkzjBLmQSexRtq9dHIDKjj6jAI64m7US0ATu",
  currency: "MXN",
};

root.render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider>
        <PayPalScriptProvider options={initialOptions}>
          <App />
        </PayPalScriptProvider>
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    // Corremos este código si hay una nueva versión de nuestra app
    // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
      window.location.reload();
    }
  },
});