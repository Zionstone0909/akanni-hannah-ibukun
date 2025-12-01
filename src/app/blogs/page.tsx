// File: src/app/blogs/page.tsx
import Link from 'next/link';
// Assuming TPost and the helpers handle undefined/null safely as discussed previously
import { TPost } from '@/app/utils/types'; 
import { fetchBlogs } from '@/app/utils/fetchNetlify';
import { stripHtmlAndDecode, formatBlogDate } from '@/app/utils/helpers';
import OpenToWorkBanner from '@/app/components/OpenToWorkBanner';
// Assuming allBlogs is defined correctly in its file and used elsewhere if needed

type TBlogListItemProps = {
  blog: TPost;
};

/**
 * Renders a single blog list item.
 * 
 * Assumes TPost structure guarantees blog.date, blog.title.rendered, and at least 
 * one of blog.excerpt.rendered or blog.content.rendered exists and are strings.
 */
const BlogListItem = ({ blog }: TBlogListItemProps) => {
  // Pass strings to helper functions. 
  // We rely on the helpers.ts logic (which we previously corrected) to handle edge cases internally, 
  // or on the TPost type definition/API response reliability.
  const date = formatBlogDate(blog.date); 
  const title = stripHtmlAndDecode(blog.title.rendered);

  // Use nullish coalescing to ensure a string is always passed, preventing the original TypeError.
  const description = stripHtmlAndDecode(blog.excerpt?.rendered || blog.content.rendered || '');

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-700 pb-6 mb-6">
      <div className="flex-1 min-w-0 pr-4 mb-2 sm:mb-0">
        <h2 className="text-xl font-semibold text-purple-400 hover:text-purple-300 transition-colors">
          <Link href={`/blogs/${blog.slug}`} className="block">
            {title}
            <span className="text-purple-500 font-extrabold ml-1 leading-none">&gt;</span>
          </Link>
        </h2>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>
      </div>
      <div className="text-left sm:text-right text-sm text-gray-500 min-w-[120px] pt-1">{date}</div>
    </div>
  );
};

/**
 * Main page for the blog index.
 */
export default async function BlogsIndexPage() {
  // It's generally safer to fetch data with a try-catch block for production apps.
  let blogs: TPost[] = [];
  try {
    blogs = await fetchBlogs();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    // In a real app, you might want to display an error message to the user here
  }
  

  return (
    <div className="w-full flex justify-center bg-gray-900 text-white">
      <main className="w-full min-h-screen max-w-4xl p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold text-white mb-2 pt-10">BLOGS</h1>
        <p className="text-gray-400 mb-10 text-lg">
          Fragments of my imagination on full-stack development and architecture.
        </p>

        {blogs.length === 0 ? (
          <div className="text-center p-12 bg-gray-800 rounded-lg">
            <p className="text-gray-500 text-lg">
              No blog posts found at the moment. Please check back later!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <BlogListItem key={blog.slug} blog={blog} />
            ))}
          </div>
        )}

        <div className="mt-20">
          <OpenToWorkBanner />
        </div>
      </main>
    </div>
  );
}
