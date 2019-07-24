import arrayFrom from 'core-js-pure/stable/array/from';
import stringIncludes from 'core-js-pure/stable/string/includes';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { curry, objectGet, createCallbackError } from '../../../utils';
import events from './events';
import { ERRORS } from '../../services/logger';

const ratioMap = {
    '1x1': [
        {
            ratio: '1x1',
            width: [120, 300]
        }
    ],
    '1x4': [
        {
            ratio: '1x2',
            width: [160, 160]
        },
        {
            ratio: '1x4',
            breakpoint: 768
        }
    ],
    '8x1': [
        {
            ratio: '6x1',
            width: [250, 768]
        },
        {
            ratio: '8x1',
            breakpoint: 768
        }
    ],
    '20x1': [
        {
            ratio: '6x1',
            width: [250, 768]
        },
        {
            ratio: '20x1',
            width: [350, 1169],
            breakpoint: 768
        }
    ]
};

function toCSSValue(value) {
    if (typeof value === 'number') {
        return `${value}px`;
    }

    if (typeof value === 'string') {
        const match = value.match(/^(\d+)x(\d+)$/);

        if (match) {
            return `${match.slice(1).reduce((denominator, numerator) => +numerator / +denominator) * 100}%`;
        }
    }

    return value;
}

function ratioStringToObject(value) {
    // Matches the following example: 1x4@500px[300px,700px]
    // All parts are optional except for the ratio
    // ratio - 1x4
    // breakpoint - 500px
    // min-width - 300px
    // max-width: 700px
    const [ratio, ...optionalRules] = value.split(/(?=[@[])/);

    if (!ratio.match(/\d+x\d+/)) return {};

    // TODO: Should we validate these values?
    const ratioObject = optionalRules.reduce(
        (accumulator, rule) => {
            if (stringStartsWith(rule, '@')) {
                accumulator.breakpoint = rule.slice(1);
            } else if (stringStartsWith(rule, '[')) {
                accumulator.width = rule.slice(1, -1).split(',');
            }

            return accumulator;
        },
        { ratio }
    );

    return ratioObject;
}

function insertFlexStyle(wrapper, ratioPreset, layout) {
    let ratioConfig = [];
    if (layout === 'flex') {
        ratioConfig = ratioMap[ratioPreset];
    } else if (Array.isArray(ratioPreset)) {
        ratioConfig = ratioPreset.map(ratioStringToObject);
    } else if (typeof ratioPreset === 'string') {
        ratioConfig = [ratioStringToObject(ratioPreset)];
    }

    const wrapperClass = `pp-flex--${ratioConfig.slice(-1)[0].ratio}`;

    const totalStyle = ratioConfig.reduce((accumulator, { breakpoint, ratio, width }) => {
        if (accumulator === '') {
            return `
                .${wrapperClass} {
                    display: block;
                    width: 100%;
                    ${
                        Array.isArray(width)
                            ? `
                                min-width: ${toCSSValue(width[0])};
                                max-width: ${toCSSValue(width[1])};`
                            : ``
                    }
                    box-sizing: border-box;
                    position: relative;
                }
        
                .${wrapperClass}::before {
                    padding-top: ${toCSSValue(ratio)};
                    content: '';
                    display: block;
                }
        
                .${wrapperClass} iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `;
        }

        if (!breakpoint) return accumulator;

        return `
            ${accumulator}
            @media (min-width: ${toCSSValue(breakpoint)}) {
                ${
                    Array.isArray(width)
                        ? `
                            .${wrapperClass} {
                                min-width: ${toCSSValue(width[0])};
                                max-width: ${toCSSValue(width[1])};
                            }`
                        : ``
                }
                .${wrapperClass}::before {
                    padding-top: ${toCSSValue(ratio)};
                }
            }
        `;
    }, '');

    const flexStyle = document.createElement('style');
    flexStyle.textContent = totalStyle;

    wrapper.setAttribute('class', wrapperClass);
    wrapper.appendChild(flexStyle);
}

/**
 * IMPORTANT: This function is fragile and very dependent on how
 * IE handles sizing containers with specific style property values
 * @param {HTMLElement} container Container element
 * @returns {Number} Container width
 */
const getContentWidth = container => {
    const contentContainer = container.contentDocument.querySelector('.message__content');
    const contentStyles = window.getComputedStyle(contentContainer);
    const children = arrayFrom(contentContainer.children);
    const properties = [
        'margin-left',
        'border-left-width',
        'padding-left',
        'width',
        'padding-right',
        'border-right-width',
        'margin-right'
    ];

    // When the display is flex, we are stacking the child components horizontally.
    // We calculate the total width by adding the width of all the children.
    if (stringIncludes(contentStyles.getPropertyValue('display'), 'flex')) {
        return Math.round(
            children.reduce((accumulator, child) => {
                const childStyles = window.getComputedStyle(child);
                return (
                    accumulator +
                    properties.reduce(
                        (accumlator, prop) => accumlator + parseFloat(childStyles.getPropertyValue(prop)),
                        0
                    )
                );
            }, 0)
        );
    }

    // If the display is not flex, it should be block to stack the child components vertically.
    // We use display block instead of flex because IE does not support the column orientation very well.
    // We calculate the width of the container by the largest width of all the stacked children.
    return Math.max(
        ...children.map(child => {
            const childStyles = window.getComputedStyle(child);
            return Math.round(
                properties.reduce((accumlator, prop) => accumlator + parseFloat(childStyles.getPropertyValue(prop)), 0)
            );
        })
    );
};

function getContainerWidth(wrapper) {
    const div = document.createElement('div');
    // Add an explicit size, to prevent incorrect size calculation when merchant styles leak into this div
    div.setAttribute('style', 'width: 100%; overflow: hidden');

    // Add an inner div to force the container as large as it can be, specifically inside a flex container
    const forceFullWidth = document.createElement('div');
    forceFullWidth.setAttribute('style', 'width: 10000px');
    div.appendChild(forceFullWidth);

    wrapper.parentNode.appendChild(div);

    const parentWidth = div.offsetWidth;
    wrapper.parentNode.removeChild(div);

    return parentWidth;
}

export default curry((container, { wrapper, options, logger }) => {
    if (container.tagName !== 'IFRAME') return;

    const layout = objectGet(options, 'style.layout');
    const ratio = objectGet(options, 'style.ratio');

    if ((layout === 'flex' || layout === 'custom') && ratio) {
        insertFlexStyle(wrapper, ratio, layout);
        container.setAttribute('style', `width: 100%; border: none;`);
        container.removeAttribute('height');
    } else {
        // Reset iframe incase of rerender using same container
        container.setAttribute('style', `width: ${layout !== 'custom' ? 0 : '`100%'}; border: none;`);
        container.setAttribute('height', 0);
        // If a banner is rerendered from 'flex' to 'text' the wrapper will still have the ratio wrapper class applied
        wrapper.removeAttribute('class');

        const parentContainerWidth = getContainerWidth(wrapper);
        // container.offsetParent to check if container is nested inside 'display: none'
        const minBannerContentWidth =
            layout !== 'custom' && container.offsetParent !== null ? getContentWidth(container) : 0;

        // TODO: Is this firing too many times?
        const setDimensions = () => {
            container.setAttribute('style', `width: 100%; border: none; min-width: ${minBannerContentWidth}px;`);
            // TODO: Is there a better way to do this? Waiting for iframe width to be set and rendered to calculate
            // inner iframe content height so that text banners heights are calculate after text has flowed to the
            // appropriate amount of lines
            requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                    container.setAttribute('height', container.contentWindow.document.documentElement.scrollHeight); // container.contentWindow.document.documentElement.scrollHeight);
                })
            );
        };

        if (parentContainerWidth < minBannerContentWidth && layout !== 'custom') {
            if (
                objectGet(options, 'style.logo.position') === 'top' &&
                objectGet(options, 'style.logo.type') === 'primary'
            ) {
                logger.error({ name: ERRORS.MESSAGE_HIDDEN });
                logger.warn(
                    `Message hidden. PayPal Credit Message fallback requires minimum width of ${minBannerContentWidth}px. Current container is ${parentContainerWidth}px. Message hidden.`
                );

                container.setAttribute('data-pp-message-hidden', 'true');
            } else {
                logger.warn(
                    `Message Overflow. PayPal Credit Message of layout type ${objectGet(
                        options,
                        'style.layout'
                    )} requires a width of at least ${minBannerContentWidth}px. Current container is ${parentContainerWidth}px. Attempting fallback message.`
                );
                // Thrown error skips the rest of the render pipeline and is caught at the end
                throw createCallbackError(ERRORS.MESSAGE_OVERFLOW, () => {
                    // Highest priority styles, will re-render from attribute observer
                    wrapper.parentNode.setAttribute('data-pp-style-layout', 'text');
                    wrapper.parentNode.setAttribute('data-pp-style-logo-type', 'primary');
                    wrapper.parentNode.setAttribute('data-pp-style-logo-position', 'top');
                });
            }
        } else {
            setDimensions();
            events(container).on('resize', setDimensions);
        }
    }
});
