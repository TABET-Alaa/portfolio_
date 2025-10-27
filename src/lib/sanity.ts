import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "o3cng10q";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_READ_TOKEN;

const hasValidConfig = projectId && dataset;

if (!hasValidConfig) {
  // Keep the app running; we'll fall back to local content.
  // eslint-disable-next-line no-console
  console.warn(
    "Sanity env vars missing: set SANITY_PROJECT_ID and SANITY_DATASET to enable remote content."
  );
}

export const sanityClient = hasValidConfig ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
  perspective: "published",
}) : null;

export async function fetchSingle<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    if (!sanityClient) return null;
    const data = await sanityClient.fetch<T | null>(query, params, { cache: "no-store" as any });
    return data ?? null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Sanity fetch failed", error);
    return null;
  }
}


