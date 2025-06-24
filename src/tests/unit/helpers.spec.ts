// @vitest-environment node

import { describe, expect, test, vi } from "vitest";

import { LOCAL_PICKUP_ADDRESS } from "~/lib/constants";
import * as envModule from "~/lib/env";
import {
  delay,
  isProdEnv,
  isStageEnv,
  normalizeOrderForm,
} from "~/lib/helpers";
import type { OrderForm } from "~/lib/validation-schemas";

test("delay - resolves after the given time", async () => {
  const delayTime = 6000;

  vi.useFakeTimers();
  const getDelaySpy = vi.fn(delay);

  const start = Date.now();

  const delayPromise = getDelaySpy(delayTime);
  vi.advanceTimersByTimeAsync(delayTime);
  await delayPromise;

  const end = Date.now();

  expect(end - start).toBe(delayTime);
  expect(getDelaySpy).toHaveResolved();

  vi.useRealTimers();
});

describe("normalizeOrderForm", () => {
  test('set shipping information to undefined if "Személyes átvétel" is selected', () => {
    const formData: OrderForm = {
      firstName: "János",
      lastName: "Kulka",
      email: "janos.kulka@gmail.com",
      shippingOption: "Személyes átvétel",
      shippingPostcode: LOCAL_PICKUP_ADDRESS.shippingPostcode,
      shippingCity: LOCAL_PICKUP_ADDRESS.shippingCity,
      shippingAddress: LOCAL_PICKUP_ADDRESS.shippingAddress,
      isSameAdressAsShipping: false,
      paymentOption: "Átvételkor készpénzel",
      phoneNumber: "+36201234567",
      billingPostcode: "1025",
      billingCity: "Budapest",
      billingAddress: "Felső Zöldmáli út 13.",
      billingSubaddress: "3. ajtó",
      comment: "just a unit test",
    };

    const normalizedOrderFormData = normalizeOrderForm(formData);

    expect(normalizedOrderFormData).toEqual({
      ...formData,
      shippingPostcode: undefined,
      shippingCity: undefined,
      shippingAddress: undefined,
      shippingSubaddress: undefined,
    });
  });

  test('returns the same object if "Postai szállítás" is selected', () => {
    const formData: OrderForm = {
      firstName: "János",
      lastName: "Kulka",
      email: "janos.kulka@gmail.com",
      shippingOption: "Postai szállítás",
      shippingPostcode: "1025",
      shippingCity: "Budapest",
      shippingAddress: "Felső Zöldmáli út 13.",
      shippingSubaddress: "3. ajtó",
      isSameAdressAsShipping: true,
      paymentOption: "Átvételkor készpénzel",
      phoneNumber: "+36201234567",
      billingPostcode: "1025",
      billingCity: "Budapest",
      billingAddress: "Felső Zöldmáli út 13.",
      billingSubaddress: "3. ajtó",
      comment: "just a unit test",
    };

    const normalizedOrderFormData = normalizeOrderForm(formData);

    expect(normalizedOrderFormData).toBe(formData);
  });
});

describe("isProdEnv", () => {
  test("should return false if NODE_ENV or VERCEL_ENV not production ", () => {
    vi.stubEnv("NODE_ENV", "test");

    expect(isProdEnv()).toBe(false);

    vi.stubEnv("NODE_ENV", "production");

    expect(isProdEnv()).toBe(false);

    vi.unstubAllEnvs();
  });

  test("should return true if NODE_ENV and VERCEL_ENV is production", () => {
    vi.spyOn(envModule, "env", "get").mockReturnValue({
      ...envModule.env,
      VERCEL_ENV: "production",
    });

    vi.stubEnv("NODE_ENV", "production");

    expect(isProdEnv()).toBe(true);

    vi.unstubAllEnvs();
  });
});

describe("isStageEnv", () => {
  test("should return false if NODE_ENV is not production", () => {
    vi.stubEnv("NODE_ENV", "test");

    expect(isStageEnv()).toBe(false);
  });

  test("should return true if VERCEL_ENV is stage and VERCEL_GIT_PULL_REQUEST_ID is set", () => {
    vi.spyOn(envModule, "env", "get").mockReturnValue({
      ...envModule.env,
      VERCEL_ENV: "stage",
      VERCEL_GIT_PULL_REQUEST_ID: "12345",
    });

    vi.stubEnv("NODE_ENV", "production");

    expect(isStageEnv()).toBe(true);

    vi.unstubAllEnvs();
  });
});
