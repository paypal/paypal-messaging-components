/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';
import { objectMerge, objectFlattenToArray, curry } from '../../src/utils/server';
import { getMutations, getLocaleStyles, getLocaleClass, getLocalProductName, getMinimumWidthOptions } from '../locale';
import allStyles from './styles';
import Logo from './parts/Logo';
import MutatedText from './parts/MutatedText';
import Styles from './parts/Styles';
import CustomMessage from './parts/CustomMessage';

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

export default ({ options, markup, locale }) => {
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
    const miscStyleRules = [];

    const textSize = style.text?.size;
    if (layout === 'text' && textSize) {
        // miscStyleRules.push(`.message__headline { font-size: ${textSize}px; }`);
        // miscStyleRules.push(`.message__disclaimer { font-size: ${textSize}px; }`);
        miscStyleRules.push(`.message__messaging { font-size: ${textSize}px; }`);
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

    const [withText, productName] = getLocalProductName(locale, offerType);

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
