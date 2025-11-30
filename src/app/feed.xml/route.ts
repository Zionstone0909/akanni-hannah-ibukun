import { NextResponse } from 'next/server';
import RSS from 'rss';
import { fetchBlogs } from '../utils/fetchNetlify'; // Note the relative path adjustment
import { siteConfig } from '../config'; // Note the relative path adjustment

// 🔑 CORRECTION: Force this Route Handler to run dynamically on every request.
// This ensures 'fetchBlogs()' is executed at runtime, preventing the feed from being stale.
export const dynamic = 'force-dynamic'; 

/**
 * Generates an RSS 2.0 feed for the blog posts.
 * This route handler runs dynamically, ensuring the content is always fresh.
 */
export async function GET(request: Request) {
  // Fetch all 20 blog posts. We cast the result to ensure it has the necessary 
  // structure for the RSS feed generation (specifically, the 'categories' field).
  const blogs = (await fetchBlogs()) as (any & { categories?: (string | number)[] })[];
  
  // If no blogs are returned (e.g., initial fetch failed), return an empty feed rather than crashing.
  if (!blogs || blogs.length === 0) {
    console.warn("⚠️ No blogs fetched for feed.xml. Returning empty feed.");
    const emptyFeed = new RSS({
      title: `${siteConfig.name}'s Blog`,
      description: siteConfig.description,
      feed_url: `${new URL(request.url).origin}/feed.xml`,
      site_url: new URL(request.url).origin,
      language: 'en',
    });
    return new NextResponse(emptyFeed.xml({ indent: true }), {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'max-age=0, s-maxage=3600',
      },
    });
  }

  // --- Start RSS Generation ---

  const { protocol, host } = new URL(request.url);
  const siteUrl = `${protocol}//${host}`;

  const feed = new RSS({
    title: `${siteConfig.name}'s Blog`,
    description: siteConfig.description,
    feed_url: `${siteUrl}/feed.xml`,
    site_url: siteUrl,
    image_url: `${siteUrl}/logox.png`,
    managingEditor: `${siteConfig.email} (${siteConfig.name})`,
    webMaster: `${siteConfig.email} (${siteConfig.name})`,
    copyright: `${new Date().getFullYear()} ${siteConfig.name}`,
    language: 'en',
    // Use the date of the latest post (since fetchBlogs returns them sorted newest first)
    pubDate: new Date(blogs[0].date).toUTCString(), 
    ttl: 60,
  });

  // Add all 20 posts to the feed
  blogs.forEach((post) => {
    feed.item({
      title: post.title.rendered,
      description: post.excerpt.rendered,
      url: `${siteUrl}/blogs/${post.slug}`,
      guid: `${siteUrl}/blogs/${post.slug}`,
      // Ensure categories are handled as strings for the RSS library
      categories: post.categories?.map(String) || [], 
      author: `${siteConfig.email} (${siteConfig.name})`,
      date: new Date(post.date).toUTCString(),
    });
  });

  // --- Return Response ---

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml',
      // Cache-Control headers tell CDNs/browsers to aggressively revalidate
      'Cache-Control': 'max-age=0, s-maxage=3600', 
    },
  });
}