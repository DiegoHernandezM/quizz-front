import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignUpComponent from "../../components/auth/SignUp";

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

const createUser = (values, order) => {
  console.log("entro");
  console.log(values, order);
};

function SignUp() {
  return (
    <React.Fragment>
      <Brand />
      <Wrapper>
        <Helmet title="Registro" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Ingresa tus datos
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Explicacion de costos y uso de app
        </Typography>

        <SignUpComponent handleCallBack={createUser} />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignUp;
