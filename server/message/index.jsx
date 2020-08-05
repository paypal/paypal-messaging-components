/** @jsx h */
/** @jsxFrag Fragment */
// eslint-disable-next-line no-unused-vars
import { h, Fragment } from 'preact';

import { objectMerge, objectFlattenToArray, curry } from '../../src/utils/server';
import { getMutations, getLocaleStyles, getLocaleClass, getLocalProductName, getMinimumWidthOptions } from '../locale';
import allStyles from './styles';
import fonts from './styles/fonts.css';
import Logo from './parts/Logo';
import MutatedText from './parts/MutatedText';

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
    const style =
        options.style.preset === 'smallest'
            ? objectMerge(options.style, getMinimumWidthOptions(locale))
            : options.style;

    const { layout } = style;

    const styleSelectors = objectFlattenToArray(style);
    const offerType = markup?.meta?.offerType;

    const applyCascadeRules = applyCascade(style, styleSelectors);
    const mutationRules = applyCascadeRules(Object, getMutations(locale, offerType, `layout:${layout}`, markup));

    const layoutProp = `layout:${layout}`;
    const globalStyleRules = applyCascadeRules(Array, allStyles[layoutProp]);

    const localeClass = getLocaleClass(locale);
    // Scope all locale-specific styles to the selected locale
    const localeStyleRules = applyCascadeRules(Array, getLocaleStyles(locale, layoutProp)).map(rule =>
        rule.replace(/\.message/g, `.${localeClass} .message`)
    );
    const mutationStyleRules = mutationRules.styles ?? [];
    const miscStyleRules = [];

    const textSize = style.text?.size;
    if (layout === 'text' && textSize) {
        miscStyleRules.push(`.message__headline { font-size: ${textSize}px }`);
        miscStyleRules.push(`.message__disclaimer { font-size: ${textSize}px }`);
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

    const [withText, productName] = getLocalProductName(locale);

    // TODO: custom banner support
    // if (layout === 'text' && objectGet(options, 'style.text.fontFamily')) {
    //     prependStyle(newTemplate, createCustomFontFamily(options.account, objectGet(options, 'style.text.fontFamily')));
    // }

    const productNameEl = (
        <span>
            {' '}
            {withText} <span className="pp-text-logo" />
            <strong>{productName}</strong>
        </span>
    );

    return (
        <div role="button" className="message" tabIndex="0">
            <style className="styles__fonts" dangerouslySetInnerHTML={{ __html: fonts }} />
            <style className="styles__global" dangerouslySetInnerHTML={{ __html: globalStyleRules.join('\n') }} />
            <style className="styles__locale" dangerouslySetInnerHTML={{ __html: localeStyleRules.join('\n') }} />
            <style className="styles__mutations" dangerouslySetInnerHTML={{ __html: mutationStyleRules.join('\n') }} />
            <style className="styles__misc" dangerouslySetInnerHTML={{ __html: miscStyleRules.join('\n') }} />
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
                                {logoType === 'none' || locale === 'GB' ? productNameEl : null}
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
