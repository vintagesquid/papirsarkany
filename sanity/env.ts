import { env } from "node:process";

export const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-05-23";

export const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

export const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const useCdn = false;
