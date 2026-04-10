/**
 * FAQ URL configuration and utility for generating help links
 * Used in warning messages to direct merchants to troubleshooting documentation
 */

// Topic-to-path mapping for FAQ sections
const FAQ_PATHS = {
    RENDERING: '/integrate/#enable-pay-later-messaging-on-your-website',
    GENERAL: '/integrate/reference/'
};

/**
 * Generate FAQ URL for a given topic
 * @param {string} topic - The FAQ topic identifier
 * @returns {string} Full URL to the FAQ section
 */
export function getFaqUrl(topic) {
    // Normalize base URL before concatenation to avoid double slashes (e.g., base/ + /path = base//path)
    const basePath = (
        __MESSAGES__?.__FAQ__?.__BASE_URL__ ?? 'https://developer.paypal.com/docs/checkout/pay-later/us'
    ).replace(/\/$/, '');
    const path = FAQ_PATHS[topic] ?? FAQ_PATHS.GENERAL;
    return `${basePath}${path}`;
}
