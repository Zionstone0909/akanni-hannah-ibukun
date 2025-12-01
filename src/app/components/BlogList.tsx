// File: src/app/components/BlogList.tsx

import BlogListItem from "./BlogListItem";
import { TPost } from "../utils/types";

type BlogListProps = {
  // Ensure 'blogs' can be undefined or null from the API
  blogs: TPost[] | undefined | null; 
  isHome?: boolean;
};

/**
 * Renders a list of blog posts.
 */
export default function BlogList({ blogs, isHome }: BlogListProps) {
  
  if (!blogs || blogs.length === 0) {
    // Graceful fallback
    return <p className="text-center py-8">No blog posts found at this time.</p>;
  }

  return (
    <div className={`flex flex-col w-full ${!isHome ? "gap-2" : ""}`}>
      {blogs.map((blog) => (
        <BlogListItem
          key={blog.slug} 
          blog={blog}
          isHome={isHome}
        />
      ))}
    </div>
  );
}