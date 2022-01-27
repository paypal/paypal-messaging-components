/** @jsx h */
import { h } from 'preact';

// Create text with links scattered within it
const InlineLinks = ({ text }) => {
    if (!Array.isArray(text)) {
        return text;
    }
    return text.map(textChunk => {
        if (Array.isArray(textChunk)) {
            const [linkText, linkUrl] = textChunk;
            if (typeof linkUrl !== 'undefined') {
                // if the next chunk is an array with two strings, use the second string as the href for the first
                return (
                    <a target="__blank" href={linkUrl}>
                        {linkText}
                    </a>
                );
            }
        }
        return <span>{textChunk}</span>;
    });
};

export default InlineLinks;
