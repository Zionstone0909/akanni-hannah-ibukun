// src/app/blogs/[slug]/page.tsx

// 1. Import the static data and type definition
//    Make sure you have created src/app/data/blogs.ts with the 20 posts
import blogs, { BlogPost } from "../../data/blogs";
import BlogContent from "@/app/components/BlogContent";
import BlogHeader from "@/app/components/BlogHeader";
import Footer from "@/app/components/Footer";
import OpenToWorkBanner from "@/app/components/OpenToWorkBanner";
import SocialIcons from "@/app/components/SocialIcons";
import { stripHtmlAndDecode } from "@/app/utils/helpers";
import { createHighlighter, Highlighter } from "shiki";
import { JSDOM } from "jsdom";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

// The base URL for canonical tags and metadata images
const BASE_URL = "https://akanni-hannah-ibukun.netlify.app";

type TProps = { params: { slug: string } };

// 2. Function to find a blog post in the local array
const getBlogData = (slug: string): BlogPost | undefined => {
  return blogs.find(blog => blog.slug === slug);
};

// Next.js function to pre-render all slugs at build time (SSG)
export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

// Create syntax highlighter (cached server-side)
const getHighlighter = cache(async () => {
  return createHighlighter({
    langs: ["javascript", "typescript", "json", "html", "css", "bash", "jsx", "tsx", "markdown", "text"],
    themes: ["ayu-dark"],
  });
});

// Generate metadata for the specific blog post
export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const blog = getBlogData(params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found - Akanni Hannah",
      description: "The requested blog post could not be found.",
    };
  }

  // Access data without WP '.rendered'
  const description = stripHtmlAndDecode(blog.excerpt);

  return {
    metadataBase: new URL(BASE_URL),
    title: `${blog.title} - Akanni Hannah`,
    description,
    keywords: blog.tags.join(', '),
    alternates: { canonical: `${BASE_URL}/blogs/${blog.slug}` },
    openGraph: {
      title: `${blog.title} - Akanni Hannah`,
      description,
      url: `${BASE_URL}/blogs/${blog.slug}`,
      type: "article",
      siteName: "Akanni Hannah",
      images: [
        { 
          url: new URL("/horizontal-logo.png", BASE_URL).href, 
          width: 1100, 
          height: 300, 
          alt: "Akanni Hannah Portfolio Logo" 
        },
      ],
    },
  };
}

// Helper to highlight code blocks using Shiki (server-side)
const highlightCodeBlocks = async (htmlContent: string): Promise<string> => {
  const highlighter: Highlighter = await getHighlighter();
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const blocks = Array.from(document.querySelectorAll("pre code")) as HTMLElement[];

  await Promise.all(blocks.map(async (block) => {
    const content = block.textContent || "";
    const languageClass = Array.from(block.classList).find((c) => c.startsWith("language-"));
    const lang = languageClass ? languageClass.replace("language-", "") : "text";
    const highlighted = await highlighter.codeToHtml(content, { lang, theme: "ayu-dark" });

    if (block.parentElement) {
      block.parentElement.outerHTML = highlighted;
    }
  }));

  return document.body.innerHTML;
};

// Main Page component (an async Server Component)
export default async function BlogPage({ params }: TProps) {
  const blog = getBlogData(params.slug);
  if (!blog) notFound(); // Show 404 if the blog post doesn't exist

  // Process the static HTML string for syntax highlighting
  const highlightedContent = await highlightCodeBlocks(blog.content);

  return (
    <div className="w-full flex justify-center">
      <main className="w-full min-h-screen max-w-[800px] p-2">
        <BlogHeader />
        {/* Pass the static blog object and highlighted content down */}
        <BlogContent blog={blog} content={highlightedContent} />
        <Footer noAnimate />
        <SocialIcons noAnimate />
        <OpenToWorkBanner />
      </main>
    </div>
  );
}
