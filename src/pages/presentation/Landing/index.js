import React from "react";

import AppBar from "./AppBar";
import Introduction from "./Introduction";
import Features from "./Features";

function Presentation() {
  return (
    <React.Fragment>
      <AppBar />
      <Introduction />
      <Features />
    </React.Fragment>
  );
}

export default Presentation;
