import CheckoutBillingForm from "~/components/checkout-billing-form";
import CheckoutFormStepper from "~/components/checkout-form-stepper";
import CheckoutShippingForm from "~/components/checkout-shipping-form";
import CheckoutSummaryForm from "~/components/checkout-summary-form";

export const metadata = {
  title: "Pénztár",
  description: "Pénztár.",
};

export default function Checkout() {
  return (
    <CheckoutFormStepper>
      <CheckoutShippingForm />
      <CheckoutBillingForm />
      <CheckoutSummaryForm />
    </CheckoutFormStepper>
  );
}
