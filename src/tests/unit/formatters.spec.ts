import { expect, test } from "vitest";
import { ZodError, z } from "zod";
import {
  currencyFormatter,
  formatShippingFee,
  formatZodErrors,
  pricePerMeterFormatter,
} from "~/lib/formatters";

test('currencyFormatter formats numbers to Hungarian format with "Ft" suffix', () => {
  expect(currencyFormatter(10)).toBe("10\xa0Ft");

  expect(currencyFormatter(10)).toBe("10\xa0Ft");

  expect(currencyFormatter(25200)).toBe("25\xa0200\xa0Ft");
  expect(currencyFormatter(0)).toBe("0\xa0Ft");
  expect(currencyFormatter(999999999)).toBe("999\xa0999\xa0999\xa0Ft");
  expect(currencyFormatter(-500)).toBe("-500\xa0Ft");
});

test('pricePerMeterFormatter formats numbers with "/ m" suffix', () => {
  expect(pricePerMeterFormatter(25)).toBe("25\xa0Ft\xa0/\xa0m");
  expect(pricePerMeterFormatter(25200)).toBe("25\xa0200\xa0Ft\xa0/\xa0m");
  expect(pricePerMeterFormatter(0)).toBe("0\xa0Ft\xa0/\xa0m");
  expect(pricePerMeterFormatter(999999)).toBe("999\xa0999\xa0Ft\xa0/\xa0m");
});

test("formatZodErrors formats ZodError into human-readable strings", () => {
  const zodSchema = z.object({
    name: z.string().min(1, "Hiányzó név"),
    age: z.number().min(18, "Legalább 18 éves kell legyen"),
  });
  const { error } = zodSchema.safeParse({ name: "", age: 17 });
  if (!error) {
    throw new Error("ZodError is undefined");
  }

  expect(formatZodErrors(new ZodError([]))).toBe("");

  expect(formatZodErrors(error)).toBe(
    "Hiányzó név; Legalább 18 éves kell legyen.",
  );
});

test('formatShippingFee formats shipping fee with "+" sign and "Ft" or as string', () => {
  expect(formatShippingFee(100)).toBe("+100\xa0Ft");
  expect(formatShippingFee("szállítási költség")).toBe("+szállítási költség");
  expect(formatShippingFee(0)).toBe("+0\xa0Ft");
});
