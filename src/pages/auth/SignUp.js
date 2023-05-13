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
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const amount = "0.1";
  const description = "Pago para accesar a la APP";
  const style = {"layout":"vertical", "height":33};

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
              <StepContent style={{ width:"300px" }}>
                <PayPalButtons
                  style={style}
                  forceReRender={[user.id]}
                  createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                  reference_id: user.id,
                                  description: description,
                                  amount: {
                                      value: amount,
                                  },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                  }}
                  onApprove={ async (data, actions) => {
                    const order = await actions.order?.capture();
                    console.log(order);
                    navigate("/auth/sign-in");
                  }}
                />
              </StepContent>
          </Step>
        </Stepper>
      </Wrapper>
    </React.Fragment>
  );
}

export default SignUp;
