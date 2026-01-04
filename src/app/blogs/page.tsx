'use client';

import Link from 'next/link';
import { TPost, fetchBlogs } from '@/app/utils/fetchNetlify'; 
import { stripHtmlAndDecode, formatBlogDate } from '@/app/utils/helpers';
import OpenToWorkBanner from '@/app/components/OpenToWorkBanner';
import { useEffect, useState } from 'react';

type TBlogListItemProps = {
  blog: TPost;
};

const BlogListItem = ({ blog }: TBlogListItemProps) => {
  const date = formatBlogDate(blog.date); 
  
  const rawTitle = typeof blog.title === 'string' ? blog.title : blog.title?.rendered || '';
  const title = stripHtmlAndDecode(rawTitle);

  const rawExcerpt = typeof blog.excerpt === 'string' 
    ? blog.excerpt 
    : blog.excerpt?.rendered || (typeof blog.content === 'string' ? blog.content : blog.content?.rendered) || '';
    
  const description = stripHtmlAndDecode(rawExcerpt);

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
      <div className="text-left sm:text-right text-sm text-gray-500 min-w-[120px] pt-1">
        {date}
      </div>
    </div>
  );
};

export default function BlogsIndexPage() {
  const [blogs, setBlogs] = useState<TPost[]>([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const displayedBlogs = blogs.slice(0, displayCount);
  const hasMore = displayCount < blogs.length;

  if (loading) {
    return (
      <div className="w-full flex justify-center bg-gray-900 text-white">
        <main className="w-full min-h-screen max-w-4xl p-6 sm:p-10">
          <h1 className="text-4xl font-extrabold text-white mb-2 pt-10">BLOGS</h1>
          <div className="text-center p-12">
            <p className="text-gray-400 text-lg">Loading blog posts...</p>
          </div>
        </main>
      </div>
    );
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
          <>
            <div className="space-y-4">
              {displayedBlogs.map((blog) => (
                <BlogListItem key={blog.slug} blog={blog} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setDisplayCount(displayCount + 10)}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors"
                >
                  Load More Blogs ({blogs.length - displayCount} remaining)
                </button>
              </div>
            )}

            {!hasMore && blogs.length > 10 && (
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">Showing all {blogs.length} blog posts</p>
              </div>
            )}
          </>
        )}

        <div className="mt-20">
          <OpenToWorkBanner />
        </div>
      </main>
    </div>
  );
}