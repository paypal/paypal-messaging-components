/** @jsx h */
import { h } from 'preact';

import { useXProps, useServerData, useDisclosureView } from '../lib';
import { ppDebug } from '../../../../utils/debug';

const shouldUseInlineDisclosure = views => {
    const useInlineDisclosure = Array.isArray(views) && views.some(view => view?.meta?.useInlineDisclosure === 'true');
    ppDebug(`InlineLinks: useInlineDisclosure content? ${useInlineDisclosure}`);

    return useInlineDisclosure;
};

// Create text with links scattered within it
const InlineLinks = ({ text, useNewCheckoutDesign }) => {
    const { onClick } = useXProps();
    const { views } = useServerData();
    const { openDisclosure } = useDisclosureView();

    if (!Array.isArray(text)) {
        // eslint-disable-next-line react/no-danger
        return <span dangerouslySetInnerHTML={{ __html: text }} />;
    }
    return text.map(textChunk => {
        if (Array.isArray(textChunk)) {
            const [linkText, linkUrl, linkLabel] = textChunk;
            if (typeof linkUrl !== 'undefined') {
                // if the next chunk is an array with two strings, use the second string as the href for the first
                return (
                    // class name is singular because it is applied to a single link

                    <a
                        // Fallback can be removed after all translations added to the content
                        aria-label={linkLabel ?? `${linkText}, opens new tab.`}
                        target="__blank"
                        // className="inline-link"
                        className={`inline-link ${useNewCheckoutDesign === 'true' ? 'checkout' : ''}`}
                        href={linkUrl}
                        onClick={event => {
                            // Some integrations (e.g. Apple Wallet's webview) have no way to intercept and present
                            // the link themselves, so show it inline instead of navigating away. All other
                            // integrations keep the default browser tab behavior.
                            if (shouldUseInlineDisclosure(views)) {
                                event.preventDefault();
                                openDisclosure(linkUrl);
                            }

                            onClick({
                                // Remove trailing punctuation if it exists
                                linkName: linkText.replace(/[^\w]$/, ''),
                                src: 'link_click',
                                url: linkUrl
                            });
                        }}
                    >
                        {linkText.trim()}
                    </a>
                );
            }
        }
        // eslint-disable-next-line react/no-danger
        return <span dangerouslySetInnerHTML={{ __html: textChunk.replace(/\D00\s?(EUR|€)/g, ' €') }} />;
    });
};

export default InlineLinks;
