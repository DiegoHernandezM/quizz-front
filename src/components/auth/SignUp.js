import React, { useState, useReducer } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);
const initialValues = {
  fullName: "",
  email: "",
  password: "",
  school: "",
  type: 2
};

SignUp.propTypes = {
  handleCallBack: PropTypes.func
}

export default function SignUp({ handleCallBack }) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [values, setValues] = useState(initialValues);

  

  const handleChange = (e) => {
    setValues({...values,  [e.target.name]: e.target.value });
  };

  const hancleApprove = (order) => {
    console.log('approve' ,values);
    handleCallBack(values, order);
  };

  return (
    <>
      <TextField
        type="text"
        name="fullName"
        label="Nombre Completo"
        value={values.fullName}
        fullWidth
        onChange={handleChange}
        my={3}
      />
      <TextField
        type="text"
        name="school"
        label="Escuela de procedencia"
        value={values.school}
        fullWidth
        onChange={handleChange}
        my={3}
      />
      <TextField
        type="email"
        name="email"
        label="Email"
        value={values.email}
        fullWidth
        onChange={handleChange}
        my={3}
      />
      <TextField
        type="password"
        name="password"
        label="Contraseña"
        value={values.password}
        fullWidth
        onChange={handleChange}
        my={3}
      />
      <Button onClick={() => console.log(values)}>
        click
      </Button>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "suscription",
                amount: {
                    value: "0.1",
                },
              },
            ],
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
              console.log(values);
              const name = details.payer.name.given_name;
              alert(`Transaction completed by ${name}`);
          });
      }}
      />
    </>
  );
}
