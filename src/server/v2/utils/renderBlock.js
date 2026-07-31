/** @jsx h */
import { h } from 'preact';

import { getLogoBrandClass, resolveLogoAssets } from '../logos';

// Renders local brand assets for first-party logos (paypal_logo, paypal_credit_logo, venmo).
// Falls back to item.source_url for unknown image blocks.
export function renderLogoImages(item, logoPresentation) {
    const assets = resolveLogoAssets({
        logoName: item.name,
        effectiveLogoType: logoPresentation.effectiveLogoType,
        effectiveLogoPosition: logoPresentation.effectiveLogoPosition,
        textColor: logoPresentation.textColor
    });

    if (assets) {
        return assets.map(({ src, dimensions: [width, height] }, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <img key={idx} src={src} alt="" role="presentation" width={width} height={height} />
        ));
    }

    return <img src={item.source_url} alt={item.alternative_text || 'PayPal'} />;
}

/**
 * Renders a single CPS content block for text or flex layouts.
 *
 * @param {object} item CPS content block
 * @param {object} [options]
 * @param {object|null} [options.logoPresentation] When set, IMAGE blocks render as
 *   inline brand logos (text layout logo.type:inline). Pass null/omit for plain img.
 * @param {string} [options.linkClassName] Optional class for LINK spans (e.g. action__link).
 */
export function renderBlock(item, { logoPresentation = null, linkClassName } = {}) {
    if (!item) return null;

    switch (item.type) {
        case 'IMAGE':
            if (logoPresentation) {
                const brandClass = getLogoBrandClass({
                    logoName: item.name,
                    alternativeText: item.alternative_text
                });
                const className = ['logo', 'inline', 'wordmark', brandClass].filter(Boolean).join(' ');
                return (
                    <span role="img" aria-label={item.alternative_text || 'PayPal'} className={className}>
                        {renderLogoImages(item, logoPresentation)}
                    </span>
                );
            }
            return <img src={item.source_url} alt={item.alternative_text || 'PayPal'} />;
        case 'LINK':
            return linkClassName ? <span className={linkClassName}>{item.text}</span> : <span>{item.text}</span>;
        case 'TEXT':
            return item.brand ? <strong>{item.text}</strong> : item.text;
        default:
            return item.text;
    }
}
