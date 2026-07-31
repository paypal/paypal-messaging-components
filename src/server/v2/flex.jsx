/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';

import { buildContentLabel } from './utils/buildContentLabel';
import { renderBlock } from './utils/renderBlock';
import { getLogoBrandClass, resolveLogoAssets } from './logos';
import flexStyles from './flexStyles';
import { FLEX_COLOR_TO_LOGO_TEXT_COLOR, FLEX_DEFAULTS } from './constants';

function renderFlexLogo(logoBlock, flexColor) {
    const textColor = FLEX_COLOR_TO_LOGO_TEXT_COLOR[flexColor] ?? 'white';
    const brandClass = getLogoBrandClass({
        logoName: logoBlock.name,
        alternativeText: logoBlock.alternative_text
    });
    const logoClassName = `pp-flex__logo ${brandClass}`.trim();
    const assets = resolveLogoAssets({
        logoName: logoBlock.name,
        effectiveLogoType: 'wordmark',
        effectiveLogoPosition: 'left',
        textColor
    });

    if (assets) {
        return assets.map(({ src, dimensions: [width, height] }, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={idx} className={logoClassName}>
                <img src={src} alt="" role="presentation" width={width} height={height} />
            </span>
        ));
    }

    return (
        <span className={`pp-flex__logo pp-flex__logo--fallback ${brandClass}`.trim()}>{renderBlock(logoBlock)}</span>
    );
}

export default function FlexMessage({ style, v2Content }) {
    const color = style.color ?? FLEX_DEFAULTS.color;
    const ratio = style.ratio ?? FLEX_DEFAULTS.ratio;

    const mainItems = v2Content?.main_items ?? [];
    const actionItems = v2Content?.action_items ?? [];
    const disclaimerItems = v2Content?.disclaimer_items ?? [];

    const logoBlock = mainItems.find(item => item.type === 'IMAGE');
    const mainBlocks = mainItems.filter(item => item.type !== 'IMAGE');

    const mainLabel = buildContentLabel(mainBlocks);
    const actionLabel = buildContentLabel(actionItems);

    return (
        <div
            className={`pp-message pp-flex ${color} r-${ratio}`}
            data-pp-style-layout="flex"
            data-pp-style-color={color}
            data-pp-style-ratio={ratio}
        >
            {/* eslint-disable react/no-danger */}
            <style
                dangerouslySetInnerHTML={{
                    __html: flexStyles({
                        fontFamily: style.text?.fontFamily,
                        fontSource: style.text?.fontSource,
                        ratio
                    })
                }}
            />
            {/* eslint-enable react/no-danger */}
            <div className="pp-flex__background" />
            <div className="pp-flex__content">
                {logoBlock ? (
                    <div className="pp-flex__logo-container" aria-hidden="true">
                        {renderFlexLogo(logoBlock, color)}
                    </div>
                ) : null}
                <div className="pp-flex__messaging">
                    <div aria-label={mainLabel} className="pp-flex__main">
                        {mainBlocks.map((item, idx) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={idx}>{renderBlock(item)}</Fragment>
                        ))}
                    </div>
                    {actionItems.length > 0 ? (
                        <div aria-label={actionLabel} className="pp-flex__action">
                            {actionItems.map((item, idx) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <Fragment key={idx}>{renderBlock(item)}</Fragment>
                            ))}
                        </div>
                    ) : null}
                    {disclaimerItems.length > 0 ? (
                        <div className="pp-flex__disclaimer">
                            {disclaimerItems.map((item, idx) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <Fragment key={idx}>{renderBlock(item)}</Fragment>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
