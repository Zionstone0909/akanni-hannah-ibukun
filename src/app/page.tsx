"use client"; // Keep this directive for useEffect to work

import HeroTitle from "./components/HeroTitle";
import DynamicTagline from "./components/DynamicTagline";
import TitleList from "./components/TitleList";
import SocialIcons from "./components/SocialIcons";
import AboutMe from "./components/AboutMe";
import Experiences from "./components/Experiences";
import Projects from "./components/Projects";
import { siteConfig } from "./config";
import TableOfContents from "./components/TableOfContents";
import HireMeButton from "./components/HireMeButton";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import HomepageBlogs from "./components/HomepageBlogs";
import Technologies from "./components/Technologies";
import OpenToWorkBanner from "./components/OpenToWorkBanner";
import { useEffect } from "react";

// Define the expected prop type for 'blogs'
// It's highly recommended to define a proper type instead of 'any[]' in a separate types file.
interface HomeProps {
    blogs: any[]; // e.g., type Blog = { id: number; title: string; ... }; blogs: Blog[]
}

// Accept the 'blogs' prop here
export default function Home({ blogs }: HomeProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
        keywords: siteConfig.keywords,
    };

    // Add the redirect logic using useEffect
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash === '#blogs') {
            const newPath = '/blogs/why-next-js-is-the-ultimate-framework-for-seo-and-performance-optimization';
            // Use replace to prevent the user from navigating back to the hash page via the back button
            window.location.replace(window.location.origin + newPath);
        }
    }, []); // Empty dependency array ensures this runs once when mounted

    return (
        <main className="w-full min-h-screen px-4 sm:px-20 xl:px-40 2xl:px-80">
            {/* Schema.org markup is best placed in the <head> using Next.js Metadata API or Head component */}
            {/* For inline use in the body (less common), this syntax is fine: */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <section className="w-full flex flex-wrap">
                <header className="w-full lg:h-[100dvh] lg:sticky top-0 lg:w-1/2 pt-40 lg:pb-40 flex flex-col lg:justify-between">
                    <div>
                        <HeroTitle />
                        <TitleList titles={siteConfig.titles} />
                        <DynamicTagline
                            taglines={siteConfig.taglines}
                            className="pl-1 text-center lg:text-start text-xs lg:text-sm mt-4 min-h-20 max-w-[500px] text-slate-350"
                        />
                        <TableOfContents />
                        <HireMeButton isSticky />
                    </div>
                    <div>
                        <SocialIcons isSticky />
                        <Footer isSticky />
                    </div>
                </header>
                <main className="w-full lg:w-1/2 px-4 sm:px-0 pt-20 lg:pt-40 text-slate-350 text-sm flex flex-wrap justify-center lg:block lg:mb-40">
                    <AboutMe />
                    <Experiences />
                    <Projects />
                    <Technologies />
                    {/* 🔑 FIX Confirmed: This line correctly passes the received blogs prop */}
                    <HomepageBlogs blogs={blogs} /> 
                    <ContactForm />
                    <Footer />
                    <SocialIcons />
                    <OpenToWorkBanner />
                </main>
            </section>
        </main>
    );
}

