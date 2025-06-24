"use client";

import { InputMask } from "@react-input/mask";
import type { FC } from "react";
import { type UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { maskOptions } from "~/lib/formatters";

type PhoneNumberInputProps = UseFormRegisterReturn & {
  id?: string;
};

const FormattedPhoneNumberInput: FC<PhoneNumberInputProps> = ({
  id,
  ...register
}) => {
  const { getValues } = useFormContext();

  return (
    <InputMask
      id={id}
      type="text"
      mask={maskOptions.mask}
      replacement={maskOptions.replacement}
      autoComplete="tel"
      className="d-input w-full"
      placeholder="+36 20 123 4567"
      defaultValue={getValues("phoneNumber")}
      {...register}
    />
  );
};

export default FormattedPhoneNumberInput;
