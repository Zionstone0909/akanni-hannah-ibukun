import { Handler } from "@netlify/functions";

// --- Custom Data Structure ---

/**
 * The raw, simplified structure of your blog data source.
 */
interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  date: string; // ISO date string for sorting and display
}

// --- Mock Data ---

// Your raw custom blog data (20 posts, with dates between 2023-2025)
const blogs: BlogPost[] = [
    {
        slug: "why-nextjs-seo-performance",
        title: "Why Next.js is the Ultimate Framework for SEO and Performance Optimization",
        content: "<p>Next.js is one of the most powerful frameworks for building modern web applications, especially when it comes to SEO (Search Engine Optimization). In an increasingly competitive digital landscape, where search engine rankings can make or break a website, the right tools for optimizing SEO are crucial—and Next.js delivers on every front.</p><p>Key features include Server Components for reduced client-side JavaScript, Image Optimization components, and built-in sitemap generation, all contributing to better core web vitals.</p>",
        excerpt: "Next.js is one of the most powerful frameworks for building modern web applications, especially when it comes to SEO (Search Engine Optimization). In an increasingly competitive digital landscape, where search engine rankings can make or break a website, the right tools for optimizing SEO are crucial—and Next.js delivers on every front.",
        tags: ["Next.js", "SEO", "Performance", "WebDev"],
        date: "2025-03-18T10:00:00Z", // March 18, 2025
    },
    {
        slug: "why-should-you-build-with-nextjs",
        title: "Why Should You Build with Next.js?",
        content: "<p>Next.js has become one of the most popular frameworks for modern web development. With features designed for performance, SEO, and scalability, it’s the go-to choice for developers looking to build robust web applications. In this article, we’ll explore why you should choose Next.js for your next project, and how it can help streamline development. 1. Integrated Routing: No more external router libraries. 2. API Routes: Full-stack capabilities out of the box. 3. Data Fetching Flexibility: Supports SSR, SSG, and ISR.</p>",
        excerpt: "Next.js has become one of the most popular frameworks for modern web development. With features designed for performance, SEO, and scalability, it’s the go-to choice for developers looking to build robust web applications. In this article, we’ll explore why you should choose Next.js for your next project, and how it can help streamline development.",
        tags: ["Next.js", "Scalability", "Frameworks"],
        date: "2025-02-17T10:00:00Z", // February 17, 2025
    },
    {
        slug: "ai-enhance-user-experience",
        title: "Using AI to Enhance User Experience in Web Development",
        content: "<p>AI is revolutionizing web development by enabling more personalized, responsive, and engaging user experiences. In one of my projects, I leveraged several AI-powered features to create a dynamic and user-friendly platform that catered to individual user needs and enhanced overall engagement. Here’s how chatbots, auto-suggestions, and dynamic content personalization played a crucial role in transforming the user journey.</p>",
        excerpt: "AI is revolutionizing web development by enabling more personalized, responsive, and engaging user experiences. In one of my projects, I leveraged several AI-powered features to create a dynamic and user-friendly platform that catered to individual user needs and enhanced overall engagement.",
        tags: ["AI", "UX", "Web Development"],
        date: "2025-01-15T10:00:00Z", // January 15, 2025
    },
    {
        slug: "connecting-prisma-to-nextjs",
        title: "Connecting Prisma to a Next.js App for Full-Stack Development",
        content: "<p>Prisma is an open-source ORM (Object-Relational Mapping) tool that helps developers interact with their databases in a more intuitive and efficient way. It works seamlessly with Next.js to create full-stack applications, allowing you to manage your database directly within your Next.js app. In this guide, we’ll demonstrate how to set up and use Prisma with your Next.js Server Components and API routes.</p>",
        excerpt: "Prisma is an open-source ORM (Object-Relational Mapping) tool that helps developers interact with their databases in a more intuitive and efficient way. It works seamlessly with Next.js to create full-stack applications, allowing you to manage your database directly within your Next.js app.",
        tags: ["Prisma", "Next.js", "Full-Stack", "ORM"],
        date: "2024-12-14T10:00:00Z", // December 14, 2024
    },
    {
        slug: "why-typescript-is-future",
        title: "Why TypeScript is the Future of JavaScript Development",
        content: "<p>JavaScript has long been the standard for building interactive and dynamic web applications, but as applications grow in complexity, so do the challenges associated with maintaining and scaling them. Enter TypeScript, a superset of JavaScript that adds static typing. This feature helps full-stack developers catch errors early and write more maintainable code, dramatically improving team velocity and code quality.</p>",
        excerpt: "JavaScript has long been the standard for building interactive and dynamic web applications, but as applications grow in complexity, so do the challenges associated with maintaining and scaling them. Enter TypeScript...",
        tags: ["TypeScript", "JavaScript", "Front-end"],
        date: "2024-11-11T10:00:00Z", // November 11, 2024
    },
    {
        slug: "mastering-css-grid-flexbox",
        title: "Mastering CSS Grid and Flexbox for Modern Layouts",
        content: "<p>CSS Grid and Flexbox are powerful layout tools that have revolutionized front-end development. Understanding when to use which, and how to combine them effectively, is crucial for building responsive and robust user interfaces without relying on bloated frameworks. Flexbox is great for one-dimensional layouts (rows or columns), while Grid excels at two-dimensional layouts.</p>",
        excerpt: "Learn how to effectively use CSS Grid and Flexbox to build modern, responsive layouts without relying on complex external frameworks.",
        tags: ["CSS", "Front-end", "Design", "Tutorial"],
        date: "2024-10-08T10:00:00Z", // October 8, 2024
    },
    {
        slug: "building-restful-apis-with-node-express",
        title: "Building Scalable RESTful APIs with Node.js and Express",
        content: "<p>Node.js and Express remain a popular choice for back-end development due to their speed and flexibility. This post guides you through the process of setting up a scalable API architecture, handling routing, middleware, and connecting a database. We will focus on best practices for resource naming and status code usage.</p>",
        excerpt: "A guide to setting up scalable RESTful APIs using the popular Node.js and Express stack, covering routing, middleware, and database connections.",
        tags: ["Node.js", "Express", "Back-end", "API"],
        date: "2024-09-05T10:00:00Z", // September 5, 2024
    },
    {
        slug: "introduction-to-webassembly-wasm",
        title: "Introduction to WebAssembly (Wasm): A New Era for Web Apps",
        content: "<p>WebAssembly (Wasm) allows you to run high-performance code written in languages like C++, Rust, or Go directly in the browser at near-native speeds. This opens up possibilities for complex applications, such as games or video editors, entirely within a web environment, bypassing JavaScript performance bottlenecks for compute-intensive tasks.</p>",
        excerpt: "Explore the basics of WebAssembly and how it enables high-performance applications written in C++, Rust, or Go to run natively in web browsers.",
        tags: ["WebAssembly", "Wasm", "Performance", "Future Tech"],
        date: "2024-08-01T10:00:00Z", // August 1, 2024
    },
    {
        slug: "optimizing-react-performance-hooks",
        title: "Optimizing React Performance with Hooks and Context",
        content: "<p>React applications can slow down as they grow in complexity. Utilizing built-in Hooks like `useMemo`, `useCallback`, and the Context API correctly are vital techniques for minimizing re-renders and keeping your application fast and responsive. We delve into memoization and dependency arrays.</p>",
        excerpt: "Discover vital techniques for optimizing performance in React applications by leveraging the `useMemo`, `useCallback`, and Context API Hooks effectively.",
        tags: ["React", "Performance", "JavaScript", "Front-end"],
        date: "2024-07-28T10:00:00Z", // July 28, 2024
    },
    {
        slug: "securing-your-web-applications",
        title: "Securing Your Web Applications: Common Vulnerabilities and Best Practices",
        content: "<p>Security should never be an afterthought in web development. This post covers common threats such as XSS, CSRF, and SQL injection, and outlines essential best practices for full-stack developers to protect user data and application integrity, including proper input sanitation and header configuration.</p>",
        excerpt: "A guide for full-stack developers covering common web vulnerabilities (XSS, CSRF, SQL injection) and essential best practices for securing applications.",
        tags: ["Security", "Best Practices", "Full-Stack", "Cybersecurity"],
        date: "2024-07-25T10:00:00Z", // July 25, 2024
    },
    // --- 10 New Posts Added Below (2023-2024 Dates) ---
    {
        slug: "exploring-deno-runtime",
        title: "Exploring the Deno Runtime: Features and Future",
        content: "<p>Deno, created by the same person who made Node.js, offers a secure-by-default runtime for JavaScript and TypeScript. We explore its built-in TypeScript support, secure permissions system, and standard library, which make it an attractive alternative for new projects.</p>",
        excerpt: "A look into the Deno runtime environment, focusing on its security model, built-in TypeScript support, and comparison to Node.js.",
        tags: ["Deno", "Node.js", "Back-end", "JavaScript"],
        date: "2024-05-20T10:00:00Z", // May 20, 2024
    },
    {
        slug: "graphql-vs-rest-choosing-right-architecture",
        title: "GraphQL vs. REST: Choosing the Right Architecture for Your Project",
        content: "<p>Choosing between GraphQL and REST is a key architectural decision. REST is simple and cached easily, while GraphQL allows clients to request exactly the data they need, reducing over-fetching. We provide criteria to help you decide which fits your project's needs better.</p>",
        excerpt: "Compare GraphQL and REST API architectures to determine which approach is best suited for your next web development project.",
        tags: ["API", "GraphQL", "REST", "Architecture"],
        date: "2024-04-15T10:00:00Z", // April 15, 2024
    },
    {
        slug: "getting-started-with-docker-containers",
        title: "Getting Started with Docker: From Development to Deployment",
        content: "<p>Docker containers provide consistency across different environments, solving the 'it works on my machine' problem. This guide covers the basics of creating a Dockerfile and running your first containerized application, simplifying the path from development to production.</p>",
        excerpt: "A beginner's guide to using Docker for consistent development and deployment environments using containers.",
        tags: ["Docker", "DevOps", "Containers", "Deployment"],
        date: "2024-03-10T10:00:00Z", // March 10, 2024
    },
    {
        slug: "the-power-of-static-site-generation-ssg",
        title: "The Power of Static Site Generation (SSG) in the Modern Web",
        content: "<p>Static Site Generators (SSGs) like Next.js, Gatsby, and Astro offer incredible performance benefits, security advantages, and reduced hosting costs by pre-rendering pages at build time. We discuss how this eliminates server-side rendering overhead.</p>",
        excerpt: "Explore the benefits of Static Site Generation for performance, security, and hosting costs using modern frameworks like Next.js.",
        tags: ["SSG", "Performance", "Next.js", "WebDev"],
        date: "2024-02-05T10:00:00Z", // February 5, 2024
    },
    {
        slug: "understanding-authentication-oauth-jwt",
        title: "Understanding Authentication: OAuth, JWT, and Session Management",
        content: "<p>Authentication is a complex topic in full-stack development. We break down the differences between token-based authentication (JWT), authorization flows (OAuth 2.0), and traditional session management, emphasizing security best practices for each method.</p>",
        excerpt: "Breaking down the core concepts of web authentication, including JWT, OAuth 2.0 flows, and session management strategies.",
        tags: ["Security", "Authentication", "Full-Stack", "API"],
        date: "2024-01-01T10:00:00Z", // January 1, 2024
    },
    {
        slug: "state-management-in-react-context-redux-zustand",
        title: "State Management in React: Context API vs. Redux vs. Zustand",
        content: "<p>As React apps grow, managing state becomes challenging. This comparison explores when to use the built-in Context API versus external libraries like Redux or the lightweight Zustand, focusing on performance and ease of development.</p>",
        excerpt: "A comparison of state management solutions in React: built-in Context API, Redux, and the modern, lightweight Zustand library.",
        tags: ["React", "State Management", "Front-end", "JavaScript"],
        date: "2023-11-15T10:00:00Z", // November 15, 2023
    },
    {
        slug: "deploying-to-netlify-ci-cd-pipelines",
        title: "Zero-Downtime Deployment: CI/CD Pipelines with Netlify",
        content: "<p>Netlify simplifies the deployment process immensely. Learn how to set up continuous integration and continuous deployment (CI/CD) pipelines connected directly to your Git repository for automatic builds and previews, ensuring zero-downtime updates.</p>",
        excerpt: "Learn how to set up CI/CD pipelines with Netlify for automatic, zero-downtime deployments straight from your Git repository.",
        tags: ["Netlify", "DevOps", "Deployment", "CI/CD"],
        date: "2023-10-20T10:00:00Z", // October 20, 2023
    },
    {
        slug: "atomic-design-principles-web-development",
        title: "Implementing Atomic Design Principles in Web Development",
        content: "<p>Atomic Design breaks interfaces down into fundamental building blocks (atoms, molecules, organisms, templates, pages) to create scalable and maintainable design systems. This approach speeds up development cycles and ensures consistency across large projects.</p>",
        excerpt: "An overview of implementing Atomic Design principles to create scalable, consistent, and maintainable design systems in your projects.",
        tags: ["Design System", "Front-end", "UX", "Architecture"],
        date: "2023-09-10T10:00:00Z", // September 10, 2023
    },
    {
        slug: "introduction-to-serverless-architecture",
        title: "Introduction to Serverless Architecture and Cloud Functions",
        content: "<p>Serverless architecture allows developers to build and run applications and services without managing infrastructure. We cover AWS Lambda, Netlify Functions, and the benefits of Function-as-a-Service (FaaS), including automatic scaling and reduced operational costs.</p>",
        excerpt: "An introduction to serverless architecture using FaaS platforms like Netlify Functions and AWS Lambda, and the benefits of managed infrastructure.",
        tags: ["Serverless", "Cloud", "Back-end", "Architecture"],
        date: "2023-08-05T10:00:00Z", // August 5, 2023
    },
    {
        slug: "writing-clean-maintainable-code-tips",
        title: "Writing Clean and Maintainable Code: Best Practices for Teams",
        content: "<p>Clean code isn't just about aesthetics; it's about efficiency and collaboration. This post covers naming conventions, function purity, refactoring techniques, and writing self-documenting code that teams can easily understand and maintain, leading to fewer bugs and faster onboarding.</p>",
        excerpt: "Essential best practices for full-stack developers on writing clean, readable, and maintainable code that improves team collaboration and efficiency.",
        tags: ["Best Practices", "Code Quality", "JavaScript", "Full-Stack"],
        date: "2023-07-01T10:00:00Z", // July 1, 2023
    },
];

