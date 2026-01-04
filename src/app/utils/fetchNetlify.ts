// File: src/app/utils/fetchNetlify.ts

// --- 1. LOCAL STATIC DATA IMPORT ---
import { allBlogs } from './staticBlogs'; 
// FIX: Export the type so it's accessible to your Page components
export type { TPost } from "./types"; 
import { TPost } from "./types"; 

// --- 2. ENVIRONMENT AND HELPER SETUP ---
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
const isDev = process.env.NODE_ENV === "development";

const effectiveBaseUrl: string =
  siteUrl.trim() !== "" ? siteUrl : isDev ? "http://localhost:8888" : "";

async function fetchHelper<T>(endpoint: string): Promise<T | null> {
  const path = `/.netlify/functions/${endpoint.replace(/^\/+/, "")}`;

  if (!isDev && !effectiveBaseUrl) {
    console.warn("⚠️ NEXT_PUBLIC_SITE_URL missing. Falling back to static data.");
    return null; 
  }

  const fetchUrl = effectiveBaseUrl
    ? new URL(path, effectiveBaseUrl).toString()
    : path;

  try {
    const res = await fetch(fetchUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`❌ Fetch error for ${fetchUrl}:`, error);
    return null;
  }
}

// --- 3. FETCH FUNCTIONS ---

export async function fetchBlogs(): Promise<TPost[]> {
  // Development shortcut: use local static posts to avoid Netlify function issues
  const sortByDateDesc = (arr: TPost[]) =>
    arr.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (isDev) {
    console.log("🔍 [fetchBlogs] Development mode: using local allBlogs");
    console.log(`📊 [fetchBlogs] allBlogs length:`, (allBlogs as any[]).length);
    if ((allBlogs as any[]).length === 0) {
      console.warn("⚠️ [fetchBlogs] WARNING: allBlogs is empty!");
    } else {
      console.log("✅ [fetchBlogs] allBlogs has posts, first post slug:", (allBlogs as any[])[0]?.slug);
    }
    const sorted = sortByDateDesc(allBlogs as unknown as TPost[]);
    console.log(`📤 [fetchBlogs] Returning ${sorted.length} sorted posts`);
    return sorted;
  }

  const netlifyData = await fetchHelper<TPost[]>("posts");

  if (netlifyData && Array.isArray(netlifyData) && netlifyData.length > 0) {
    console.log("✅ [fetchBlogs] Netlify data found, returning sorted results");
    return sortByDateDesc(netlifyData);
  }

  // Fallback to static data (ensure newest-first order)
  console.log("⚠️ [fetchBlogs] Netlify failed, falling back to local allBlogs");
  return sortByDateDesc(allBlogs as unknown as TPost[]);
}

export { fetchBlogs as fetchBlogsFromNetlify };

export async function fetchBlog(slug: string): Promise<TPost | null> {
  if (!slug) return null;

  const netlifyData = await fetchHelper<TPost[]>(`posts?slug=${encodeURIComponent(slug)}`);

  if (netlifyData && Array.isArray(netlifyData) && netlifyData.length > 0) {
    return netlifyData[0];
  }

  const staticPost = allBlogs.find(blog => blog.slug === slug);
  return (staticPost as unknown as TPost) ?? null;
}