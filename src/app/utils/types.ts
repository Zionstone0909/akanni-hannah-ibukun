// File: src/app/utils/types.ts

// --- Core Data Structures ---

/**
 * Interface for the nested text fields that your Netlify function produces, 
 * like title, content, and excerpt.
 */
export interface TRendered {
    /** The actual HTML or text content. */
    rendered: string;
}

/**
 * Interface for the simple tag objects used inside the _embedded structure.
 */
export interface TTag {
    /** The display name of the tag (e.g., "Next.js"). */
    name: string;
}


// --- Relational Data Structure (_embedded) ---

/**
 * Interface for the minimal embedded data required for tags/keywords.
 * This structure MUST match the output of your Netlify function's toWordPressShape().
 */
export interface TPostEmbedded {
    /** An array of arrays holding categories (index 0) and tags (index 1). */
    'wp:term'?: [
        Array<any>, // Position [0]: Reserved/Categories (can be empty)
        Array<TTag> // Position [1]: The list of tags
    ];
    // Removed complex media/links/meta as they are likely not needed by your app
}


// --- Main Blog Post Type ---

/**
 * The core type for a Blog Post object (TPost).
 * This defines the required data shape for both the list page and the single post page.
 */
export type TPost = {
    /** The URL-friendly unique identifier (required for routing). */
    slug: string;
    
    /** The post date in ISO string format (e.g., "2024-10-18T10:00:00Z"). */
    date: string; 
    
    /** The post title (nested). */
    title: TRendered;

    /** The full post content (nested). */
    content: TRendered;

    /** The short summary/excerpt (nested). */
    excerpt: TRendered;
    
    /** The optional embedded data, primarily used to extract tags for metadata. */
    _embedded?: TPostEmbedded; 
};


// --- Aliases for Component Use ---

/**
 * Type alias for the specific post structure expected by the single blog page, 
 * ensuring compatibility with the rest of your application's types (TLocalPost).
 */
export type TLocalPost = TPost;