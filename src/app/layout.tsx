import type { Metadata } from "next";
import "./globals.css";
import StarsCanvas from "./components/StarBackground";
import Glow from "./components/Glow";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig } from "./config";
import { Toaster } from "sonner";
import Plausible from "./components/Plausible";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Define your Netlify URL and Name for global metadata consistency
const BASE_URL = 'https://akanni-hannah-ibukun.netlify.app';
const SITE_NAME = 'Akanni Hannah';

// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    // 1. 🚨 CRITICAL FIX: Add metadataBase to resolve relative image URLs
    metadataBase: new URL(BASE_URL),
    
    // 2. FIX: Ensure site title uses the correct name
    title: {
        default: siteConfig.title,
        template: `%s | ${SITE_NAME}`, // Ensures individual page titles include your name
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    alternates: {
        // 3. FIX: Canonical URL uses the Netlify domain
        canonical: BASE_URL,
    },
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: BASE_URL,
        type: "website",
        // 4. FIX: Use corrected site name
        siteName: SITE_NAME, 
        images: [
            {
                url: "/Portfolio.png", // Will now correctly resolve to BASE_URL/Portfolio.png
                width: 1920,
                height: 1080,
                // 5. FIX: Update alt text
                alt: `${SITE_NAME} Portfolio`, 
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                {/* Favicon links */}
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon-48x48.png"
                    sizes="48x48"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    // 6. FIX: Update Apple touch title
                    content={SITE_NAME} 
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link 
                    rel="alternate" 
                    type="application/rss+xml" 
                    title={`RSS Feed for ${SITE_NAME}'s Blog`} 
                    href="/feed.xml" 
                />
            </head>
            <body
                className={`${inter.className} antialiased bg-background text-slate-100`}
            >
                <StarsCanvas />
                <Glow />
                <Toaster />
                <Plausible />
                <div className="max-w-[2325px] mx-auto">
                {children}
                </div>
            </body>
            <Analytics />
            <SpeedInsights />
            <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
            />
        </html>
    );
}