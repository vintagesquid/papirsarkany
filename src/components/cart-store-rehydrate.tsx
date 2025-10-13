"use client";

import type { FC } from "react";
import { useCartStore } from "~/store/use-cart-store";

if (typeof window !== "undefined") {
  useCartStore.persist.rehydrate();
}

const CartStoreRehydrate: FC = () => {
  return null;
};

export default CartStoreRehydrate;
