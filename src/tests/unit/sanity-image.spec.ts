// @vitest-environment node

import { expect, test } from "vitest";

import { getPositionFromHotspot, urlFor } from "~/lib/sanity-image";
import { kiteMock } from "~/mocks/product.mock";

test("urlfor", () => {
  expect(urlFor(kiteMock.image)).toBeDefined();

  expect(urlFor(kiteMock.image)).toHaveProperty("url");
});

test("getPositionFromHotspot", () => {
  expect(getPositionFromHotspot()).toBeDefined();

  expect(getPositionFromHotspot()).toBe("center");
  expect(getPositionFromHotspot(kiteMock.image.hotspot)).toBe(
    `${kiteMock.image.hotspot.x * 100}% ${kiteMock.image.hotspot.y * 100}%`,
  );
});
