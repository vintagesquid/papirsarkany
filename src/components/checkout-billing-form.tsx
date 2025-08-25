"use client";

import type { ChangeEvent, FC } from "react";
import { useFormContext } from "react-hook-form";

import type {
  BillingFee,
  BillingOptionValue,
  ShippingOptionValue,
} from "~/lib/types";
import type { OrderForm } from "~/lib/validation-schemas";
import { useCheckoutFormStore } from "~/store/use-checkout-form-store";
import BillingOptionRadioInput from "./billing-option-radio-input";

const CheckoutBillingForm: FC = () => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useFormContext<OrderForm>();

  const prevStep = useCheckoutFormStore((state) => state.prevStep);

  const shippingBillingMap: Record<
    ShippingOptionValue,
    { billingOptionValue: BillingOptionValue; billingFee?: BillingFee }[]
  > = {
    "Személyes átvétel": [
      { billingOptionValue: "Előreutalással", billingFee: undefined },
      { billingOptionValue: "Átvételkor készpénzel", billingFee: undefined },
    ],
    "Foxpost automatába": [
      { billingOptionValue: "Előreutalással", billingFee: undefined },
      {
        billingOptionValue: "Átvételkor bankártyával",
        billingFee: undefined,
      },
    ],
    "Postai szállítás": [
      {
        billingOptionValue: "Előreutalással",
        billingFee: undefined,
      },
      {
        billingOptionValue: "Átvételkor készpénzel",
        billingFee: undefined,
      },
    ],
  };

  const selectedShippingOption = getValues("shippingOption");

  if (!selectedShippingOption) {
    throw new Error("Érvénytelen szállitási mód");
  }

  const onIsSameAdressAsShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      syncShippingAndBilling();
      setValue("isSameAdressAsShipping", true);
    } else {
      setValue("billingPostcode", "");
      setValue("billingCity", "");
      setValue("billingAddress", "");
      setValue("billingSubaddress", "");
      setValue("isSameAdressAsShipping", false);
    }

    trigger(["isSameAdressAsShipping"]);
  };

  const syncShippingAndBilling = () => {
    if (
      selectedShippingOption === "Postai szállítás" &&
      getValues("isSameAdressAsShipping")
    ) {
      setValue("billingPostcode", getValues("shippingPostcode") || "");
      setValue("billingCity", getValues("shippingCity") || "");
      setValue("billingAddress", getValues("shippingAddress") || "");
      setValue("billingSubaddress", getValues("shippingSubaddress"));
    }
  };
  return (
    <div className="mx-auto max-w-(--breakpoint-sm) space-y-2">
      <h2 className="underline underline-offset-8">Fizetés</h2>

      {shippingBillingMap[selectedShippingOption].map(
        ({ billingOptionValue, billingFee }) => (
          <BillingOptionRadioInput
            key={billingOptionValue}
            value={billingOptionValue}
            billingFee={billingFee}
            isDisabled={billingFee === null}
          />
        ),
      )}

      <span className="text-error">{errors.paymentOption?.message}</span>

      <h2 className="underline underline-offset-8">Számlázási cím</h2>

      {selectedShippingOption === "Postai szállítás" && (
        <fieldset className="d-fieldset pt-4">
          <label className="d-label cursor-pointer justify-start gap-x-2">
            <input
              {...register("isSameAdressAsShipping")}
              onChange={(e) => onIsSameAdressAsShippingChange(e)}
              type="checkbox"
              className="d-checkbox checked:d-checkbox-primary"
            />
            <span className="d-label-text">
              A számlázási adataim megegyeznek a szállítási címemmel
            </span>
          </label>
        </fieldset>
      )}

      {(selectedShippingOption !== "Postai szállítás" ||
        !getValues("isSameAdressAsShipping")) && (
        <>
          <fieldset className="d-fieldset">
            <label className="d-label" htmlFor="billingPostcode">
              <span className="d-label-text text-lg">Irányítószám</span>
            </label>
            <input
              id="billingPostcode"
              type="text"
              className="d-input w-full"
              {...register("billingPostcode")}
            />
            <label className="d-label" htmlFor="billingPostcode">
              <span className="d-label-text-alt text-error">
                {errors.billingPostcode?.message}
              </span>
            </label>
          </fieldset>
          <fieldset className="d-fieldset">
            <label className="d-label" htmlFor="billingCity">
              <span className="d-label-text text-lg">Város</span>
            </label>
            <input
              id="billingCity"
              type="text"
              className="d-input w-full"
              {...register("billingCity")}
            />
            <label className="d-label" htmlFor="billingCity">
              <span className="d-label-text-alt text-error">
                {errors.billingCity?.message}
              </span>
            </label>
          </fieldset>
          <fieldset className="d-fieldset">
            <label className="d-label" htmlFor="billingAddress">
              <span className="d-label-text text-lg">Cím</span>
            </label>
            <input
              id="billingAddress"
              type="text"
              placeholder="Utca, házszám"
              className="d-input w-full"
              {...register("billingAddress")}
            />
            <label className="d-label" htmlFor="billingAddress">
              <span className="d-label-text-alt text-error">
                {errors.billingAddress?.message}
              </span>
            </label>
            <input
              type="text"
              placeholder="Emelet, ajtó, egyéb (opcionális)"
              className="d-input w-full"
              {...register("billingSubaddress")}
            />
            <div className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.billingSubaddress?.message}
              </span>
            </div>
          </fieldset>
        </>
      )}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
        <button
          type="button"
          className="d-btn d-btn-outline d-btn-neutral d-btn-block uppercase sm:w-auto"
          onClick={prevStep}
        >
          Vissza
        </button>
        <button
          type="submit"
          className="d-btn d-btn-primary d-btn-block uppercase sm:w-auto"
          onClick={() => syncShippingAndBilling()}
        >
          Tovább
        </button>
      </div>
    </div>
  );
};

export default CheckoutBillingForm;
