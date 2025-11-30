// File: src/app/components/BlogListItem.tsx

import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import { TPost } from "../utils/types";
import { stripHtmlAndDecode, formatBlogDate } from "../utils/helpers";

type BlogListItemProps = {
  blog: TPost;       // Must match the prop name used in BlogList.tsx
  isHome?: boolean;
};

/**
 * Renders a single blog list item.
 */
export default function BlogListItem({ blog, isHome }: BlogListItemProps) {
  const blogDate = formatBlogDate(blog.date);

  // Ensure we get plain text for title and excerpt
  const title = stripHtmlAndDecode(blog.title.rendered);
  const excerpt = blog.excerpt?.rendered
    ? stripHtmlAndDecode(blog.excerpt.rendered)
    : stripHtmlAndDecode(blog.content.rendered);

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
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </div>

      <div className="hidden lg:flex justify-end flex-none">
        <p className="text-[11px] text-slate-300">{blogDate}</p>
      </div>
    </Link>
  );
}
