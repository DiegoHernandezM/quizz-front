import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { THEMES } from "../constants";
import createTheme from "../theme";
import Navbar from "../components/navbar/Navbar";

import GlobalStyle from "../components/GlobalStyle";

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Presentation = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <MuiThemeProvider theme={createTheme(THEMES.DEFAULT)}>
      <Root>
        <CssBaseline />
        <GlobalStyle />
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <AppContent>
          {children}
          <Outlet />
        </AppContent>
      </Root>
    </MuiThemeProvider>
  );
};

export default Presentation;
