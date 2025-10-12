import type { Metadata } from "next";
import type { FC } from 'react';
import CheckoutBillingForm from "~/components/checkout-billing-form";
import CheckoutFormStepper from "~/components/checkout-form-stepper";
import CheckoutShippingForm from "~/components/checkout-shipping-form";
import CheckoutSummaryForm from "~/components/checkout-summary-form";
import { getContact } from '~/lib/cms';

export const metadata: Metadata = {
  title: "Pénztár",
  description: "Pénztár.",
};

const Checkout: FC= async () => {
  const contact = await getContact();

  return (
    <CheckoutFormStepper>
      <CheckoutShippingForm contact={contact} />
      <CheckoutBillingForm />
      <CheckoutSummaryForm />
    </CheckoutFormStepper>
  );
}

export default Checkout;