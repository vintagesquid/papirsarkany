import { expect } from "@playwright/test";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { test } from "vitest";

import FormattedPhoneNumberInput from "~/components/formatted-phone-number-input";

test("should render phone number input value in a formatted way", () => {
  const { result } = renderHook(() => useForm());

  const { register } = result.current;

  render(
    <FormProvider {...result.current}>
      <FormattedPhoneNumberInput {...register("phoneNumber")} />,
    </FormProvider>,
  );

  const inputElement = screen.getByRole("textbox") as HTMLInputElement;

  expect(inputElement).toBeDefined();
  expect(inputElement.getAttribute("placeholder")).toBe("+36 20 123 4567");

  fireEvent.focus(inputElement);
  fireEvent.input(inputElement, { target: { value: "+36707654321" } });
  fireEvent.blur(inputElement);

  expect(inputElement.value).toBe("+36 70 765 4321");
});
