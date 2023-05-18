import React from "react";
import { useParams } from 'react-router-dom';
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Avatar, Paper, Typography } from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignInComponent from "../../components/auth/SignIn";

const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

function SignIn() {
  const { token } = useParams();
  return (
    <React.Fragment>
      <Brand />
      <Wrapper>
        <Helmet title="Iniciar sesión" />
        <BigAvatar alt="Lucy" src="/static/img/avatars/avatar.png" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Bienvenido de vuelta!
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Ingresa tus credenciales
        </Typography>

        <SignInComponent token={token}/>
      </Wrapper>
    </React.Fragment>
  );
}

export default SignIn;
