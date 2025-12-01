// src/app/blogs/[slug]/page.tsx
import BlogContent from "@/app/components/BlogContent";
import BlogHeader from "@/app/components/BlogHeader";
import Footer from "@/app/components/Footer";
import OpenToWorkBanner from "@/app/components/OpenToWorkBanner";
import SocialIcons from "@/app/components/SocialIcons";
import { fetchBlog } from "@/app/utils/fetchNetlify";
import { stripHtmlAndDecode } from "@/app/utils/helpers";
import { TPost } from "@/app/utils/types";
import { createHighlighter, Highlighter } from "shiki";
import { JSDOM } from "jsdom";
import type { Metadata } from "next"; // Use 'type' for imports that are only types
import { notFound } from "next/navigation";
import { cache } from "react";

// Use process.env for robust base URL handling in different environments
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://akanni-hannah-ibukun.netlify.app";

type TProps = { params: { slug: string } };

// Fetch blog data (cached)
const getBlogData = cache(async (slug: string): Promise<TPost | null> => {
  try {
    const blog = await fetchBlog(slug);
    // Ensure the returned object is a plain object if your fetch layer returns something complex
    return blog || null;
  } catch (error) {
    console.error(`Failed to fetch blog post for slug ${slug}:`, error);
    return null;
  }
});

// Create syntax highlighter (cached)
// This uses Next.js file-system caching for the highlighter instance
const getHighlighter = cache(async () => {
  return createHighlighter({
    langs: ["javascript", "typescript", "json", "html", "css", "bash", "jsx", "tsx", "markdown", "text"],
    themes: ["ayu-dark"],
  });
});

// Generate metadata
export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const blog = await getBlogData(params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found - Akanni Hannah",
      description: "The requested blog post could not be found.",
    };
  }

  // Use optional chaining for safer access
  const description = stripHtmlAndDecode(blog.excerpt?.rendered || blog.content.rendered || 'A blog post about web development.');

  return {
    metadataBase: new URL(BASE_URL),
    title: `${blog.title.rendered} - Akanni Hannah`,
    description,
    keywords: blog.title.rendered.split(' ').join(', '), // Make keywords an actual comma-separated list if desired
    alternates: { canonical: `${BASE_URL}/blogs/${blog.slug}` },
    openGraph: {
      title: `${blog.title.rendered} - Akanni Hannah`,
      description,
      url: `${BASE_URL}/blogs/${blog.slug}`,
      type: "article",
      siteName: "Akanni Hannah",
      // Best practice: Use an absolute URL for images in OG tags
      images: [
        { url: new URL("/horizontal-logo.png", BASE_URL).href, width: 1100, height: 300, alt: "Akanni Hannah Portfolio Logo" },
      ],
    },
  };
}

// Highlight code blocks
const highlightCodeBlocks = async (htmlContent: string): Promise<string> => {
  const highlighter: Highlighter = await getHighlighter();
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  // Use specific type assertion for better safety with querySelectorAll
  const blocks = Array.from(document.querySelectorAll("pre code")) as HTMLElement[];

  // Note: Your original implementation was good. I'll stick to it.
  await Promise.all(blocks.map(async (block) => {
    const content = block.textContent || "";
    // This line might cause issues if you have complex HTML inside <code>
    // For pure text content in code blocks, it's fine.
    // block.innerHTML = block.innerHTML.replaceAll("<br>", "\n"); 

    const languageClass = Array.from(block.classList).find((c) => c.startsWith("language-"));
    // Default to 'text' if no language is specified
    const lang = languageClass ? languageClass.replace("language-", "") : "text";

    // Shiki returns a full HTML string with <div> wrappers
    const highlighted = await highlighter.codeToHtml(content, { lang, theme: "ayu-dark" });

    // Replace the parent <pre> element with the Shiki-generated HTML structure
    if (block.parentElement) {
      block.parentElement.outerHTML = highlighted;
    }
  }));

  return document.body.innerHTML;
};

// Page component (async server component)
export default async function BlogPage({ params }: TProps) {
  const blog = await getBlogData(params.slug);
  if (!blog) notFound();

  // The code highlighting runs server-side during the render process
  const highlightedContent = await highlightCodeBlocks(blog.content.rendered);

  return (
    <div className="w-full flex justify-center">
      <main className="w-full min-h-screen max-w-[800px] p-2">
        {/* Components that likely don't need data fetching or can handle their own */}
        <BlogHeader />
        {/* Pass the fully processed content down */}
        <BlogContent blog={blog} content={highlightedContent} />
        <Footer noAnimate />
        <SocialIcons noAnimate />
        <OpenToWorkBanner />
      </main>
    </div>
  );
}
