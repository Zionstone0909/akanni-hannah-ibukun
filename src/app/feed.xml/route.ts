import { NextResponse } from 'next/server';
import RSS from 'rss';
// 🔑 CORRECTION: Import the static blog data directly from the local data file.
import { allBlogs as blogs } from '../data/blogs';
import { siteConfig } from '../config';

// Import the specific type definition for a BlogPost from the data file
import type { BlogPost } from '../data/blogs'; 

// Force this Route Handler to run dynamically on every request.
// This ensures the feed is fresh and not statically cached by Next.js.
export const dynamic = 'force-dynamic';

/**
 * Generates an RSS 2.0 feed for the blog posts.
 * This route handler runs dynamically, ensuring the content is always fresh.
 */
export async function GET(request: Request) {
  // We no longer need an async fetch function; the data is imported directly.

  // If no blogs are returned (e.g., file is empty), return an empty feed rather than crashing.
  if (!blogs || blogs.length === 0) {
    console.warn("⚠️ No blogs found in data file. Returning empty feed.");
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
    // Use the date of the latest post (assuming the data is sorted newest first)
    pubDate: new Date(blogs[0].date).toUTCString(),
    ttl: 60,
  });

  // Add all posts to the feed. Explicitly type the post parameter as BlogPost to satisfy TypeScript.
  blogs.forEach((post: BlogPost) => {
    feed.item({
      // 🔑 CORRECTION: Access 'title' and 'excerpt' directly, not with '.rendered'
      title: post.title, 
      description: post.excerpt,
      url: `${siteUrl}/blogs/${post.slug}`,
      guid: `${siteUrl}/blogs/${post.slug}`,
      // 🔑 CORRECTION: Access the 'tags' property, not 'categories'
      categories: post.tags?.map(String) || [], 
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
