import { FaGithub, FaFacebook } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter, FaDiscord, FaThreads } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { SiBluesky } from "react-icons/si";
import {
    RiNextjsFill,
    RiTailwindCssFill,
    RiOpenaiFill,
    RiWordpressFill,
} from "react-icons/ri";
import {
    SiVercel,
    SiGithubactions,
    SiAngular,
    SiLaravel,
    SiTypescript,
    SiShadcnui,
    SiPrisma,
    SiWoocommerce,
    SiReact,
    SiSupabase,
    SiExpress,
    SiPuppeteer,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiNodedotjs,
    SiPhp,
    SiMysql,
    SiMongodb,
    SiGraphql,
    SiFramer,
    SiThreedotjs,
    SiElectron,
    SiDocker,
    SiDrizzle,
    SiMui,
    SiGit,
} from "react-icons/si";
import { GrGraphQl } from "react-icons/gr";
import { TbApi, TbBrandReactNative } from "react-icons/tb";
import { DiRedis } from "react-icons/di";


export const siteConfig = {
    name: "Akanni Hannah Ibukun",
    title: "Akanni Hannah Ibukun | Full-Stack Developer",
    email: "hannahakanni7@gmail.com",
    alias: "Aurora",
    description: `
Akanni Hannah Ibukun is a web developer who builds scalable, user-centric applications using modern frameworks like Next.js, React, WordPress, and PHP. With expertise in JavaScript, TypeScript, Node.js, and database technologies such as PostgreSQL and MongoDB, Akanni creates high-performance, accessible, and maintainable digital solutions.  

Passionate about clean code and seamless user experiences, Akanni develops websites, web apps, e-commerce platforms, and custom API integrations. Experienced in both front-end and back-end development, he combines creativity and technical skill to deliver responsive, SEO-friendly, and visually engaging applications.  

He is also adept at integrating third-party services, automating workflows, and optimizing applications for speed and scalability, ensuring projects not only meet but exceed client expectations. Always exploring new technologies and frameworks, Akanni continues to innovate and craft solutions that make a real impact.
`,

    keywords:
        "Akanni Hannah Ibukun, full-stack developer, web development,CRM Specialist, Next.js,Nodejs, ph WordPress, React, Node.js, scalable applications, clean code",
    url: "https://alvinchang.dev",
    taglines: [
        "🚀 Coding Simplicity, Crafting Solutions: Bringing Ideas to Life, One Line at a Time. ✨ Let's transform challenges into digital possibilities with precision and creativity!",
        "🎨 Where Code Meets Creativity: Building Digital Experiences that Matter. 🌐 From intuitive interfaces to powerful backend systems, I create solutions that engage and inspire.",
        "💡 Innovating Beyond the Screen: Crafting Seamless Digital Journeys. 🌟 From concept to completion, let's build the future, one pixel and one line of code at a time.",
    ],
    titles: ["Full-Stack Developer", "NextJS Developer", "Wordpress Developer"],
    socialLinks: [
        {
            icon: <FaGithub />,
            url: "https://github.com/Zionstone0909",
        },
        {
            icon: <FaLinkedin />,
            url: "https://www.linkedin.com/in/hannah-akanni-994123390",
        },
        {
            icon: <FaSquareXTwitter />,
                        url: "https://x.com/HannahAkanniIBK?t=PT6kPGGubzQHEkH2kFhc3w&s=08",

        },
        {
            icon: <FaThreads />,
            url: "https://www.threads.com/@blackskingirl_anna6",
        },
        {
            icon: <SiBluesky />,
            url: "https://bsky.app/profile/akanni-hannah.bsky.social",
         },
        {
            icon: <FaDiscord />,
            url: "https://discord.gg/4sPCUmDz",
        },
        {
            icon: <IoIosMail />,
            url: "mailto:hannahakanni7@gmail.com",
        },
    ],
    sections: {
        tableOfContents: [
            {
                id: "about-me",
                label: "ABOUT ME",
            },
            {
                id: "experiences",
                label: "EXPERIENCES",
            },
            {
                id: "projects",
                label: "PROJECTS",
            },
            {
                id: "technologies",
                label: "TECHNOLOGIES",
            },
            {
                id: "blogs",
                label: "BLOGS",
            },
            {
                id: "contact",
                label: "CONTACT",
            },
        ],
        aboutMe: `
    <p style="margin-bottom: 1rem;">
      Hi! I'm <strong>Akanni Hannah Ibukun</strong>, a passionate <strong>full-stack developer</strong> with 
      <strong>5 years of experience</strong> building modern applications and fully responsive websites. 
      I specialize in creating clean, user-focused digital experiences — from intuitive front-end interfaces 
      to efficient and scalable back-end systems.
    </p>

    <p style="margin-bottom: 1rem;">
      I work with technologies like <strong>React</strong>, <strong>Next.js</strong>, <strong>Node.js</strong>, 
      <strong>TypeScript</strong>, and <strong>PostgreSQL</strong>, building fast, elegant, 
      and reliable solutions that solve real problems and help businesses grow.
    </p>

    <p style="margin-bottom: 1rem;">
      I love turning ideas into functional products — apps, dashboards, websites, automation tools, and more. 
      If you're looking for clean code, great design, and smooth user experiences, I'm always open to 
      exciting collaborations and impactful projects!
    </p>
`,

        experiences: [
            {
                company: "Freelance",
                position: "Full-stack Web Developer",
                duration: "2022 - Present",
                description:
                    "Architected and delivered high-performance web applications, e-commerce platforms, and custom API solutions using Next.js, Tailwind CSS, and TypeScript. Oversaw the entire development lifecycle, from client consultation and strategic planning through deployment and support. Specialized in creating SEO-friendly solutions and modern user experiences, consistently ensuring client satisfaction through proactive communication and timely project delivery."
            },
            {
                company: "Only God is wise.",
                position: "Software developer",
                duration: "2023 - 2024",
                description:
 "Developed and maintained various dynamic websites, web applications, and backend services. Utilized PHP and content management systems like WordPress for server-side logic and platform management. Created robust, user-facing experiences with front-end technologies including JavaScript, React, and Tailwind CSS. Focused on scalable, responsive design and efficient data management across diverse projects."            },
        ],
        projects: [
            {
                title: "Akanni Hannah | Portfolio Website",
                description:
                    "This is my portfolio website. I built it to showcase my projects and skills. It is a static site built with Next.js, Tailwind CSS, and Shadcn/UI. I used the following technologies to build it:",
                logo: "/projects/portfolio/portfolio-logo.webp",
                thumbnail: "/projects/portfolio/portfolio-thumbnail.webp",
                repoLink: "https://github.com/Zionstone0909/akanni-hannah-ibukun",
                technologies: [
                    {
                        icon: <RiNextjsFill className="text-[#FFF]" />,
                        name: "Next.js",
                    },
                    {
                        icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                        name: "Tailwind CSS",
                    },
                    {
                        icon: <SiShadcnui className="text-[#FFF]" />,
                        name: "Shadcn/UI",
                    },
                    {
                        icon: <SiTypescript className="text-[#3178C6]" />,
                        name: "TypeScript",
                    },
                ],
                link: "https://akanni-hannah.netlify.app",
                previewImages: [
                    "/projects/portfolio/1.webp",
                    "/projects/portfolio/2.webp",
                    "/projects/portfolio/3.webp",
                    "/projects/portfolio/4.webp",
                    "/projects/portfolio/5.webp",
                    "/projects/portfolio/6.webp"
                ],
                previewVideos: [
                    "https://video-proxy-worker.alvs131313.workers.dev/portfolio-video-4k/output.m3u8"
                ]
            },
            {
                title: "Genzify AI",
                description:
                    "GenZify is an AI-powered tool I developed to transform everyday text into trendy Gen Z-style language. I managed both the front-end design and back-end development, integrating AI functionality for smooth and creative rephrasings. The platform delivers a fun, engaging experience, perfect for anyone looking to add a modern twist to their communication. This project highlights my skills in blending AI with user-centric design to create a playful, interactive web tool.",
                logo: "/projects/genz/genz-logo.webp",
                thumbnail: "/projects/genz/genz-thumbnail.webp",
                repoLink: "https://github.com/auroradream04/genzify-app",
                technologies: [
                    {
                        icon: <RiNextjsFill className="text-[#FFF]" />,
                        name: "Next.js",
                    },
                    {
                        icon: <RiOpenaiFill className="text-[#412991]" />,
                        name: "OpenAI API",
                    },
                    {
                        icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                        name: "Tailwind CSS",
                    },
                    {
                        icon: <SiTypescript className="text-[#3178C6]" />,
                        name: "TypeScript",
                    },
                    {
                        icon: <SiShadcnui className="text-[#FFF]" />,
                        name: "Shadcn/UI",
                    },
                ],
                link: "https://genzify-app-wine.vercel.app/",
                previewImages: [
                    "/projects/genz/1.webp",
                    "/projects/genz/2.webp",
                    "/projects/genz/3.webp",
                    "/projects/genz/4.webp",
                    "/projects/genz/5.webp"
                ],
                previewVideos: [
                    "https://video-proxy-worker.alvs131313.workers.dev/genz-video-4k/output.m3u8"
                ]
            },
            {
                title: "WhatAboutPets",
                description:
                    "WhatAboutPets is a comprehensive blog and e-commerce platform I built to provide valuable insights into pet care, health, and wellness. Alongside engaging articles, the site features an integrated WooCommerce store, offering a variety of pet-related products. I managed everything from designing the user-friendly interface to implementing SEO strategies and setting up the online shop. This project highlights my expertise in both content-driven sites and e-commerce solutions, creating a complete experience for pet lovers.",
                logo: "/projects/whataboutpets/whataboutpets-logo.webp",
                thumbnail: "/projects/whataboutpets/whataboutpets-thumbnail.webp",
                repoLink: "",
                technologies: [
                    {
                        icon: <RiNextjsFill className="text-[#FFF]" />,
                        name: "Next.js",
                    },
                    {
                        icon: <RiWordpressFill className="text-[#21759B]" />,
                        name: "WordPress",
                    },
                    {
                        icon: <SiTypescript className="text-[#3178C6]" />,
                        name: "TypeScript",
                    },
                    {
                        icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                        name: "Tailwind CSS",
                    },
                    {
                        icon: <SiShadcnui className="text-[#FFF]" />,
                        name: "Shadcn/UI",
                    },
                    {
                        icon: <GrGraphQl className="text-[#E10098]" />,
                        name: "GraphQL",
                    },
                    {
                        icon: <SiWoocommerce className="text-[#96588A]" />,
                        name: "Woocommerce",
                    },
                ],
                link: "https://whataboutpets.com",
                previewImages: [
                    "/projects/whataboutpets/1.webp",
                    "/projects/whataboutpets/2.webp",
                    "/projects/whataboutpets/3.webp",
                    "/projects/whataboutpets/4.webp",
                    "/projects/whataboutpets/5.webp",
                    "/projects/whataboutpets/6.webp",
                ],
                previewVideos: [
                    "https://video-proxy-worker.alvs131313.workers.dev/whataboutpets-video-4k/output.m3u8"
                ]
            },
            {
                title: "Plaiful - AI Agent Directory",
                description:
                    "Developed for a client, Plaiful is a comprehensive AI agent directory platform built on Next.js. This project involved significant customization of the OpenAlternative codebase to create a dedicated platform for discovering and comparing AI agents focused on the banking and credit union sector. I implemented advanced filtering, search capabilities, and built a modern, intuitive interface for users to easily find AI solutions tailored to their specific needs.",
                logo: "/projects/plaiful/plaiful-logo.webp",
                thumbnail: "/projects/plaiful/plaiful-thumbnail.webp",
                repoLink: "https://github.com/Plaifully/Plai",
                technologies: [
                    {
                        icon: <RiNextjsFill className="text-[#FFF]" />,
                        name: "Next.js",
                    },
                    {
                        icon: <SiTypescript className="text-[#3178C6]" />,
                        name: "TypeScript",
                    },
                    {
                        icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                        name: "Tailwind CSS",
                    },
                    {
                        icon: <SiPrisma className="text-[#2D3748]" />,
                        name: "Prisma",
                    },
                    {
                        icon: <SiSupabase className="text-[#0084d4]" />,
                        name: "Supabase",
                    },
                ],
                link: "https://plai-web.vercel.app/",
                previewImages: [
                    "/projects/plaiful/1.webp",
                    "/projects/plaiful/2.webp",
                    "/projects/plaiful/3.webp",
                    "/projects/plaiful/4.webp",
                    "/projects/plaiful/5.webp", 
                    "/projects/plaiful/6.webp" 
                ],
                previewVideos: [
                    "https://video-proxy-worker.alvs131313.workers.dev/plaiful-video-4k/output.m3u8"
                ]
            },
            {
                title: "Zambia Casino",
                description:
                    "Built for a client, Zambia Casino is a sleek landing page for an online casino targeting the Zambian market. I designed and developed a responsive, high-performance site that effectively showcases the casino's offerings, promotions, and games. The project emphasizes strong visual elements, fast loading times, and intuitive navigation to optimize user engagement and conversion rates in the competitive online gambling space.",
                logo: "/projects/zambia/zambia-logo.webp",
                thumbnail: "/projects/zambia/zambia-thumbnail.webp",
                repoLink: "",
                technologies: [
                    {
                        icon: <RiNextjsFill className="text-[#FFF]" />,
                        name: "Next.js",
                    },
                        
                    {
                        icon: <SiTypescript className="text-[#3178C6]" />,
                        name: "TypeScript",
                    },
                    {
                        icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                        name: "Tailwind CSS",
                    },
                    {
                        icon: <SiFramer className="text-[#0055FF]" />,
                        name: "Framer Motion",
                    },
                    {
                        icon: <SiShadcnui className="text-[#FFF]" />,
                        name: "Shadcn/UI",
                    },
                ],
                link: "https://zambia-casino.vercel.app/",
                previewImages: [
                    "/projects/zambia/1.webp",
                    "/projects/zambia/2.webp",
                    "/projects/zambia/3.webp",
                    "/projects/zambia/4.webp",
                    "/projects/zambia/5.webp",
                    "/projects/zambia/6.webp",
                    "/projects/zambia/7.webp"
                ],
                previewVideos: [
                    "https://video-proxy-worker.alvs131313.workers.dev/zambia-video-4k/output.m3u8"
                ]
            },
        ],
        technologies: {
            main: [
                {
                    name: "Next.js",
                    icon: <RiNextjsFill className="text-[#FFF]" />,
                    description: "A React framework",
                },
                
                {
                    name: "React",
                    icon: <SiReact className="text-[#61DAFB]" />,
                    description: "A JavaScript UI library",
                },
                {
                    name: "Vercel",
                    icon: <SiVercel className="text-[#FFF]" />,
                    description: "Platform for frontend frameworks",
                },
                
                {
                    name: "Tailwind CSS",
                    icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                    description: "A CSS framework",
                },
                                {
                    name: "PHP",
                    icon: <SiPhp className="text-[#777BB4]" />,
                    description: "A popular general-purpose scripting language",
                },
                {
                    name: "Angular",
                    icon: <SiAngular className="text-[#DD0031]" />,
                    description: "A TypeScript web application framework", // Can be removed if in 'other'
                },
                
                {
                    name: "TypeScript",
                    icon: <SiTypescript className="text-[#3178C6]" />,
                    description: "Typed Javascript",
                },
                {
                    name: "Git",
                    icon: <SiGit className="text-[#F05032]" />,
                    description: "A version control system",
                },
            {
                    name: "Laravel",
                    icon: <SiLaravel className="text-[#FF2D20]" />,
                    description: "A PHP web application framework",
                },
                {
                    name: "Prisma",
                    icon: <SiPrisma className="text-[#4a5b77]" />,
                    description: "An ORM for databases",
                },
                {
                    name: "WordPress",
                    icon: <RiWordpressFill className="text-[#21759B]" />,
                    description: "A CMS for websites",
                },
                {
                    name: "Express.js",
                    icon: <SiExpress className="text-[#FFF]" />, // ORIGINALLY BLACK
                    description: "A Node.js framework",
                },
                {
                    name: "Puppeteer",
                    icon: <SiPuppeteer className="text-[#7a56f1]" />,
                    description: "A library for browser automation",
                },
            ],
            other: [
                {
                    name: "HTML5",
                    icon: <SiHtml5 className="text-[#E34F26]" />,
                },
                {
                    name: "CSS",
                    icon: <SiCss3 className="text-[#009df7]" />,
                },
                {
                    name: "JavaScript",
                    icon: <SiJavascript className="text-[#F7DF1E]" />,
                },
                {
                    name: "NodeJS",
                    icon: <SiNodedotjs className="text-[#339933]" />,
                },
                {
                    name: "PHP",
                    icon: <SiPhp className="text-[#5d6dad]" />,
                },
                {
                    name: "MySQL",
                    icon: <SiMysql className="text-[#5798ca]" />,
                },
                {
                    name: "Supabase",
                    icon: <SiSupabase className="text-[#0084d4]" />,
                },
                {
                    name: "MongoDB",
                    icon: <SiMongodb className="text-[#47A248]" />,
                },
                {
                    name: "Redis",
                    icon: <DiRedis className="text-[#DC382D]" />,
                },
                {
                    name: "GraphQL",
                    icon: <SiGraphql className="text-[#E10098]" />,
                },
                {
                    name: "RESTful API",
                    icon: <TbApi className="text-[#FF5733]" />,
                },
                {
                    name: "Framer Motion",
                    icon: <SiFramer className="text-[#0055FF]" />,
                },
                {
                    name: "Three.js",
                    icon: <SiThreedotjs className="text-[#FFF]" />, // ORIGINALLY BLACK
                },
                {
                    name: "WooCommerce",
                    icon: <SiWoocommerce className="text-[#96588A]" />,
                },
                {
                    name: "GitHub Actions",
                    icon: <SiGithubactions className="text-[#2670e0]" />,
                    description: "CI/CD automation platform",
                },
                {
                    name: "React Native",
                    icon: <TbBrandReactNative className="text-[#61DAFB]" />,
                },
                {
                    name: "Electron",
                    icon: <SiElectron className="text-[#47848F]" />,
                },
                {
                    name: "Docker",
                    icon: <SiDocker className="text-[#2496ED]" />,
                },
                {
                    name: "Shadcn/UI",
                    icon: <SiShadcnui className="text-[#FFF]" />,
                },
                {
                    name: "Drizzle",
                    icon: <SiDrizzle className="text-[#00A7E1]" />,
                },
            ],
        },
    },
};
