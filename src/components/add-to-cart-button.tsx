"use client";

import type { FC, MouseEvent } from "react";
import { ZodError } from "zod";

import { formatZodErrors } from "~/lib/formatters";
import type { InferredProduct } from "~/lib/types";
import { cartItemValidationSchema } from "~/lib/validation-schemas";
import { useCartStore } from "~/store/use-cart-store";
import { useToastStore } from "~/store/use-toast-store";

type AddToCartProps = {
  product: InferredProduct & { price?: number };
};

const AddToCartButton: FC<AddToCartProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const toast = useToastStore((state) => state.toast);

  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault();

    try {
      const cartItem = {
        image: product.image,
        ...cartItemValidationSchema.parse({
          ...product,
          quantity: 1,
        }),
      };

      addToCart(cartItem);

      toast({
        id: product._id,
        message: "Sikeresen hozzádva a kosárhoz.",
        type: "success",
        href: "/kosar",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);
        toast({
          id: product._id,
          type: "error",
          message: formatZodErrors(error),
        });

        return;
      }

      toast({
        id: product._id,
        type: "error",
        message: `Hiba történt a kosár hozzáadása közben. ${error instanceof Error && error.message}`,
      });
    }
  };

  return (
    <button
      type="button"
      className="d-btn d-btn-primary uppercase active:scale-105!"
      onClick={onButtonClick}
    >
      Kosárba
    </button>
  );
};

export default AddToCartButton;
