import React from "react";
import { PropTypes } from "prop-types";
import { PayPalButtons } from "@paypal/react-paypal-js";

PayPalButton.popTypes = {
    totalValue: PropTypes.String,
    invoice: PropTypes.String
}
export default function PayPalButton({totalValue, invoice}) {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: invoice,
              amount: {
                  value: totalValue,
              },
            },
          ],
        })
      }}
      onApprove={ async (data, actions) => {
         const order = await actions.order?.capture();
         console.log("order", order);
      }}
    />
  )
}