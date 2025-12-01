// File: src/app/utils/helpers.ts
import he from "he";

/**
 * Formats the ISO date string from your API to "Month Day, Year".
 * @param dateString The date in ISO format (e.g., "2024-10-18T10:00:00Z").
 * @returns The formatted date string or an empty string on failure.
 */
export function formatBlogDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        
        // Check if the date object is valid before formatting
        if (isNaN(date.getTime())) {
            throw new Error("Invalid Date Object");
        }
        
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (e) {
        console.error("Date formatting failed for:", dateString, e);
        // Fallback to the YYYY-MM-DD format if date formatting fails
        return dateString.split('T')[0] || ''; 
    }
}

/**
 * Removes HTML tags and decodes HTML entities (e.g., &amp; -> &).
 * 
 * NOTE: This function now safely handles inputs that might be null or undefined,
 * returning an empty string in those cases to prevent runtime errors.
 * 
 * @param html The HTML string (e.g., blog excerpt) or potentially null/undefined value.
 * @returns The cleaned, plain text string.
 */
export function stripHtmlAndDecode(html: string | undefined | null): string {
    // Add this safety check for null/undefined inputs
    if (html == null) {
        return '';
    }
    
    // 1. Remove HTML tags using a robust global regex
    const textWithoutTags = html.replace(/<[^>]*>?/g, '');
    
    // 2. Decode HTML entities (e.g., &quot;, ')
    const decodedText = he.decode(textWithoutTags);
    
    // 3. Trim leading/trailing whitespace
    return decodedText.trim();
}