// --- Transformation Function ---

/**
 * Converts the custom BlogPost structure into the Next.js frontend's expected 
 * nested TPost structure, mimicking a WordPress/REST API output.
 * @param post The raw blog post object.
 * @returns The structured TPost object ready for the frontend.
 */
const toWordPressShape = (post: BlogPost) => ({
  slug: post.slug,
  date: post.date, 
  title: { rendered: post.title },
  content: { rendered: post.content },
  // Use the explicit excerpt or a slice of the content as fallback
  excerpt: { rendered: post.excerpt ?? post.content.slice(0, 140) + '...' }, 
  _embedded: {
    "wp:term": [
      [], // Index 0: Placeholder for Categories
      post.tags?.map((tag) => ({ name: tag })) ?? [] // Index 1: Tags
    ]
  }
});

// --- Netlify Handler ---

export const handler: Handler = async (event) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for local development (CORS)
        "Access-Control-Allow-Methods": "GET, OPTIONS",
    };

    // Handle CORS preflight request
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 204, headers, body: "" };
    }

    if (event.httpMethod !== "GET") {
        return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }
    
  try {
    const slug = event.queryStringParameters?.slug;

    if (slug) {
      // 1. Find a single post by slug
      const raw = blogs.find((b) => b.slug === slug);

      if (!raw) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: `Blog post with slug '${slug}' not found` }),
        };
      }

      // 2. Return the single post wrapped in an array (required by fetchBlog utility)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([toWordPressShape(raw)]),
      };
    }

    // 3. Return all posts
    // Map and then reverse the array so the newest posts appear first in the list.
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(blogs.map(toWordPressShape).reverse()), 
    };
  } catch (err) {
    console.error("Netlify Error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};