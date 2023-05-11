import React from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import useAuth from "../../hooks/useAuth";

import { Box } from "@mui/material";

PayPalButton.popTypes = {
    totalValue: PropTypes.String,
    invoice: PropTypes.String,
    customId: PropTypes.Number
}
export default function PayPalButton({totalValue, invoice, customId}) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  return (
    <Box style={{ width: '30px' }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: invoice,
                custom_id: customId,
                amount: {
                    value: totalValue,
                },
              },
            ],
          })
        }}
        onApprove={ async (data, actions) => {
          const order = await actions.order?.capture();
          navigate("/auth/sign-in");
        }}
      />
    </Box>
  )
}