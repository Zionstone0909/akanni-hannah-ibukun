// src/app/HomeWrapper.tsx

// TPost is the raw, nested API structure (Input type)
// TLocalPost is the clean, flat application structure (Output type)
import { TPost, TLocalPost } from "./utils/types";

import Homepage from "./page";
import { fetchBlogs } from "./utils/fetchNetlify";

interface HomeWrapperProps {}

/**
 * Extracts tag names from the WordPress-style embedded structure.
 */
const extractTagNames = (post: TPost): string[] => {
    const terms = post._embedded?.["wp:term"];

    if (!terms || !Array.isArray(terms) || terms.length < 2) {
        return [];
    }

    const tagObjects = terms[1]; // tags are always in index [1]

    if (!Array.isArray(tagObjects)) return [];

    return tagObjects.map((t) => t.name);
};

/**
 * Transforms the raw, nested API data (TPost) into a simple, flat TLocalPost object.
 */
const transformApiToPosts = (rawBlogs: TPost[]): TLocalPost[] => {
    return rawBlogs.map((post, index): TLocalPost => {
        const contentRendered = post.content?.rendered ?? "";
        const excerptRendered = post.excerpt?.rendered ?? "";

        return {
            date: post.date,
            slug: post.slug,

            // Flatten nested values
            title: post.title?.rendered ?? "Untitled Post",
            content: contentRendered,
            excerpt: excerptRendered || contentRendered,

            // Generate/fallback ID
            id: index + 1,

            // Extract tag names safely
            tags: extractTagNames(post),
        };
    });
};

/**
 * HomeWrapper is an async Server Component responsible for fetching and transforming data.
 */
export default async function HomeWrapper(_props: HomeWrapperProps) {
    let blogs: TLocalPost[] = [];
    let hasError = false;

    try {
        // fetchBlogs returns TPost[] (raw API shape)
        const rawBlogs: TPost[] = await fetchBlogs();

        // Transform the raw API data into TLocalPost[]
        blogs = transformApiToPosts(rawBlogs);
    } catch (error) {
        hasError = true;
        console.error("Failed to load blog posts from API:", error);
    }

    return (
        <>
            {hasError && (
                <div className="bg-red-900/20 text-red-300 p-4 text-center mb-8 border border-red-700/50">
                    <p className="font-bold">Error: Could not load blog posts.</p>
                    <p className="text-sm">
                        Please check the Netlify Function endpoint for `/posts`.
                    </p>
                </div>
            )}

            {/* Pass the transformed blog array */}
            <Homepage blogs={blogs} />
        </>
    );
}
