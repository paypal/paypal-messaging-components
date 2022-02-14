/** @jsx h */
import { h } from 'preact';

import { useXProps } from '../lib';

// Create text with links scattered within it
const InlineLinks = ({ text }) => {
    const { onClick } = useXProps();

    if (!Array.isArray(text)) {
        return text;
    }
    return text.map(textChunk => {
        if (Array.isArray(textChunk)) {
            const [linkText, linkUrl] = textChunk;
            if (typeof linkUrl !== 'undefined') {
                // if the next chunk is an array with two strings, use the second string as the href for the first
                return (
                    // class name is singular because it is applied to a single link
                    <a
                        target="__blank"
                        className="inline-link"
                        href={linkUrl}
                        onClick={() => {
                            onClick({
                                // Remove trailing punctuation if it exists
                                linkName: linkText.replace(/[^\w]$/, ''),
                                src: 'link_click'
                            });
                        }}
                    >
                        {linkText}
                    </a>
                );
            }
        }
        return <span>{textChunk}</span>;
    });
};

export default InlineLinks;
