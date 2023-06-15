import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import {
  Grid,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Typography
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

import NavbarConfigDropdown from "./NavbarConfigDropdown";
import NavbarUserDropdown from "./NavbarUserDropdown";
import backgroundJpe from "../../vendor/logoAviation.png";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Image = styled.img`
  max-width: 90px;
  height: auto;
  min-height: 10px;
  display: block;
  border-radius: 10px;
  z-index: 0;
  position: relative;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  margin-bottom: 10px;
  margin-top: 5px;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: 10px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

const Navbar = ({ onDrawerToggle }) => {
  const { t } = useTranslation();
  const name = localStorage.getItem("user");
  const type = localStorage.getItem("usertype");
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          {type === "3" ? (
            <Image alt="App de aviacion" src={backgroundJpe} />
          ): null}
          {type === "3" ? (
            <Typography variant="h4" gutterBottom style={{marginLeft: '10px'}}>
              Aviation In Sight
            </Typography>
          ): null}
          <Grid container alignItems="center">
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              {type != 3 ? (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              ) : null}     
            </Grid>
            <Grid item xs />
            <Grid item>
              <NavbarConfigDropdown />
              <NavbarUserDropdown />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(Navbar);
