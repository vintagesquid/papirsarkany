import Image, { type ImageProps } from "next/image";
import type { MouseEventHandler, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { formatShippingFee } from "~/lib/formatters";
import type { ShippingFee, ShippingOptionValue } from "~/lib/types";
import type { OrderForm } from "~/lib/validation-schemas";
import { useCartStore } from "~/store/use-cart-store";

type ShippingOptionRadioInputProps = {
  label: Exclude<ReactNode, string> | ShippingOptionValue;
  shippingFee?: ShippingFee;
  value: ShippingOptionValue;
  isDisabled?: boolean;
  missingShippingInfoErrorMessage?: string;
  icon: ImageProps["src"];
  onClick?: MouseEventHandler<HTMLInputElement>;
};

export default function ShippingOptionRadioInput({
  isDisabled,
  onClick,
  shippingFee,
  label,
  value,
  icon,
  missingShippingInfoErrorMessage = "Hiányzó szállítási cím információk.",
}: ShippingOptionRadioInputProps) {
  const {
    register,
    watch,
    formState: { errors },
    getValues,
  } = useFormContext<OrderForm>();
  const setShippingFee = useCartStore((state) => state.setShippingFee);

  const onInputClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if (!shippingFee) {
      setShippingFee(0);
    } else {
      setShippingFee(shippingFee);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const hasShippingSchemaRequiredError = Boolean(
    errors.shippingPostcode?.type === "required" ||
      errors.shippingCity?.type === "required" ||
      errors.shippingAddress?.type === "required",
  );

  return (
    <fieldset className={`d-fieldset ${isDisabled ? "opacity-30" : ""}`}>
      <label className="flex cursor-pointer items-center justify-start gap-x-2">
        <input
          type="radio"
          value={value}
          {...register("shippingOption")}
          className="d-radio d-radio-primary border-black disabled:opacity-100"
          disabled={isDisabled}
          onClick={onInputClick}
        />
        <div className="flex items-center gap-2">
          <Image src={icon} alt={`${label} logo`} width={24} height={24} />

          <span className="font-bold text-lg">{label}</span>
        </div>
        {shippingFee && (
          <span className="flex-1 text-right font-bold text-lg">
            {formatShippingFee(shippingFee)}
          </span>
        )}
      </label>
      {watch("shippingOption") === value && (
        <div className="basis-full pl-8">
          <span className="text-error">
            {hasShippingSchemaRequiredError && missingShippingInfoErrorMessage}
          </span>
          <span className=" select-text text-lg">
            {getValues("shippingOption") !== "Postai szállítás" &&
              `${getValues("shippingPostcode")} ${getValues("shippingCity")} ${getValues("shippingAddress")}`}
          </span>
        </div>
      )}
    </fieldset>
  );
}
