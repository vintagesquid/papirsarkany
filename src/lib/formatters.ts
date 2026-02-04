import type { MaskOptions } from "@react-input/mask";
import type { ZodError } from "zod";
import type {
  BillingOptionValue,
  ProductTypes,
  ShippingFee,
  ShippingOptionValue,
} from "./types";
import { PaymentMode, ShippingMode } from "prisma/generated/enums";

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

export const shippingOptionValueMap: Record<ShippingMode, ShippingOptionValue> =
{
  PersonalPickup: "Személyes átvétel",
  Foxpost: "Foxpost automatába",
  Post: "Postai szállítás",
};

export const paymentOptionValueMap: Record<PaymentMode, BillingOptionValue> = {
  Transfer: "Előreutalással",
  Card: "Átvételkor bankártyával",
  Cash: "Átvételkor készpénzel",
};

export const maskOptions: MaskOptions = {
  mask: "*__ __ ___ ____",
  replacement: { _: /\d/, "*": /[+]/ },
};
