import type {
  FoxpostPackageHandlingFees,
  FoxpostPackageInfoCategoryConstraints,
} from "./types";

export const MISSING_IMG_URL = "/missing-image.svg";

export const NO_NAME = "hiányzó név";

export const LOCAL_PICKUP_ADDRESS = {
  shippingPostcode: "2094",
  shippingCity: "Nagykovácsi",
  shippingAddress: "Kazal utca 6.",
} as const;

export const FOXPOST_PACKAGE_CONSTRAINST = [
  { x: 5, y: 33, z: 53, weight: 5 * 1000, category: "XS" },
  { x: 11.5, y: 36, z: 61, weight: 15 * 1000, category: "S" },
  { x: 19.5, y: 36, z: 61, weight: 25 * 1000, category: "M" },
  { x: 37.5, y: 36, z: 61, weight: 25 * 1000, category: "L" },
  { x: 60, y: 36, z: 61, weight: 25 * 1000, category: "XL" },
] as const satisfies FoxpostPackageInfoCategoryConstraints[];

export const FOXPOST_PACKAGE_MAX_LIMIT =
  FOXPOST_PACKAGE_CONSTRAINST[FOXPOST_PACKAGE_CONSTRAINST.length - 1];

export const FOXPOST_SHIPPING_FEE = 1590;

export const FOXPOST_PACKAGE_HANDLING_FEES = [
  {
    priceRange: [5, 10000],
    fee: 200,
    feeType: "flat",
  },
  {
    priceRange: [10001, 300000],
    fee: 1.5,
    feeType: "percentage",
  },
] as const satisfies FoxpostPackageHandlingFees;

export const GOOGLE_MAPS_PLACE_ID = "ChIJgUbQc-92akcRLtRwSD_F784";
