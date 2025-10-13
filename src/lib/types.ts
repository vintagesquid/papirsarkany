import type {
  Kite,
  Reel,
  Rod,
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageMetadata,
  Twine,
} from "@sanity/lib/sanity.types";
import type Link from "next/link";
import type { ComponentProps } from "react";
import type { NavigationMenuItemProps } from "~/components/navigation-menu-item";
import type { CartItem, OrderForm } from "./validation-schemas";

export type WithImageAsset<T> = Omit<T, "image"> & {
  image: {
    asset: {
      url: string | null;
      metadata: SanityImageMetadata | null;
    } | null;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
  } | null;
};

export type InferredProduct =
  | WithImageAsset<Kite>
  | WithImageAsset<Twine>
  | WithImageAsset<Reel>
  | WithImageAsset<Rod>;

export type ProductTypes = "kite" | "rod" | "reel" | "twine";

export type OrderRequestBody = {
  formData: OrderForm;
  cart: CartItem[];
  totalPrice: number;
  foxpostOperatorId?: string;
  shippingFee: ShippingFee;
  billingFee?: BillingFee;
};

export type ShippingFee = number | "szállítási költség";
export type BillingFee = number | undefined | null;

export type ShippingOptionValue =
  | "Személyes átvétel"
  | "Postai szállítás"
  | "Foxpost automatába";

export type BillingOptionValue =
  | "Átvételkor készpénzel"
  | "Előreutalással"
  | "Átvételkor bankártyával";

export type NewOrder = {
  contact: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  shippingOption: ShippingOptionValue;
  paymentOption: BillingOptionValue;

  shipping: {
    postcode?: string;
    city?: string;
    address?: string;
    subaddress?: string;
  };

  billing: {
    postcode: string;
    city: string;
    address: string;
    subaddress?: string;
  };

  comment?: string;
};

export type OrderMail = NewOrder & {
  orderId: number;
  products: {
    name: string;
    price: string;
    quantity: string;
    url: string | null;
    imageUrl: string | null;
  }[];
  shippingFee: string | null;
  billingFee: string | null;
  total: string;
};

export type FoxpostSelectMessageData = {
  place_id: number;
  operator_id: string;
  name: string;
  vapt: string;
  olapt: string;
  japt: string;
  ssapt: string;
  sdapt: string;
  group: string;
  address: string;
  zip: string;
  city: string;
  street: string;
  findme: string;
  geolat: number;
  geolng: number;
  allowed2: string;
  depot: string;
  load: string;
  isOutdoor: boolean;
  apmType: string;
  substitutes?:
    | ({
        place_id: number;
        operator_id: string;
      } | null)[]
    | null;
  open: {
    hetfo: string;
    kedd: string;
    szerda: string;
    csutortok: string;
    pentek: string;
    szombat: string;
    vasarnap: string;
  };
  fillEmptyList?:
    | {
        emptying: string;
        filling: string;
      }[]
    | null;
};

export type PackageInfo = {
  /**
   * length in cm,
   */
  x: number;
  /**
   * width in cm
   */
  y: number;
  /**
   * height in cm
   */
  z: number;
  /**
   * weight in grams
   */
  weight: number;
};

export type FoxpostPackageHandlingFees = {
  priceRange: number[];
  fee: number;
  feeType: string;
}[];

export type FoxpostPackageSize = "XS" | "S" | "M" | "L" | "XL";

export type FoxpostPackageInfoCategoryConstraints = PackageInfo & {
  category: FoxpostPackageSize;
};

/**
 * Represents the data required for processing a Foxpost package with a destination code.
 */
export type FoxpostCreateParcelRequestBody = {
  /**
   * Required. The value of cash on delivery (COD).
   * Minimum value: 0
   * Maximum value: 1,000,000
   * Default value: 0
   */
  cod: number;

  /**
   * Required. The code of the destination automaton.
   * This value corresponds to the `operator_id` field in the JSON file.
   */
  destination: string;

  /**
   * Required. The recipient's email address, which must be a valid email format.
   */
  recipientEmail: string;

  /**
   * Required. The name of the recipient.
   * Minimum length: 1
   * Maximum length: 150
   */
  recipientName: string;

  /**
   * Required. The recipient's phone number in +36 format.
   * Only Hungarian mobile phone numbers are accepted.
   * Regular expression: ^(\+36|36)(20|30|31|70|50|51)\d{7}$
   * Validation can be disabled upon request by contacting the Foxpost business contact.
   */
  recipientPhone: string;

  /**
   * Required. The size of the package, which must be provided when creating the package.
   * However, the system does not consider this value at the time of creation, so it can be
   * set to a fixed value (e.g., M). The final value is determined automatically during
   * Foxpost's warehouse processes.
   * Possible values: ["XS", "S", "M", "L", "XL"]
   */
  size: FoxpostPackageSize;

  /**
   * Optional. A text comment related to the package (e.g., what the package contains).
   * Minimum length: 0
   * Maximum length: 50
   * Default value: null
   */
  comment?: string;

  /**
   * Optional. Indicates whether Foxpost should print a label.
   * Only applicable for C2C type packages. Not relevant for business partners (webshops).
   */
  label?: boolean;

  /**
   * Optional. A package identifier that can be used for client-side identification
   * (e.g., order, invoice, return). The value can be arbitrary, but it's recommended to make it unique.
   * If provided, the value will appear on the label.
   * Minimum length: 0
   * Maximum length: 30
   */
  refCode?: string;

  /**
   * Optional. A unique barcode, which can only be used for delivery to an automaton.
   * In this case, the label will not print the CLFOX barcode generated by Foxpost, but rather
   * the barcode generated by the webshop.
   * The barcode must be unique, and two identical barcodes cannot exist in the Foxpost system,
   * so it is important for the webshop to ensure the uniqueness of the barcode.
   * Please use hybrid identifiers containing at least 4 letters and at least 4 numbers,
   * with the letters ideally referring to the partner.
   * Example: FIRMA987654321
   * If a barcode that already exists in the system is submitted, the package creation will fail
   * (DUPLICATED_UNIQUE_BARCODE error code).
   * Minimum length: 0
   * Maximum length: 20
   */
  uniqueBarcode?: string;
};

export type Toast = {
  /**
   * only allow one toast with the same id at a time in the toast store
   */
  id: string;
  message: string;
  active?: boolean;
} & (
  | {
      type: "success";
      href?: ComponentProps<typeof Link>["href"];
    }
  | {
      type: "error";
    }
);

/**
 * leftItems: on `desktop` rendered on `left` side on `mobile` rendered at the `bottom`
 *
 * rightItems: on `desktop` rendered on `right` side on `mobile` rendered at the `top`
 */
export type NavigationItems = {
  leftItems: NavigationMenuItemProps[];
  rightItems: NavigationMenuItemProps[];
};
