import React, { useState } from "react";
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
    console.log("entro");
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

  const steps = [
    {
      label: "Completa tu información personal",
      content: <SignUpComponent handleCallBack={handleCreateUser} />,
    },
    {
      label: "Realiza el pago para tener acceso a la APP",
      content: (
        <PayPalButton
          totalValue="0.1"
          invoice="pago parra accesar a la app"
          customId={user?.id}
        />
      ),
    },
  ];

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
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2, sm: 2, lg: 2 }}>{step.content}</Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Wrapper>
    </React.Fragment>
  );
}

export default SignUp;
