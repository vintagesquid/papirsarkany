import type { $Enums } from "@prisma/client";

import type { ZodError } from "zod";
import type {
  BillingOptionValue,
  ProductTypes,
  ShippingFee,
  ShippingOptionValue,
} from "./types";
import type { MaskOptions } from "@react-input/mask";

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

export const shippingModePrismaMap: Record<
  ShippingOptionValue,
  $Enums.ShippingMode
> = {
  "Személyes átvétel": "PersonalPickup",
  "Postai szállítás": "Post",
  "Foxpost automatába": "Foxpost",
};

export const paymentModePrismaMap: Record<
  BillingOptionValue,
  $Enums.PaymentMode
> = {
  "Átvételkor készpénzel": "Cash",
  Előreutalással: "Transfer",
  "Átvételkor bankártyával": "Card",
};

export const maskOptions: MaskOptions = {
  mask: "*__ __ ___ ____",
  replacement: { _: /\d/, "*": /[+]/ },
};
