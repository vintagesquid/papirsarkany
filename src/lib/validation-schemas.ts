import { z } from "zod";

import { unformatPhoneNumber } from "./formatters";
import type { WithImageAsset } from "./types";

export const cartItemValidationSchema = z.object({
  _id: z.string().min(1, "Hiányzó termék azonosító."),
  name: z.string().min(1, "Hiányzó név"),
  price: z.number().positive("Érvénytelen ár"),
  packageInfo: z.object(
    {
      x: z.number().positive("Hiányzó vagy érvénytelen csomag információk"),
      y: z.number().positive("Hiányzó vagy érvénytelen csomag információk"),
      z: z.number().positive("Hiányzó vagy érvénytelen csomag információk"),
      weight: z
        .number()
        .positive("Hiányzó vagy érvénytelen csomag információk"),
    },
    { message: "Hiányzó vagy érvénytelen csomag információk" },
  ),
  quantity: z.number().positive("Érvénytelen mennyiség"),
});

export type CartItem = WithImageAsset<z.infer<typeof cartItemValidationSchema>>;

export const orderFormSchema = [
  z
    .object({
      email: z.string().min(1, "Kötelező mező").email("Érvénytelen email cím"),
      firstName: z.string().min(1, "Kötelező mező"),
      lastName: z.string().min(1, "Kötelező mező"),
      phoneNumber: z
        .string()
        .transform((val) => unformatPhoneNumber(val))
        .pipe(
          z
            .string()
            .min(1, "Kötelező mező")
            .regex(
              /^(\+36)(20|30|31|70|50|51)\d{7}$/,
              "Érvényes magyar telefonszámnak kell lennie +36 formátumban pl.: +36 20 123 4567",
            ),
        ),
      shippingOption: z.enum(
        ["Személyes átvétel", "Postai szállítás", "Foxpost automatába"],
        { message: "Kérlek válassz egy szállítási módot!" },
      ),

      shippingPostcode: z.string().optional(), // validation handled in superRefine
      shippingCity: z.string().optional(),
      shippingAddress: z.string().optional(),
      shippingSubaddress: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (
        val.shippingOption === "Foxpost automatába" &&
        (!val.shippingPostcode || !val.shippingCity || !val.shippingAddress)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          path: ["shippingCity"],
          minimum: 1,
          message: "Kérlek válassz egy automatát",
          inclusive: false,
          type: "string",
        });
      }

      if (val.shippingOption === "Postai szállítás") {
        if (!val.shippingPostcode) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            path: ["shippingPostcode"],
            minimum: 1,
            message: "Kötelező mező",
            inclusive: false,
            type: "string",
          });
        }

        if (!val.shippingCity) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            path: ["shippingCity"],
            minimum: 1,
            message: "Kötelező mező",
            inclusive: false,
            type: "string",
          });
        }

        if (!val.shippingAddress) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            path: ["shippingAddress"],
            minimum: 1,
            message: "Kötelező mező",
            inclusive: false,
            type: "string",
          });
        }

        return false;
      }
      return true;
    }),
  z.object({
    paymentOption: z.enum(
      ["Előreutalással", "Átvételkor készpénzel", "Átvételkor bankártyával"],
      { message: "Kérlek válassz egy fizetési módot!" },
    ),

    isSameAdressAsShipping: z.boolean(),

    billingPostcode: z.string().min(1, "Kötelező mező"),
    billingCity: z.string().min(1, "Kötelező mező"),
    billingAddress: z.string().min(1, "Kötelező mező"),
    billingSubaddress: z.string().optional(),
  }),
  z.object({
    comment: z.string().optional(),
  }),
] as const;

export const mergedFormSchemaObject = z.intersection(
  z.intersection(orderFormSchema[0], orderFormSchema[1]),
  orderFormSchema[2],
);

export type OrderForm = z.infer<typeof mergedFormSchemaObject>;
