// src/app/components/ArticleContent.tsx

// Import the parser library
'use client'; // Required because the parser might use browser APIs/hooks
import parse from 'html-react-parser';
import type { BlogPost } from '../data/blogs'; // Adjust path as necessary

// This component expects a prop named 'content' which must be a string of raw HTML.
export default function ArticleContent({ content }: { content: BlogPost['content'] }) {
    
    return (
        <article
            // Tailwind CSS classes for basic styling (assuming @tailwindcss/typography is installed)
            className="article-content max-w-4xl mx-auto p-4 md:p-8 prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
        >
            {/* The 'parse' function converts your raw HTML string into React elements */}
            {parse(content)}
        </article>
    );
}
