"use client";

import { AnimatePresence, m } from "motion/react";
import { type FC, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  FOXPOST_PACKAGE_MAX_LIMIT,
  FOXPOST_SHIPPING_FEE,
  LOCAL_PICKUP_ADDRESS,
} from "~/lib/constants";
import { getTotalPackageInfo, isFitInMaxLimit } from "~/lib/foxpost";
import type { OrderForm } from "~/lib/validation-schemas";
import { useCartStore } from "~/store/use-cart-store";
import FormattedPhoneNumberInput from "./formatted-phone-number-input";
import FoxpostMap from "./foxpost-map";
import LazyLoadFramerMotion from "./lazy-load-framer-motion";
import ShippingOptionRadioInput from "./shipping-option-radio-input";

import FoxpostLogo from "../../public/foxpost_logo.webp";
import LocalPickUpIcon from "../../public/local-pick-up.svg?url";
import ShippingWithPost from "../../public/shipping-with-post-logo.svg?url";

const CheckoutShippingForm: FC = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<OrderForm>();
  const cart = useCartStore((state) => state.cart);

  const [isShowFoxpostMap, setIsShowFoxpostMap] = useState(false);

  const totalPackageSize = useMemo(() => getTotalPackageInfo(cart), [cart]);

  const isFitInFoxpostLimit = isFitInMaxLimit(totalPackageSize);

  const onPersonalPickupOptionClick = () => {
    if (getValues("shippingOption") === "Személyes átvétel") {
      return;
    }

    setValue("shippingPostcode", LOCAL_PICKUP_ADDRESS.shippingPostcode);
    setValue("shippingCity", LOCAL_PICKUP_ADDRESS.shippingCity);
    setValue("shippingAddress", LOCAL_PICKUP_ADDRESS.shippingAddress);

    trigger(["shippingPostcode", "shippingCity", "shippingAddress"]);
  };

  const onFoxpostOptionClick = () => {
    if (getValues("shippingOption") === "Foxpost automatába") {
      return;
    }

    setValue("shippingPostcode", "");
    setValue("shippingCity", "");
    setValue("shippingAddress", "");

    setIsShowFoxpostMap(true);
  };

  const onPostOptionClick = () => {
    if (getValues("shippingOption") === "Postai szállítás") {
      return;
    }

    setValue("shippingPostcode", "");
    setValue("shippingCity", "");
    setValue("shippingAddress", "");
  };

  return (
    <>
      <div>
        <div className="mx-auto max-w-(--breakpoint-sm) space-y-2">
          <h2 className="underline underline-offset-8">Elérhetőség</h2>
          <fieldset className="d-fieldset">
            <label className="d-label" htmlFor="email">
              <span className="d-label-text text-lg">Email</span>
            </label>
            <input
              id="email"
              type="text"
              placeholder={"mail.papirsarkany@gmail.com"}
              className="d-input w-full"
              {...register("email")}
            />
            <label className="d-label" htmlFor="email">
              <span className="d-label-text-alt text-error">
                {errors.email?.message}
              </span>
            </label>
          </fieldset>
          <div className="gap-4 sm:grid sm:grid-cols-2">
            <fieldset className="d-fieldset">
              <label className="d-label" htmlFor="lastName">
                <span className="d-label-text text-lg">Vezetéknév</span>
              </label>
              <input
                id="lastName"
                type="text"
                className="d-input w-full"
                {...register("lastName")}
              />
              <label className="d-label" htmlFor="lastName">
                <span className="d-label-text-alt text-error">
                  {errors.lastName?.message}
                </span>
              </label>
            </fieldset>
            <fieldset className="d-fieldset">
              <label className="d-label" htmlFor="firstName">
                <span className="d-label-text text-lg">Keresztnév</span>
              </label>
              <input
                id="firstName"
                type="text"
                className="d-input w-full"
                {...register("firstName")}
              />
              <label className="d-label" htmlFor="firstName">
                <span className="d-label-text-alt text-error">
                  {errors.firstName?.message}
                </span>
              </label>
            </fieldset>
          </div>
          <fieldset className="d-fieldset">
            <label className="d-label" htmlFor="phoneNumber">
              <span className="d-label-text text-lg">Telefonszám</span>
            </label>
            <FormattedPhoneNumberInput
              id="phoneNumber"
              {...register("phoneNumber")}
            />
            <label className="d-label" htmlFor="phoneNumber">
              <span className="d-label-text-alt text-error">
                {errors.phoneNumber?.message}
              </span>
            </label>
          </fieldset>
          <h2 className="underline underline-offset-8">Szállítás</h2>
          <ShippingOptionRadioInput
            label={"Személyes átvétel"}
            onClick={onPersonalPickupOptionClick}
            value="Személyes átvétel"
            icon={LocalPickUpIcon}
          />
          <ShippingOptionRadioInput
            label={
              <>
                <div className="text-foxpost-red">
                  FOXPOST-Packeta Group automata
                </div>
                {!isFitInFoxpostLimit && (
                  <div className="font-normal text-sm sm:text-lg">
                    {`maximum ${FOXPOST_PACKAGE_MAX_LIMIT.weight}kg és (${FOXPOST_PACKAGE_MAX_LIMIT.x}x${FOXPOST_PACKAGE_MAX_LIMIT.y}x${FOXPOST_PACKAGE_MAX_LIMIT.z}cm-ig)`}
                  </div>
                )}
              </>
            }
            shippingFee={FOXPOST_SHIPPING_FEE}
            onClick={onFoxpostOptionClick}
            value="Foxpost automatába"
            icon={FoxpostLogo}
            isDisabled={!isFitInFoxpostLimit}
          />
        </div>
        <LazyLoadFramerMotion>
          <AnimatePresence>
            {watch("shippingOption") === "Foxpost automatába" &&
              isShowFoxpostMap && (
                <m.div
                  initial={{
                    scaleY: 0,
                    transformOrigin: "top",
                  }}
                  animate={{
                    scaleY: 1,
                  }}
                  exit={{
                    scaleY: 0,
                    opacity: 0,
                    transitionTimingFunction: "ease-in",
                  }}
                >
                  {errors.foxpostOperator && (
                    <div className="text-error">
                      {errors.foxpostOperator?.message}
                    </div>
                  )}
                  <FoxpostMap hideMap={() => setIsShowFoxpostMap(false)} />
                </m.div>
              )}
          </AnimatePresence>
        </LazyLoadFramerMotion>
        <div className="mx-auto mt-2 max-w-(--breakpoint-sm) space-y-2">
          <ShippingOptionRadioInput
            label="Postai szállítás"
            value="Postai szállítás"
            onClick={onPostOptionClick}
            shippingFee={"szállítási költség"}
            icon={ShippingWithPost}
          />
          <span className="text-error">{errors.shippingOption?.message}</span>
          {watch("shippingOption") === "Postai szállítás" && (
            <>
              <fieldset className="d-fieldset">
                <label className="d-label" htmlFor="shippingPostcode">
                  <span className="d-label-text text-lg">Irányítószám</span>
                </label>
                <input
                  id="shippingPostcode"
                  type="text"
                  className="d-input w-full"
                  {...register("shippingPostcode")}
                />
                <label className="d-label" htmlFor="shippingPostcode">
                  <span className="d-label-text-alt text-error">
                    {errors.shippingPostcode?.message}
                  </span>
                </label>
              </fieldset>
              <fieldset className="d-fieldset">
                <label className="d-label" htmlFor="shippingCity">
                  <span className="d-label-text text-lg">Város</span>
                </label>
                <input
                  id="shippingCity"
                  type="text"
                  className="d-input w-full"
                  {...register("shippingCity")}
                />
                <label className="d-label" htmlFor="shippingCity">
                  <span className="d-label-text-alt text-error">
                    {errors.shippingCity?.message}
                  </span>
                </label>
              </fieldset>
              <fieldset className="d-fieldset">
                <label className="d-label" htmlFor="shippingAddress">
                  <span className="d-label-text text-lg">Cím</span>
                </label>
                <input
                  id="shippingAddress"
                  type="text"
                  placeholder="Utca, házszám"
                  className="d-input w-full"
                  {...register("shippingAddress")}
                />
                <label className="d-label" htmlFor="shippingAddress">
                  <span className="d-label-text-alt text-error">
                    {errors.shippingAddress?.message}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Emelet, ajtó, egyéb (opcionális)"
                  className="d-input w-full"
                  {...register("shippingSubaddress")}
                />
                <div className="d-label">
                  <span className="d-label-text-alt text-error">
                    {errors.shippingSubaddress?.message}
                  </span>
                </div>
              </fieldset>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-(--breakpoint-sm)">
        <div className="flex justify-end">
          <button
            type="submit"
            className="d-btn d-btn-primary d-btn-block uppercase sm:w-auto"
          >
            Tovább
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutShippingForm;
