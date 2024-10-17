/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { objectMerge, objectFlattenToArray, curry } from '../../utils/server';
import { getMutations, getLocaleStyles, getLocaleClass, getLocaleProductName } from '../locale';
import allStyles from './styles';
import Logo from './parts/Logo';
import MutatedText from './parts/MutatedText';
import Styles from './parts/Styles';
import CustomMessage from './parts/CustomMessage';
import { getFontRules } from './font';

const DEFAULT_FONT_SIZE = 12;

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
            if (key === 'default' || split.every(k => arrayIncludes(flattened, k))) {
                // after numerous tests, Helvetica and Arial are 98.2% smaller than PayPal Sans font
                // but 0.983 is used here to provide a slight buffer
                const BASIC_FONT_FACTOR = 0.983;
                const calculatedVal =
                    typeof val === 'function'
                        ? val({
                              textSize: (style.text?.size ?? DEFAULT_FONT_SIZE) * BASIC_FONT_FACTOR
                          })
                        : val;
                return type === Array ? [...accumulator, calculatedVal] : objectMerge(accumulator, calculatedVal);
            }

            return accumulator;
        },
        type === Array ? [] : {}
    )
);

export default ({ options, markup, locale }) => {
    const messageType = markup?.meta?.messageType ?? markup?.meta?.offerType;
    const { style, contextualComponents } = options;

    const { layout } = style;

    const styleSelectors = objectFlattenToArray(style);

    const applyCascadeRules = applyCascade(style, styleSelectors);
    const mutationRules =
        options.style.layout === 'custom'
            ? { logo: false, styles: [], headline: [], disclaimer: '' }
            : applyCascadeRules(Object, getMutations(locale, messageType, `layout:${layout}`, contextualComponents));

    const layoutProp = `layout:${layout}`;

    const globalStyleRules = applyCascadeRules(Array, allStyles[layoutProp]);

    const localeClass = getLocaleClass(locale, messageType, contextualComponents);
    // Scope all locale-specific styles to the selected locale
    const localeStyleRules = applyCascadeRules(
        Array,
        getLocaleStyles(locale, layoutProp, messageType, contextualComponents)
    ).map(rule => rule.replace(/\.message/g, `.${localeClass} .message`));
    const mutationStyleRules = mutationRules.styles ?? [];
    const customFontStyleRules = getFontRules(style);
    const miscStyleRules = [];

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

    const [withText, productName] = getLocaleProductName(locale, messageType, contextualComponents);

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
        <div className="message">
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
                            <div className="message__headline">
                                <MutatedText tagData={markup.headline} options={mutationRules.headline} />
                                {logoType === 'none' ? productNameEl : null}
                                {logoType === 'inline' ? <> {logoEl}</> : null}
                            </div>{' '}
                            <div className="message__sub-headline">
                                <MutatedText tagData={markup.subHeadline} options={mutationRules.subHeadline} />
                            </div>
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
