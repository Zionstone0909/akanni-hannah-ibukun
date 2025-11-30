import Link from 'next/link';
import { TPost } from '@/app/utils/types';
import { fetchBlogs } from '@/app/utils/fetchNetlify';
import { stripHtmlAndDecode, formatBlogDate } from '@/app/utils/helpers';
import OpenToWorkBanner from '@/app/components/OpenToWorkBanner';

type TBlogListItemProps = {
  blog: TPost; // corrected prop name
};

/**
 * Renders a single blog list item.
 */
const BlogListItem = ({ blog }: TBlogListItemProps) => {
  const date = formatBlogDate(blog.date);
  const title = stripHtmlAndDecode(blog.title.rendered);
  const description = stripHtmlAndDecode(blog.excerpt?.rendered || blog.content.rendered);

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
  const blogs: TPost[] = await fetchBlogs();

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
