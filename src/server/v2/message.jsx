/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';

import { buildContentLabel } from './utils/buildContentLabel';
import { buildLogoConfiguration } from './utils/buildLogoConfiguration';
import { resolveLogoPresentation } from './utils/resolveLogoPresentation';
import { mapClasses } from './utils/mapClasses';
import { renderBlock, renderLogoImages } from './utils/renderBlock';
import { getLogoBrandClass } from './logos';
import FlexMessage from './flex';
import styles from './styles';

// Deferred v6-parity behaviors (not yet ported — unknown block types/fields fall through
// to plain text or are dropped, never throwing or producing broken markup):
// - TEXT_VARIABLE blocks / missing-text placeholders (v6-specific content type)
// - "**bold**" marker rendering within TEXT blocks
// - Card-offer logo overrides for PAYPAL_CASHBACK_MASTERCARD / PAYPAL_DEBIT_CARD

const textLinkOptions = { linkClassName: 'action__link' };

function renderInlineMain(blocks, mainClasses, mainLabel, logoPresentation) {
    return (
        <span className={`${mainClasses} inline-content`} aria-label={mainLabel}>
            {blocks.map((item, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={idx}>
                    {renderBlock(item, {
                        ...textLinkOptions,
                        logoPresentation: item.type === 'IMAGE' ? logoPresentation : null
                    })}
                </Fragment>
            ))}
        </span>
    );
}

function renderLogoSpan(block, className, logoPresentation) {
    if (!block) return null;
    const brandClass = getLogoBrandClass({
        logoName: block.name,
        alternativeText: block.alternative_text
    });
    return (
        <span
            role="img"
            aria-label={block.alternative_text || 'PayPal'}
            className={[className, brandClass].filter(Boolean).join(' ')}
        >
            {renderLogoImages(block, logoPresentation)}
        </span>
    );
}

export default function V2Message({ options, v2Content, log }) {
    const { style } = options;

    if (style.layout === 'flex') {
        return <FlexMessage style={style} v2Content={v2Content} />;
    }

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

    const linkActionItems = actionItems.filter(item => item.type === 'LINK');
    const nonLinkActionItems = actionItems.filter(item => item.type !== 'LINK');
    const appendBlocks = (blocks, items) => {
        if (items.length === 0) {
            return blocks;
        }

        return blocks.length === 0 ? items : [...blocks, { type: 'TEXT', text: ' ' }, ...items];
    };
    const preparedMainBlocks = appendBlocks(appendBlocks(mainBlocks, disclaimerItems), nonLinkActionItems);

    const logoClasses = mapClasses({
        logo: true,
        [textColor]: true,
        [effectiveLogoPosition]: effectiveLogoPosition !== 'inline',
        [effectiveLogoType]: true
    });
    const mainClasses = mapClasses({ main: true, [effectiveLogoPosition]: true, [textColor]: true });
    const actionClasses = mapClasses({ action: true, [textColor]: true });

    const mainLabel = buildContentLabel(preparedMainBlocks);
    const actionLabel = buildContentLabel(linkActionItems);

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
            {inlineLogoPresentation ? (
                renderInlineMain(preparedMainBlocks, mainClasses, mainLabel, inlineLogoPresentation)
            ) : (
                <span aria-label={mainLabel} className={mainClasses}>
                    {preparedMainBlocks.map((item, idx) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={idx}>{renderBlock(item, textLinkOptions)}</Fragment>
                    ))}
                </span>
            )}
            {linkActionItems.length > 0 ? (
                <>
                    {' '}
                    <span aria-label={actionLabel} className={actionClasses}>
                        {linkActionItems.map((item, idx) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={idx}>{renderBlock(item, textLinkOptions)}</Fragment>
                        ))}
                    </span>
                </>
            ) : null}
            {hasRightLogo ? renderLogoSpan(logoBlock, logoClasses, logoPresentation) : null}
        </div>
    );
}
