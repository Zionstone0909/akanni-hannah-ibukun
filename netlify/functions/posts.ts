import { Handler } from "@netlify/functions";

// =============================
// Blog Post Type
// =============================
interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  date: string;
}

// =============================
// Mock Blog Data (your 20 posts)
// =============================

const blogs: BlogPost[] = [
  // ... your entire blog array EXACTLY as you provided it ...
];

// =============================
// Transform to WordPress-like Shape
// =============================
const toWordPressShape = (post: BlogPost) => ({
  slug: post.slug,
  date: post.date,
  title: { rendered: post.title },
  content: { rendered: post.content },
  excerpt: { rendered: post.excerpt ?? post.content.slice(0, 140) + "..." },
  _embedded: {
    "wp:term": [
      [], // category placeholder
      post.tags?.map((tag) => ({ name: tag })) ?? []
    ]
  }
});

// =============================
// Netlify Handler
// =============================
export const handler: Handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS"
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  try {
    const slug = event.queryStringParameters?.slug;

    if (slug) {
      const raw = blogs.find((b) => b.slug === slug);

      if (!raw) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: `Blog post '${slug}' not found` })
        };
      }

      // Return single post as an array
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([toWordPressShape(raw)])
      };
    }

    // Return all posts sorted from newest to oldest
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(blogs.map(toWordPressShape).reverse())
    };
  } catch (error) {
    console.error("Netlify Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};
