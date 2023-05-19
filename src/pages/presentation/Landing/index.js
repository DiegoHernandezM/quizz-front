import React from "react";

import AppBar from "./AppBar";
import Introduction from "./Introduction";
import Demos from "./Demos";
import Features from "./Features";
import FAQ from "./FAQ";
import JoinUs from "./JoinUs";

function Presentation() {
  return (
    <React.Fragment>
      <AppBar />
      <Introduction />
      <Features />
      <JoinUs />
    </React.Fragment>
  );
}

export default Presentation;
