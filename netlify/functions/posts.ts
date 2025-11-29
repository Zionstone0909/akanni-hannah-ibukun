// netlify/functions/posts.ts
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

// Mock blog data
const blogs = [
  { slug: 'first-post', title: 'First Post', content: 'Hello world!' },
  { slug: 'second-post', title: 'Second Post', content: 'Another blog post.' },
];

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const slug = event.queryStringParameters?.slug;

    if (slug) {
      const blog = blogs.find(b => b.slug === slug);
      if (!blog) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Blog not found' }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(blog),
      };
    }

    // Return all blogs if no slug
    return {
      statusCode: 200,
      body: JSON.stringify(blogs),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error }),
    };
  }
};
