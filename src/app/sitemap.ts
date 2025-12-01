// File: app/sitemap.ts

import { MetadataRoute } from "next";

// Fetch function from your utils (Must be configured with cache: 'no-store' internally)
import { fetchBlogsFromNetlify } from "../app/utils/fetchNetlify";
// Ensure TPost definition is correct:
import { TPost } from "./utils/types"; 
// Example TPost definition from previous turns (assuming this is what you have):
/*
export type TPost = {
    id: number;
    date: string; // ISO 8601 date string (used for both created and modified)
    slug: string; 
    title: string; 
    content: string; 
    excerpt: string; 
    tags: string[]; 
};
*/

// Base URL: Use the environment variable, falling back to the Netlify app URL for safety
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://akanni-hannah-ibukun.netlify.app';

export async function generateSitemaps() {
    // This function signals Next.js to generate one sitemap (0.xml)
    const sitemapIndexes = [{ id: 0 }];
    return sitemapIndexes;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
    
    // Ensure the BASE_URL is present before proceeding
    if (!BASE_URL) {
        throw new Error("Sitemap Error: NEXT_PUBLIC_SITE_URL is not defined.");
    }

    // Fetch blogs from Netlify (This function must use cache: 'no-store')
    // We only fetch if the index is 0, since we only have one sitemap index.
    if (id === 0) {
        const posts: TPost[] = await fetchBlogsFromNetlify();

        return [
            // Sitemap entry for the root page
            {
                url: BASE_URL,
                lastModified: new Date(),
                priority: 1.0, // Set higher priority for the homepage
            },
            // Sitemap entries for individual blog posts
            ...posts.map((post: TPost) => ({
                url: `${BASE_URL}/blogs/${post.slug}`,
                // 🔑 CORRECTION: Use the 'date' property from TPost, as 'modified_gmt' does not exist on that type.
                lastModified: new Date(post.date), 
                priority: 0.8,
            }))
        ];
    }

    // Return an empty array for any ID outside of what generateSitemaps returns
    return [];
}
