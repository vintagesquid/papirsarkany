import { client } from "@sanity/lib/client";
import type {
  GetAllKitesQueryResult,
  GetAllNewsQueryResult,
  GetAllReelsQueryResult,
  GetAllRodsQueryResult,
  GetAllTwinesQueryResult,
  GetKiteBySlugQueryResult,
} from "@sanity/lib/sanity.types";
import {
  getAllKitesQuery,
  getAllNewsQuery,
  getAllReelsQuery,
  getAllRodsQuery,
  getAllTwinesQuery,
  getKiteBySlugQuery,
} from "./queries";

export async function getAllKites(): Promise<GetAllKitesQueryResult> {
  return await client.fetch(getAllKitesQuery);
}

export async function getKiteBySlug(
  slug: string,
): Promise<GetKiteBySlugQueryResult> {
  return await client.fetch<GetKiteBySlugQueryResult, { slug: string }>(
    getKiteBySlugQuery,
    {
      slug,
    },
  );
}

export async function getAllRods(): Promise<GetAllRodsQueryResult> {
  return await client.fetch(getAllRodsQuery);
}

export async function getAllReels(): Promise<GetAllReelsQueryResult> {
  return await client.fetch(getAllReelsQuery);
}

export async function getAllTwines(): Promise<GetAllTwinesQueryResult> {
  return await client.fetch(getAllTwinesQuery);
}

export async function getAllNews(): Promise<GetAllNewsQueryResult> {
  return await client.fetch(getAllNewsQuery);
}
