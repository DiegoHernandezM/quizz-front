import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepContent,
  Box,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/slices/users";
import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignUpComponent from "../../components/auth/SignUp";
import PayPalButton from "../../components/paypal/PayPalButton";

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

function SignUp() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const handleCreateUser = (values) => {
    dispatch(createUser(values));
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const createOrder = useCallback((data, actions) => {
    return actions.order
        .create({
            purchase_units: [
                {
                  reference_id: user.id,
                  description: "Pago para tener acceso a la APP",
                  amount: {
                      value: "0.1",
                  },
                },
            ],
        })
        .then((orderID) => {
            return orderID;
        });
}, [user]);

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

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step key={1}>
              <StepLabel>
                Completa tu información personal
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2, sm: 2, lg: 2 }}>
                  <SignUpComponent handleCallBack={handleCreateUser} />
                </Box>
              </StepContent>
          </Step>
          <Step key={2}>
              <StepLabel>
                Realiza el pago para tener acceso a la APP
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2, sm: 2, lg: 2 }}>
                  <PayPalButton createO={createOrder}/>
                </Box>
              </StepContent>
          </Step>
        </Stepper>
      </Wrapper>
    </React.Fragment>
  );
}

export default SignUp;
