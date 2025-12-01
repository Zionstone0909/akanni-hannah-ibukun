// File: src/app/utils/fetchNetlify.ts

import { TPost } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
const isDev = process.env.NODE_ENV === "development";

// Determine base URL cleanly
const effectiveBaseUrl: string =
    siteUrl.trim() !== ""
        ? siteUrl
        : isDev
        ? "http://localhost:8888"
        : "";

/**
 * Generic helper for fetching data from Netlify Functions.
 * Works in dev and production safely.
 */
async function fetchHelper<T>(endpoint: string): Promise<T | null> {
    let path = `/.netlify/functions/${endpoint.replace(/^\/+/, "")}`;

    // If we have no base URL in production, warn instead of crashing
    if (!isDev && !effectiveBaseUrl) {
        console.error(
            "❌ NEXT_PUBLIC_SITE_URL is missing. Netlify functions cannot be called in production builds."
        );
        return null;
    }

    const fetchUrl = effectiveBaseUrl
        ? new URL(path, effectiveBaseUrl).toString()
        : path; // fallback for localhost

    try {
        const res = await fetch(fetchUrl, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            const errorBody = await res.json().catch(() => ({}));
            console.error(`❌ Failed to fetch ${fetchUrl}`, {
                status: res.status,
                ...errorBody,
            });
            return null;
        }

        return (await res.json()) as T;
    } catch (error) {
        console.error(`❌ Fetch error for ${fetchUrl}:`, error);
        return null;
    }
}

/**
 * Fetch ALL blogs.
 */
export async function fetchBlogs(): Promise<TPost[]> {
    const data = await fetchHelper<TPost[]>("posts");
    return data ?? [];
}

/**
 * Alias for sitemap.xml generator.
 */
export { fetchBlogs as fetchBlogsFromNetlify };

/**
 * Fetch a single blog by slug.
 */
export async function fetchBlog(slug: string): Promise<TPost | null> {
    if (!slug) return null;

    const data = await fetchHelper<TPost[]>(`posts?slug=${encodeURIComponent(slug)}`);

    if (!data || !Array.isArray(data)) return null;

    // Netlify function normally returns 1 element
    const first = data[0];
    if (first) return first;

    return null;
}
