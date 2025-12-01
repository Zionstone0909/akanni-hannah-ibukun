// src/app/components/BlogContent.tsx

// 1. Import the correct function name: 'formatBlogDate' instead of 'formatDate'.
//    This resolves the original build error.
import { formatBlogDate } from "../utils/helpers";
import ArticleContent from "./ArticleContent";

// Define the type for clarity, matching the static data structure
interface BlogPostProps {
    blog: {
        title: string; // Not blog.title.rendered for non-WordPress data
        date: string;
        // ... other properties like slug, excerpt, tags
    };
    content: string;
}

export default function BlogContent({ blog, content }: BlogPostProps) {
    return (
        <>
            <div className="p-2">
                {/* 2. Access the title directly as 'blog.title' (not .rendered) */}
                <h2 className="text-base font-bold">{blog.title}</h2>
                <p className="text-xs text-slate-350 mb-0">
                    {/* 3. Call the function using the correct name */}
                    {formatBlogDate(blog.date)}
                </p>
            </div>
            {/* ArticleContent handles the safe rendering of 'content' internally */}
            <ArticleContent content={content} />
        </>
    );
}
