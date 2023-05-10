import React from "react";
import { PropTypes } from "prop-types";
import { PayPalButtons } from "@paypal/react-paypal-js";

PayPalButton.popTypes = {
    totalValue: PropTypes.String,
    invoice: PropTypes.String,
    valueForm: PropTypes.object,
    handleCallBack: PropTypes.func
}
export default function PayPalButton({totalValue, invoice, valueForm, handleCallBack}) {
  const  values = {...valueForm};
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
         handleCallBack(values, order);
      }}
    />
  )
}