/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';

import { buildContentLabel } from './utils/buildContentLabel';
import { buildLogoConfiguration } from './utils/buildLogoConfiguration';
import { resolveLogoPresentation } from './utils/resolveLogoPresentation';
import { mapClasses } from './utils/mapClasses';
import { resolveLogoAssets } from './logos';
import styles from './styles';

// Mirrors the `.pp-message img` / `.pp-message .logo.<position> img` rules in styles.js as
// inline styles, so logo sizing/alignment survives even if a host strips or overrides the
// embedded <style> tag (e.g. HTML sanitization) — without this, images fall back to their
// raw intrinsic width/height and render oversized and misaligned.
function getLogoImageStyle(effectiveLogoPosition) {
    const base = { maxHeight: '1.25em', height: '1.25em', width: 'auto', verticalAlign: 'middle' };
    if (effectiveLogoPosition === 'right') {
        return { ...base, marginRight: 0, marginLeft: '0.3125em' };
    }
    if (effectiveLogoPosition === 'top') {
        return { ...base, marginRight: 0, marginBottom: '0.3125em' };
    }
    if (effectiveLogoPosition === 'inline') {
        return { ...base, marginRight: 0 };
    }
    return { ...base, marginRight: '0.3125em' };
}

// Renders local brand assets for first-party logos (paypal_logo, paypal_credit_logo).
// Falls back to item.source_url for unknown image blocks.
function renderLogoImages(item, logoPresentation) {
    const assets = resolveLogoAssets({
        logoName: item.name,
        effectiveLogoType: logoPresentation.effectiveLogoType,
        effectiveLogoPosition: logoPresentation.effectiveLogoPosition,
        textColor: logoPresentation.textColor
    });
    const imageStyle = getLogoImageStyle(logoPresentation.effectiveLogoPosition);

    if (assets) {
        return assets.map(({ src, dimensions: [width, height] }, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <img key={idx} src={src} alt="" role="presentation" width={width} height={height} style={imageStyle} />
        ));
    }

    return <img src={item.source_url} alt={item.alternative_text || 'PayPal'} style={imageStyle} />;
}

// Deferred v6-parity behaviors (not yet ported — unknown block types/fields fall through
// to plain text or are dropped, never throwing or producing broken markup):
// - TEXT_VARIABLE blocks / missing-text placeholders (v6-specific content type)
// - "**bold**" marker rendering within TEXT blocks
// - Card-offer logo overrides for PAYPAL_CASHBACK_MASTERCARD / PAYPAL_DEBIT_CARD

// renderBlock renders a single CPS content block.
// When logoPresentation is provided, IMAGE blocks render as inline brand logos
// in CPS order (v6 parity for logo.type:inline). Without it, IMAGE falls back
// to a plain img — callers that extract the logo block before the loop should
// pass null so IMAGE items are never double-rendered.
//
// Note: LINK blocks intentionally render as <span>, not <a>. The v5 SDK message
// click surface is the canonical click handler; click_url is not used for navigation.
function renderBlock(item, logoPresentation) {
    if (!item) return null;
    switch (item.type) {
        case 'IMAGE':
            if (logoPresentation) {
                return (
                    <span role="img" aria-label={item.alternative_text || 'PayPal'} className="logo inline wordmark">
                        {renderLogoImages(item, logoPresentation)}
                    </span>
                );
            }
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

function renderLogoSpan(block, className, logoPresentation) {
    if (!block) return null;
    return (
        <span role="img" aria-label={block.alternative_text || 'PayPal'} className={className}>
            {renderLogoImages(block, logoPresentation)}
        </span>
    );
}

export default function V2Message({ options, v2Content, log }) {
    const { style } = options;
    const textColor = style.text?.color ?? 'black';

    const logoPresentation = resolveLogoPresentation({
        logoType: style.logo?.type,
        logoPosition: style.logo?.position,
        textColor,
        log
    });

    const { effectiveLogoType, effectiveLogoPosition, originalLogoType, originalLogoPosition } = logoPresentation;

    const mainItems = v2Content?.main_items ?? [];
    const actionItems = v2Content?.action_items ?? [];
    const disclaimerItems = v2Content?.disclaimer_items ?? [];

    const { logoBlock, hasInitialLogo, hasRightLogo, mainBlocks } = buildLogoConfiguration({
        effectiveLogoType,
        effectiveLogoPosition,
        mainItems
    });

    const preparedMainBlocks =
        disclaimerItems.length > 0 ? [...mainBlocks, { type: 'TEXT', text: ' ' }, ...disclaimerItems] : mainBlocks;

    const logoClasses = mapClasses({
        logo: true,
        [textColor]: true,
        [effectiveLogoPosition]: effectiveLogoPosition !== 'inline',
        [effectiveLogoType]: true
    });
    const mainClasses = mapClasses({ main: true, [effectiveLogoPosition]: true, [textColor]: true });
    const actionClasses = mapClasses({ action: true, [textColor]: true });

    const mainLabel = buildContentLabel(preparedMainBlocks);
    const actionLabel = buildContentLabel(actionItems);

    // For inline mode, IMAGE blocks in mainBlocks render in-place via renderBlock.
    // For all other modes, logoPresentation is null so IMAGE blocks render as plain imgs.
    const inlineLogoPresentation = effectiveLogoPosition === 'inline' ? logoPresentation : null;

    return (
        <div
            className="pp-message"
            data-pp-style-layout={style.layout}
            data-pp-style-logo-position={originalLogoPosition}
            data-pp-style-logo-type={originalLogoType}
            data-pp-style-text-align={style.text?.align}
            data-pp-style-text-color={textColor}
            data-pp-style-text-size={style.text?.size}
        >
            {/* eslint-disable react/no-danger */}
            <style
                dangerouslySetInnerHTML={{
                    __html: styles({
                        fontFamily: style.text?.fontFamily,
                        fontSource: style.text?.fontSource,
                        fontSize: style.text?.size,
                        textAlign: style.text?.align
                    })
                }}
            />
            {/* eslint-enable react/no-danger */}
            {hasInitialLogo ? renderLogoSpan(logoBlock, logoClasses, logoPresentation) : null}
            <span aria-label={mainLabel} className={mainClasses}>
                {preparedMainBlocks.map((item, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={idx}>{renderBlock(item, inlineLogoPresentation)}</Fragment>
                ))}
            </span>
            {actionItems.length > 0 ? (
                <span aria-label={actionLabel} className={actionClasses}>
                    {actionItems.map((item, idx) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={idx}>{renderBlock(item, null)}</Fragment>
                    ))}
                </span>
            ) : null}
            {hasRightLogo ? renderLogoSpan(logoBlock, logoClasses, logoPresentation) : null}
        </div>
    );
}
