import { GOOGLE_MAPS_PLACE_ID } from "./constants";
import { env } from "./env";

type GooglePlacesResponse = {
  id: number;
  rating: number;
  userRatingCount: number;
};

export async function getGoogleMapsRating(): Promise<GooglePlacesResponse> {
  const { GOOGLE_CLOUD_API_KEY } = env;

  // https://developers.google.com/maps/documentation/places/web-service/place-details#fieldmask
  const fieldMask: (keyof GooglePlacesResponse)[] = [
    "id",
    "rating",
    "userRatingCount",
  ];

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${GOOGLE_MAPS_PLACE_ID}?key=${GOOGLE_CLOUD_API_KEY}`,
    {
      headers: {
        "X-Goog-FieldMask": fieldMask.join(","),
      },
      next: {
        revalidate: 3600, // 1 hour
      },
    },
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
