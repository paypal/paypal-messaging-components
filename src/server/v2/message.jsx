/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';

import { buildContentLabel } from './utils/buildContentLabel';
import { buildLogoConfiguration } from './utils/buildLogoConfiguration';
import { mapClasses } from './utils/mapClasses';
import styles from './styles';

function renderBlock(item) {
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

export default function V2Message({ options, v2Content }) {
    const { style } = options;
    const logoPosition = style.logo?.type === 'inline' ? 'inline' : style.logo?.position ?? 'left';
    const logoType = style.logo?.type ?? 'primary';
    const textColor = style.layout === 'flex' ? style.color ?? 'black' : style.text?.color ?? 'black';

    const mainItems = v2Content?.main_items ?? [];
    const actionItems = v2Content?.action_items ?? [];
    const disclaimerItems = v2Content?.disclaimer_items ?? [];

    const { logoBlock, hasInitialLogo, hasRightLogo, mainBlocks } = buildLogoConfiguration({
        logoPosition,
        mainItems
    });

    const preparedMainBlocks =
        disclaimerItems.length > 0 ? [...mainBlocks, { type: 'TEXT', text: ' ' }, ...disclaimerItems] : mainBlocks;

    const logoClasses = mapClasses({ logo: true, [textColor]: true, [logoPosition]: true, [logoType]: true });
    const mainClasses = mapClasses({ main: true, [logoPosition]: true, [textColor]: true });
    const actionClasses = mapClasses({ action: true, [textColor]: true });

    const mainLabel = buildContentLabel(preparedMainBlocks);
    const actionLabel = buildContentLabel(actionItems);

    return (
        <div className="pp-message">
            {/* eslint-disable react/no-danger */}
            <style
                dangerouslySetInnerHTML={{
                    __html: styles({
                        fontFamily: style.text?.fontFamily,
                        fontSize: style.text?.size,
                        textAlign: style.text?.align
                    })
                }}
            />
            {/* eslint-enable react/no-danger */}
            {hasInitialLogo && logoBlock && logoType !== 'none' ? (
                <span role="img" aria-label={logoBlock.alternative_text || 'PayPal'} className={logoClasses}>
                    {renderBlock(logoBlock)}
                </span>
            ) : null}
            <span aria-label={mainLabel} className={mainClasses}>
                {preparedMainBlocks.map((item, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={idx}>{renderBlock(item)}</Fragment>
                ))}
            </span>
            {actionItems.length > 0 ? (
                <span aria-label={actionLabel} className={actionClasses}>
                    {actionItems.map((item, idx) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={idx}>{renderBlock(item)}</Fragment>
                    ))}
                </span>
            ) : null}
            {hasRightLogo && logoBlock && logoType !== 'none' ? (
                <span role="img" aria-label={logoBlock.alternative_text || 'PayPal'} className={logoClasses}>
                    {renderBlock(logoBlock)}
                </span>
            ) : null}
        </div>
    );
}
