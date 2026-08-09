import type { Metadata } from "next";
import type { FC } from "react";
import CheckoutBillingForm from "~/components/checkout-billing-form";
import CheckoutFormStepper from "~/components/checkout-form-stepper";
import CheckoutShippingForm from "~/components/checkout-shipping-form";
import CheckoutSummaryForm from "~/components/checkout-summary-form";
import { getContact } from "~/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pénztár",
  description: "Pénztár.",
};

// as this page dynamic getContact would fetch on each render we save it's result in-memory
let cachedContact: Awaited<ReturnType<typeof getContact>> | null = null;

const Checkout: FC = async () => {
  let contact = cachedContact;

  if (!contact) {
    contact = await getContact();
    cachedContact = contact;
  }

  if (!contact) {
    return null;
  }

  return (
    <CheckoutFormStepper>
      <CheckoutShippingForm contact={contact} />
      <CheckoutBillingForm />
      <CheckoutSummaryForm />
    </CheckoutFormStepper>
  );
};

export default Checkout;
