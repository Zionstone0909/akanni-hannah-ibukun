// File: src/app/components/BlogList.tsx

import BlogListItem from "./BlogListItem";
import { TPost } from "../utils/types";

type BlogListProps = {
  blogs: TPost[];
  isHome?: boolean;
};

/**
 * Renders a list of blog posts.
 * Uses BlogListItem for each individual post.
 */
export default function BlogList({ blogs, isHome }: BlogListProps) {
  return (
    <div className={`flex flex-col w-full ${!isHome ? "gap-2" : ""}`}>
      {blogs.map((blog) => (
        <BlogListItem
          key={blog.slug}  // unique key for React
          blog={blog}      // must match prop name in BlogListItem
          isHome={isHome}
        />
      ))}
    </div>
  );
}
