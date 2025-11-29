// src/app/utils/fetchNetlify.ts
import { TPost } from "./types";

// Use environment variable for production, fallback to localhost in development
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:8888" : "");

if (!baseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is missing. Set it in .env.local for production."
  );
}

/**
 * Generic helper for Netlify Functions
 */
async function fetchHelper<T>(endpoint: string): Promise<T | null> {
  try {
    // Construct URL dynamically
    const url = `${baseUrl.replace(/\/$/, "")}/.netlify/functions/${endpoint}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error(`❌ Failed to fetch ${url}: ${res.status} ${res.statusText}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`❌ Fetch error for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Fetch ALL blogs
 */
export async function fetchBlogs(): Promise<TPost[]> {
  const data = await fetchHelper<TPost[]>("posts");
  return data ?? [];
}

/**
 * Re-export for sitemap
 */
export { fetchBlogs as fetchBlogsFromNetlify };

/**
 * Fetch blog by slug
 */
export async function fetchBlog(slug: string): Promise<TPost | null> {
  if (!slug) return null;

  const data = await fetchHelper<TPost>(`posts?slug=${slug}`);
  return data ?? null;
}
