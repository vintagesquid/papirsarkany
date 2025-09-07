import type { Metadata } from "next";
import CheckoutLink from "~/components/checkout-link";
import Heading from "~/components/heading";
import OrderSummaryCard from "~/components/order-summary-card";

export const metadata: Metadata = {
  title: "Kosár",
  description: "Kosár",
};

export default function Cart() {
  return (
    <div className="container flex flex-col gap-4 p-8">
      <Heading as={"h1"} className="text-center font-bold">
        Kosár tartalma
      </Heading>

      <div className="grid flex-1 items-center">
        <div className="space-y-4">
          <OrderSummaryCard />
          <CheckoutLink />
        </div>
      </div>
    </div>
  );
}
