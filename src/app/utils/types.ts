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
 * Local post type used by the frontend (Homepage, Post page, etc.).
 * This is the **flattened** version of TPost after transformation.
 */
export interface TLocalPost {
    /** The post date in ISO string format. */
    date: string;

    /** The simplified string title. */
    title: string;

    /** URL slug for routing. */
    slug: string;

    /** Full HTML content (string). */
    content: string;

    /** Excerpt (string). */
    excerpt: string;

    /** Simple list of tag names (after extraction). */
    tags: string[];

    /** Numeric ID generated or passed from the API. */
    id: number;
}
