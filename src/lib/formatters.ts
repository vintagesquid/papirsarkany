import type { MaskOptions } from "@react-input/mask";
import type { ZodError } from "zod";
import type { ProductTypes, ShippingFee } from "./types";

export function currencyFormatter(value: number): string {
  const formatter = Intl.NumberFormat("hu", {
    style: "currency",
    currency: "HUF",
    useGrouping: true,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

export function pricePerMeterFormatter(value: number): string {
  return `${currencyFormatter(value)}\xa0/\xa0m`;
}

export function formatZodErrors(zodError: ZodError): string {
  if (zodError.errors.length === 0) {
    return "";
  }

  const errorString = zodError.errors
    .map((error) => `${error.message}`)
    .join("; ");

  return `${errorString}.`;
}

export function formatShippingFee(shippingFee: ShippingFee) {
  if (typeof shippingFee === "number") {
    return `+${currencyFormatter(shippingFee)}`;
  }

  return `+${shippingFee}`;
}

export const unformatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replaceAll(" ", "");
};

export const sanityProductCategoryTitleMap: Record<ProductTypes, string> = {
  kite: "Egyzsinóros sárkány",
  reel: "Zsinórtartók",
  rod: "Pálcák, rudak és csövek",
  twine: "Zsinórok",
};

export const maskOptions: MaskOptions = {
  mask: "*__ __ ___ ____",
  replacement: { _: /\d/, "*": /[+]/ },
};
