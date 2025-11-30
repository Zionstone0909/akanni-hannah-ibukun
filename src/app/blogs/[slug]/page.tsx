// src/app/blogs/[slug]/page.tsx
import BlogContent from "@/app/components/BlogContent";
import BlogHeader from "@/app/components/BlogHeader";
import { fetchBlog } from "@/app/utils/fetchNetlify";
import { createHighlighter, Highlighter } from "shiki";
import { JSDOM } from "jsdom";
import { Metadata } from "next";
import { stripHtmlAndDecode } from "@/app/utils/helpers";
import Footer from "@/app/components/Footer";
import SocialIcons from "@/app/components/SocialIcons";
import OpenToWorkBanner from "@/app/components/OpenToWorkBanner";
import { cache } from "react";
import { notFound } from "next/navigation";
import { TPost } from "@/app/utils/types";

const BASE_URL = "https://akanni-hannah-ibukun.netlify.app";

type TProps = { params: { slug: string } };

// Fetch blog data (cached)
const getBlogData = cache(async (slug: string): Promise<TPost | null> => {
  try {
    const blog = await fetchBlog(slug);
    return blog ?? null;
  } catch (error) {
    console.error(`Failed to fetch blog post for slug ${slug}:`, error);
    return null;
  }
});

// Create syntax highlighter (cached)
const getHighlighter = cache(async () => {
  return createHighlighter({
    langs: ["javascript","typescript","json","html","css","bash","jsx","tsx","markdown","text"],
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

  const description = stripHtmlAndDecode(blog.excerpt?.rendered || blog.content.rendered);

  return {
    metadataBase: new URL(BASE_URL),
    title: `${blog.title.rendered} - Akanni Hannah`,
    description,
    keywords: blog.title.rendered,
    alternates: { canonical: `${BASE_URL}/blogs/${blog.slug}` },
    openGraph: {
      title: `${blog.title.rendered} - Akanni Hannah`,
      description,
      url: `${BASE_URL}/blogs/${blog.slug}`,
      type: "article",
      siteName: "Akanni Hannah",
      images: [
        { url: "/horizontal-logo.png", width: 1100, height: 300, alt: "Akanni Hannah Portfolio Logo" },
      ],
    },
  };
}

// Highlight code blocks
const highlightCodeBlocks = async (htmlContent: string): Promise<string> => {
  const highlighter: Highlighter = await getHighlighter();
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const blocks = Array.from(document.querySelectorAll("pre code")) as Element[];

  await Promise.all(blocks.map(async (block) => {
    const content = block.textContent || "";
    block.innerHTML = block.innerHTML.replaceAll("<br>", "\n");

    const languageClass = Array.from(block.classList).find((c) => c.startsWith("language-"));
    const lang = languageClass ? languageClass.replace("language-", "") : "text";

    const highlighted = await highlighter.codeToHtml(content, { lang, theme: "ayu-dark" });

    if (block.parentElement) {
      block.parentElement.outerHTML = highlighted;
    }
  }));

  return document.body.innerHTML;
};

// Page component
export default async function BlogPage({ params }: TProps) {
  const blog = await getBlogData(params.slug);
  if (!blog) notFound();

  const highlightedContent = await highlightCodeBlocks(blog.content.rendered);

  return (
    <div className="w-full flex justify-center">
      <main className="w-full min-h-screen max-w-[800px] p-2">
        <BlogHeader />
        <BlogContent blog={blog} content={highlightedContent} />
        <Footer noAnimate />
        <SocialIcons noAnimate />
        <OpenToWorkBanner />
      </main>
    </div>
  );
}
