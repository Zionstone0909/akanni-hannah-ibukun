// File: src/app/components/BlogListItem.tsx

import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import { TPost } from "../utils/types";
// Assuming stripHtmlAndDecode and formatBlogDate are correctly defined in helpers
import { stripHtmlAndDecode, formatBlogDate } from "../utils/helpers"; 

type BlogListItemProps = {
  blog: TPost;       
  isHome?: boolean;
};

/**
 * Renders a single blog list item with defensive data access.
 */
export default function BlogListItem({ blog, isHome }: BlogListItemProps) {
  // Safely get the date string (assuming 'blog.date' exists)
  const blogDate = formatBlogDate(blog.date);

  // --- 🔑 CRITICAL CORRECTIONS for TypeError and Type Safety ---

	// 1. Safely extract the title: support both WordPress-style ({ rendered }) and plain string.
	const rawTitle = typeof blog.title === "string"
		? blog.title
		: (blog.title?.rendered ?? "");
	const title = stripHtmlAndDecode(rawTitle);

  // 2. Safely extract the excerpt:
  // - Check if 'blog.excerpt' exists AND 'blog.excerpt.rendered' exists.
  // - If not, fall back to 'blog.content.rendered'.
  // - Use nullish coalescing ('??') to default to an empty string if everything is missing.
	// 2. Safely extract the excerpt/content HTML. Support both string and { rendered } shapes.
	const excerptHtml = typeof blog.excerpt === "string"
		? blog.excerpt
		: (blog.excerpt?.rendered ?? (typeof blog.content === "string" ? blog.content : (blog.content?.rendered ?? "")));

	// Use the prepared HTML string for rendering via dangerouslySetInnerHTML
	const excerpt = excerptHtml;

  // -----------------------------------------------------------------

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={`w-full ${
        isHome ? "pl-0 lg:pl-3" : "bg-[rgb(255,255,255,0.02)] lg:border"
      } p-3 flex justify-between rounded-md lg:hover:bg-[rgb(255,255,255,0.06)] transition-colors duration-300 group border-[rgb(255,255,255,0.02)]`}
    >
      <div className="lg:flex flex-wrap justify-between items-center w-full">
        <div className="flex items-center group-hover:text-orange-500 transition-colors duration-300 lg:mb-1 text-slate-300 w-full">
          <div className="lg:max-w-[90%]">
            <h3 className="text-[13px] font-bold">
              {title}
              <MdOutlineArrowOutward className="text-xs transition-transform duration-300 group-hover:scale-125 inline ml-1 align-middle" />
            </h3>
          </div>
        </div>

        <div className="lg:hidden">
          <p className="text-[11px] text-slate-300 pb-1">{blogDate}</p>
        </div>

        <div
          className="text-xs text-slate-300 line-clamp-2 w-full lg:max-w-[95%]"
          // Using the raw HTML (excerpt) which is standard for this kind of data source
          dangerouslySetInnerHTML={{ __html: excerpt }} 
        />
      </div>

      <div className="hidden lg:flex justify-end flex-none">
        <p className="text-[11px] text-slate-300">{blogDate}</p>
      </div>
    </Link>
  );
}