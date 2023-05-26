import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import UserProgress from "./UserProgress";

function App() {
  return (
    <React.Fragment>
      <UserProgress />
      <Navigation />
    </React.Fragment>
  );
}

export default App;
