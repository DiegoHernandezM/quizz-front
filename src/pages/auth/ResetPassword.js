import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import {Box, Paper, Typography} from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/logo.svg";
import ResetPasswordComponent from "../../components/auth/ResetPassword";

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const BigAvatar = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 200px;
  height: 200px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

function ResetPassword() {
  return (
    <React.Fragment>
      <Wrapper>
        <Helmet title="Reset Password" />
        <Box align="center">
          <BigAvatar alt="logo" src="/static/img/avatars/logoAviation.png" align="center"/>
        </Box>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Resetear Contraseña
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Ingresa tu correo para resetear tu contraseña
        </Typography>

        <ResetPasswordComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default ResetPassword;
