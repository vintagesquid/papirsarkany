import "client-only";

import useCart from "~/hooks/use-cart";
import { useCartStore } from "~/store/use-cart-store";
import { useFoxpostParcelBoxStore } from "~/store/use-foxpost-parcel-box-store";
import type { OrderRequestBody } from "../lib/types";
import type { OrderForm } from "../lib/validation-schemas";

export function useOrder() {
  const { getTotalPrice } = useCart();

  const foxpostOperatorId = useFoxpostParcelBoxStore(
    (state) => state.destination,
  );

  const cart = useCartStore((state) => state.cart);
  const shippingFee = useCartStore((state) => state.shippingFee);
  const billingFee = useCartStore((state) => state.billingFee);

  const sendOrder = (formData: OrderForm) => {
    const totalPrice = getTotalPrice();

    return fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        formData,
        cart,
        totalPrice,
        foxpostOperatorId,
        shippingFee: shippingFee,
        billingFee: billingFee,
      } satisfies OrderRequestBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  return {
    sendOrder,
  };
}
