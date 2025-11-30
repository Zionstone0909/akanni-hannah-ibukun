// File: src/app/utils/fetchNetlify.ts

import { TPost } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const isDev = process.env.NODE_ENV === "development";

// Define the effective base URL clearly.
// For Netlify functions, we need the full URL in production/SSG builds.
const effectiveBaseUrl: string = siteUrl || (isDev ? "http://localhost:8888" : "");

if (!effectiveBaseUrl && !isDev) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is missing. Set it in .env.local for production builds."
  );
}

/**
 * Generic helper for fetching data from Netlify Functions using the URL API.
 * @param endpoint The function endpoint (e.g., 'posts' or 'posts?slug=x').
 * @returns A promise resolving to the decoded JSON data or null on failure.
 */
async function fetchHelper<T>(endpoint: string): Promise<T | null> {
  let url: URL;
  
  let path = `/.netlify/functions/${endpoint.replace(/^\/+/, '')}`;
    
    // Determine the final URL used for fetch
    const fetchUrl = effectiveBaseUrl ? 
        new URL(path, effectiveBaseUrl).toString() : // Use full base URL if available
        path; // Otherwise use relative path for local dev/SSR

  try {
    const res = await fetch(fetchUrl, { 
        next: {
            revalidate: 3600 // Cache data for 1 hour
        },
    });

    if (!res.ok) {
        // ENHANCEMENT: Attempt to read JSON error body for better logging
        const errorBody = await res.json().catch(() => ({ message: res.statusText }));
        console.error(`❌ Failed to fetch ${fetchUrl}: Status ${res.status}`, errorBody);
        return null;
    }

    return (await res.json()) as T;

  } catch (error) {
    console.error(`❌ Fetch error for ${endpoint} at ${fetchUrl}:`, error);
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
 * Fetch blog by slug - LOGIC CORRECTED
 */
export async function fetchBlog(slug: string): Promise<TPost | null> {
  if (!slug) return null;

  // We expect the Netlify function to return an array of TPost
  const data = await fetchHelper<TPost[]>(`posts?slug=${encodeURIComponent(slug)}`);
  
  // Return the FIRST element of the array, matching the Promise<TPost | null> signature
  if (Array.isArray(data) && data.length > 0) {
      return data[0]; 
  }

  return null;
}
