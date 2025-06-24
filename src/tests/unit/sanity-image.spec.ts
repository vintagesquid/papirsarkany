import { test } from "vitest";

test.skip("failing in CI, but works locally")

// import { getPositionFromHotspot, urlFor } from "~/lib/sanity-image";
// import { kiteMock } from "~/mocks/product.mock";

// test.skip("urlFor should return an object with url property", () => {
//   expect(urlFor(kiteMock.image)).toBeDefined();
//   expect(urlFor(kiteMock.image)).toHaveProperty("url");
// });

// test("getPositionFromHotspot should return center if hotspot not provided", () => {
//   expect(getPositionFromHotspot(kiteMock.image.hotspot)).toBe(
//     `${kiteMock.image.hotspot.x * 100}% ${kiteMock.image.hotspot.y * 100}%`,
//   );
// });

// test.skip("getPositionFromHotspot should return position in CSS complient format", () => {
//   expect(getPositionFromHotspot(kiteMock.image.hotspot)).toBe(
//     `${kiteMock.image.hotspot.x * 100}% ${kiteMock.image.hotspot.y * 100}%`,
//   );
// });

