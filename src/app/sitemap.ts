import { MetadataRoute } from "next";

// Fetch function from your utils
import { fetchBlogsFromNetlify } from "../app/utils/fetchNetlify";
import { TPost } from "./utils/types";

// Base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateSitemaps() {
  const sitemapIndexes = [{ id: 0 }];
  return sitemapIndexes;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined in .env.local");
  }

  // Fetch blogs from Netlify
  const posts: TPost[] = await fetchBlogsFromNetlify();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    ...posts.map((post: TPost) => ({
      url: `${BASE_URL}/blogs/${post.slug}`,
      lastModified: new Date(post.modified_gmt),
      priority: 0.8,
    }))
  ];
}
