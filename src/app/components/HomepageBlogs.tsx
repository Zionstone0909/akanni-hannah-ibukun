import MotionTag from "./MotionTag";
import { slideInFromRight } from "../utils/motion";
import SectionLabel from "./SectionLabel";
import BlogList from "./BlogList";
import { TPost } from "../utils/types";
import Link from "next/link";

export default function HomepageBlogs({blogs}: {blogs: TPost[] | undefined}) {
    // Fallback to empty array if blogs is undefined
    const blogList = blogs || [];
    // Sort by date (newest first) and show only first 5 blogs on homepage
    const sorted = [...blogList].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const displayedBlogs = sorted.slice(0, 5);
    const hasMore = blogList.length > 5;

    return (
        <MotionTag
            tag="div"
            variants={slideInFromRight(1.2)}
            initial="hidden"
            animate="visible"
        >
            <section
                id="blogs"
                className="w-full flex flex-wrap justify-center lg:justify-start mb-8 lg:mb-12 lg:pl-3"
            >
                <Link href="/blogs">
                    <SectionLabel label="BLOGS" className="lg:pl-3" />
                </Link>
                <BlogList blogs={displayedBlogs} isHome/>
                {hasMore && (
                    <div className="w-full mt-6 flex justify-center lg:justify-start lg:pl-3">
                        <Link href="/blogs" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition-colors">
                            View More Blogs →
                        </Link>
                    </div>
                )}
            </section>
        </MotionTag>
    );
}

