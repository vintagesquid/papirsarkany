import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityImageHotspot } from "@sanity/lib/sanity.types";

import { client } from "@sanity/lib/client";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}

export function getPositionFromHotspot(hotspot?: SanityImageHotspot): string {
  if (!hotspot || !hotspot.x || !hotspot.y) return "center";

  return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
}
