/** @jsx h */
import { h } from 'preact';

export function renderBlock(item) {
    if (!item) return null;
    switch (item.type) {
        case 'IMAGE':
            return <img src={item.source_url} alt={item.alternative_text || 'PayPal'} />;
        case 'LINK':
            return (
                <span
                    data-iframe-url={item.click_url}
                    data-embeddable={item.embeddable !== undefined ? String(item.embeddable) : undefined}
                >
                    {item.text}
                </span>
            );
        case 'TEXT':
        default:
            return item.text;
    }
}
