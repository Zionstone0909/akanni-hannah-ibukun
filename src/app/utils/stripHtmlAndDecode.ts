// File: src/app/utils/stripHtmlAndDecode.ts

/**
 * Safely strips HTML tags and decodes entities from a string.
 * This resolves the Uncaught TypeError by ensuring 'text' is a string before calling .replace().
 * * @param {string | undefined | null} text - The string to process (e.g., blog content).
 * @returns {string} The cleaned string, or an empty string if input is invalid.
 */
export function stripHtmlAndDecode(text: string | undefined | null): string {
  // CRITICAL FIX: If 'text' is undefined, null, or not a string, return a safe empty string.
  if (!text || typeof text !== 'string') {
    return ''; 
  }

  // Safely call replace() now that 'text' is confirmed to be a string.
  const withoutHtml = text.replace(/<[^>]*>?/gm, '');

  // Add any necessary decoding logic here (e.g., using a library like 'he' or 'lodash.unescape')
  // const decoded = decode(withoutHtml);

  return withoutHtml;
}