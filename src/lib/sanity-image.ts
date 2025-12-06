import {
  createImageUrlBuilder,
  type SanityImageHotspot,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "@sanity/lib/client";
import type { ImageUrlBuilder } from "sanity";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}

export function getPositionFromHotspot(hotspot?: SanityImageHotspot): string {
  if (!hotspot?.x || !hotspot.y) {
    return "center";
  }

  return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
}
