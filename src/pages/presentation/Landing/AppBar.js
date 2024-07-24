import React from "react";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button as MuiButton,
  Container,
  Grid,
  Box,
  Toolbar,
} from "@mui/material";
const Button = styled(MuiButton)(spacing);
const Brand = styled.div`
  font-size: ${(props) => props.theme.typography.h2.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const AppBarComponent = () => (
  <React.Fragment>
    <AppBar position="relative" color="transparent" elevation={4} style={{ backgroundColor:"#203764", color:"white" }}>
      <Toolbar>
        <Container>
          <Grid container alignItems="center">
            <Grid item>
              <Brand>
                Bienvenido Capitán
              </Brand>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Box sx={{ display: { xs: "inline-block", md: "inline-block" } }}>
                <Button
                  ml={2}
                  color="inherit"
                  component={Link}
                  to="/auth/sign-in"
                >
                  Iniciar sesión
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default AppBarComponent;
