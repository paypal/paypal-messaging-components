/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';
import { objectMerge, objectFlattenToArray, curry } from '../../src/utils/server';
import { getMutations, getLocaleStyles, getLocaleClass, getLocaleProductName, getMinimumWidthOptions } from '../locale';
import allStyles from './styles';
import Logo from './parts/Logo';
import MutatedText from './parts/MutatedText';
import Styles from './parts/Styles';
import CustomMessage from './parts/CustomMessage';

const logMessage = val => (val !== 'string' ? JSON.stringify(val) : val);
const logInfo = (addLog, val) => addLog('info', 'render_markup', `${logMessage(val)}`);
const logError = (addLog, val) => addLog('error', 'render_markup', `${logMessage(val)}`);

/**
 * Get all applicable rules based on user flattened options
 * and available rules to cascade
 * @param {Array<String>} flattened Flattened style options
 * @param {any} type Desired return value type
 * @param {Array<Array<any>>} rules Rules to apply the cascade
 * @returns {Object|Array} Applicable rules
 */
const applyCascade = curry((style, flattened, type, rules) =>
    rules.reduce(
        (accumulator, [key, val]) => {
            const split = key.split(' && ');
            if (key === 'default' || split.every(k => flattened.includes(k))) {
                const calculatedVal =
                    typeof val === 'function'
                        ? val({
                              textSize: style.text?.size
                          })
                        : val;
                return type === Array ? [...accumulator, calculatedVal] : objectMerge(accumulator, calculatedVal);
            }

            return accumulator;
        },
        type === Array ? [] : {}
    )
);
const getfontSourceRule = (addLog, val) => {
    if (!val) {
        return '';
    }
    /* eslint-disable-next-line security/detect-unsafe-regex */
    const urlPattern = RegExp(/^(?<url>https?:\/\/.+?\.(?<ext>woff|woff2|otf|tff))$/);
    const fontFormats = {
        woff: 'woff', // woff
        woff2: 'woff2', // woff2
        ttf: 'ttf', // truetype
        otf: 'otf' // opentype
        // eot: 'eot', // embedded opentype
        // svg: 'svg' // svg
    };
    const payload = {
        fontSource: val,
        validValues: [],
        error: null
    };
    try {
        const fontSource = val;
        payload.fontSource = fontSource;
        const ruleVal = (fontSource?.constructor === Array ? fontSource : [fontSource])
            .slice(0, 10)
            .filter(e => typeof e === 'string')
            .map(url => {
                const match = urlPattern.exec(url);
                const extension = match ? match[2] : null;
                const format = fontFormats[extension];
                if (url && format) {
                    payload.validValues.push(url);
                    return `url('${url}') format('${format}')`;
                }
                return '';
            })
            .filter(e => e)
            .join(', ');
        logInfo(addLog, payload);
        return ruleVal ? `src: ${ruleVal};` : '';
    } catch (err) {
        payload.error = err.stack;
        logError(addLog, payload);
        return '';
    }
};
const getFontFamilyRule = (addLog, val) => {
    if (!val) {
        return '';
    }
    const payload = {
        fontFamily: val,
        validValue: null
    };
    /* eslint-disable-next-line security/detect-unsafe-regex */
    const fontPattern = RegExp(/^(?<font>([a-zA-Z0-9._-]\s*)+?)$/);
    const genericFamilies = {
        serif: 'serif',
        'sans-serif': 'sans-serif',
        monospace: 'monospace',
        cursive: 'cursive',
        fantasy: 'fantasy',
        'system-ui': 'system-ui',
        'ui-serif': 'ui-serif',
        'ui-sans-serif': 'ui-sans-serif',
        'ui-monospace': 'ui-monospace',
        math: 'math',
        emoji: 'emoji',
        fangsong: 'fangsong'
    };
    const fontFamily = typeof val === 'string' ? genericFamilies[val] ?? `'${val}'` : '';
    const match = fontPattern.exec(val);
    if (match && fontFamily) {
        payload.validValue = fontFamily;
        logInfo(addLog, payload);
        return `font-family: ${fontFamily}, PayPal-Sans-Big, PayPal-Sans, Arial, sans-serif; `;
    }
    payload.validValue = '';
    logInfo(addLog, payload);
    return '';
};
export default ({ addLog, options, markup, locale }) => {
    const offerType = markup?.meta?.offerType;
    const style =
        options.style.layout === 'text' && options.style.preset === 'smallest'
            ? objectMerge(options.style, getMinimumWidthOptions(locale, offerType))
            : options.style;

    const { layout } = style;

    const styleSelectors = objectFlattenToArray(style);
    const applyCascadeRules = applyCascade(style, styleSelectors);
    const mutationRules =
        options.style.layout === 'custom'
            ? { logo: false, styles: [], headline: [], disclaimer: '' }
            : applyCascadeRules(Object, getMutations(locale, offerType, `layout:${layout}`));

    const layoutProp = `layout:${layout}`;
    const globalStyleRules = applyCascadeRules(Array, allStyles[layoutProp]);

    const localeClass = getLocaleClass(locale, offerType);
    // Scope all locale-specific styles to the selected locale
    const localeStyleRules = applyCascadeRules(Array, getLocaleStyles(locale, layoutProp, offerType)).map(rule =>
        rule.replace(/\.message/g, `.${localeClass} .message`)
    );
    const mutationStyleRules = mutationRules.styles ?? [];
    const customFontStyleRules = [];
    const miscStyleRules = [];
    const textSize = layout === 'flex' ? undefined : style.text?.size;
    const fontSource = style.text?.fontSource;
    const fontFamily = fontSource ? 'MerchantCustomFont' : style.text?.fontFamily;
    const fontSelector = `
.message__messaging, 
.message__messaging .message__headline span, 
.message__messaging .message__disclaimer span`;
    const textSizeRule = textSize ? `font-size: ${textSize}px; ` : '';
    const fontFamilyRule = getFontFamilyRule(addLog, fontFamily);
    const fontSourceRule = getfontSourceRule(addLog, fontSource);

    // if (layout === 'text' && textSize) {
    //     miscStyleRules.push(`.message__messaging { font-size: ${textSize}px; }`);
    // }
    if (fontSource) {
        customFontStyleRules.push(`@font-face {font-family: '${fontFamily}'; ${fontSourceRule}}`);
    }
    if (fontFamilyRule || textSizeRule) {
        customFontStyleRules.push(`${fontSelector}{ ${fontFamilyRule}${textSizeRule} }`);
    }

    // Set boundaries on the width of the message text to ensure proper line counts
    if (mutationRules.messageWidth) {
        if (typeof mutationRules.messageWidth === 'number') {
            miscStyleRules.push(`.message__messaging { width: ${mutationRules.messageWidth}px }`);
        } else if (Array.isArray(mutationRules.messageWidth)) {
            miscStyleRules.push(
                `.message__messaging { min-width: ${mutationRules.messageWidth[0]}px; max-width: ${mutationRules.messageWidth[1]}px }`
            );
        }
    }

    const logoType = style.logo?.type;
    const logoEl = <Logo mutations={mutationRules.logo} />;

    const [withText, productName] = getLocaleProductName(locale, offerType);

    const productNameEl = (
        <span>
            {' '}
            {withText} <span className="pp-text-logo" />
            <strong>{productName}</strong>
        </span>
    );

    if (options.style.layout === 'custom') {
        return (
            <CustomMessage data={markup} meta={markup.meta} template={options.customMarkup}>
                <Styles
                    globalStyleRules={globalStyleRules}
                    localeStyleRules={localeStyleRules}
                    mutationStyleRules={mutationStyleRules}
                    miscStyleRules={miscStyleRules}
                    customFontStyleRules={customFontStyleRules}
                />
            </CustomMessage>
        );
    }

    return (
        <div role="button" className="message" tabIndex="0">
            <Styles
                globalStyleRules={globalStyleRules}
                localeStyleRules={localeStyleRules}
                mutationStyleRules={mutationStyleRules}
                miscStyleRules={miscStyleRules}
                customFontStyleRules={customFontStyleRules}
            />
            <div className={`message__container ${localeClass}`}>
                {/* foreground layer */}
                <div className="message__foreground" />

                {/* content layer */}
                <div className="message__content">
                    {/* PP Credit Logo */}
                    {logoType !== 'none' && logoType !== 'inline' ? logoEl : null}

                    {/* Promotional Messaging */}
                    <div className="message__messaging">
                        <div className="message__promo-container">
                            <h5 className="message__headline">
                                <MutatedText tagData={markup.headline} options={mutationRules.headline} />
                                {logoType === 'none' ? productNameEl : null}
                                {logoType === 'inline' ? <> {logoEl}</> : null}
                            </h5>{' '}
                            <h6 className="message__sub-headline">
                                <MutatedText tagData={markup.subHeadline} options={mutationRules.subHeadline} />
                            </h6>
                        </div>{' '}
                        <p className="message__disclaimer">
                            <MutatedText tagData={markup.disclaimer} options={mutationRules.disclaimer} />
                        </p>
                    </div>
                </div>
                {/* background layer */}
                <div className="message__background" />
            </div>
        </div>
    );
};
