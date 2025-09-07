"use client";

import Image from "next/image";
import { type FC, Fragment } from "react";
import TrashCanIcon from "~/assets/trash-can.svg";
import useCart from "~/hooks/use-cart";
import { MISSING_IMG_URL, NO_NAME } from "~/lib/constants";
import { currencyFormatter, formatShippingFee } from "~/lib/formatters";
import type { CartItem } from "~/lib/validation-schemas";
import { useCartStore } from "~/store/use-cart-store";
import Card from "./card";
import Heading from "./heading";
import ProductinCartCounter from "./product-in-cart-counter";

type OrderSummaryCardProps = {
  layout?: "full" | "definitive";
};

const OrderSummaryCard: FC<OrderSummaryCardProps> = ({ layout = "full" }) => {
  const cart = useCartStore((state) => state.cart);
  const shippingFee = useCartStore((state) => state.shippingFee);
  const billingFee = useCartStore((state) => state.billingFee);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const { getTotalItemCount, getTotalPrice } = useCart();

  const totalPrice = getTotalPrice();

  const onDeleteClick = (cartItem: CartItem) => {
    removeFromCart(cartItem);
  };

  if (cart.length < 1) {
    return (
      <div className="text-center">
        <Heading as="h1">Üres a kosarad.</Heading>
      </div>
    );
  }

  if (layout === "definitive") {
    return (
      <Card className="flex flex-1 flex-col gap-4 p-8">
        {cart.map((item) => (
          <Fragment key={item._id}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex shrink gap-2">
                <div className="hidden shrink-0 min-[390px]:block">
                  {item.image && (
                    <Image
                      src={item.image.asset?.url || MISSING_IMG_URL}
                      alt={item.name || NO_NAME}
                      width={128}
                      height={128}
                      placeholder="blur"
                      blurDataURL={item.image.asset?.metadata?.lqip}
                      className="h-auto max-h-32 min-h-24 w-32 rounded-lg object-contain"
                    />
                  )}
                </div>

                <div>
                  <Heading as="h3" className="font-bold">
                    {item.name}
                  </Heading>

                  <span className="font-normal text-gray-500 text-sm">
                    {item.quantity} db
                  </span>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-end gap-4">
                {item.price && (
                  <Heading as="h3" className="font-bold">
                    {currencyFormatter(item.price * item.quantity)}
                  </Heading>
                )}
              </div>
            </div>
            <div className="d-divider" />
          </Fragment>
        ))}

        {(Boolean(shippingFee) || Boolean(billingFee)) && (
          <div>
            {Boolean(shippingFee) && (
              <div className="flex justify-between font-bold">
                <Heading as="h5">Szállítás</Heading>
                <Heading as="h5">{formatShippingFee(shippingFee)}</Heading>
              </div>
            )}
            {Boolean(billingFee) && (
              <div className="flex justify-between font-bold">
                <Heading as="h5">Kezelési díj</Heading>
                <Heading as="h5">+{currencyFormatter(billingFee)}</Heading>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between font-bold">
          <Heading as="h3" className="text-balance">
            Összesen{" "}
            <span className="font-normal text-base text-gray-500">
              {getTotalItemCount()} db
            </span>
          </Heading>
          <Heading as="h3">{currencyFormatter(totalPrice)}</Heading>
        </div>
      </Card>
    );
  }

  // TODO simplify layout
  return (
    <Card className="flex flex-1 flex-col gap-4 p-8">
      {cart.map((item) => (
        <Fragment key={item._id}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              {item.image && (
                <Image
                  src={item.image.asset?.url || MISSING_IMG_URL}
                  alt={item.name || NO_NAME}
                  width={128}
                  height={128}
                  placeholder="blur"
                  blurDataURL={item.image.asset?.metadata?.lqip}
                  className="h-auto max-h-32 min-h-24 w-32 rounded-lg object-contain"
                />
              )}

              <div>
                <Heading as="h3" className="font-bold">
                  {item.name}
                </Heading>
                {item.price && (
                  <Heading as="h4" className="block font-bold md:hidden">
                    {currencyFormatter(item.price * item.quantity)}
                  </Heading>
                )}
              </div>
            </div>
            <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
              {item.price && (
                <Heading as="h4" className="font-bold">
                  {currencyFormatter(item.price * item.quantity)}
                </Heading>
              )}

              <div>
                <ProductinCartCounter value={item.quantity} cartItem={item} />
              </div>

              <button
                type="button"
                className="d-btn d-btn-square d-btn-error"
                onClick={() => onDeleteClick(item)}
              >
                <TrashCanIcon className="h-6 w-6 opacity-66" />
              </button>
            </div>
          </div>
          <div
            data-testid="cart-item-controls"
            className="flex justify-between gap-4 md:hidden"
          >
            <ProductinCartCounter value={item.quantity} cartItem={item} />

            <button
              type="button"
              className="d-btn d-btn-square d-btn-error"
              onClick={() => onDeleteClick(item)}
            >
              <TrashCanIcon className="h-6 w-6 opacity-66" />
            </button>
          </div>
          <div className="d-divider" />
        </Fragment>
      ))}

      <div className="flex justify-between font-bold">
        <Heading as="h3">
          Összesen{" "}
          <span className="font-normal text-base text-gray-500">
            {getTotalItemCount()} db
          </span>
        </Heading>
        <Heading as="h3">{currencyFormatter(totalPrice)}</Heading>
      </div>
    </Card>
  );
};

export default OrderSummaryCard;
