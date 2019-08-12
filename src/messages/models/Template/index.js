import arrayFind from 'core-js-pure/stable/array/find';
import arrayFrom from 'core-js-pure/stable/array/from';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringEndsWith from 'core-js-pure/stable/string/ends-with';
import stringIncludes from 'core-js-pure/stable/string/includes';

import templateMarkup from './template.html';
import imageTemplateMarkup from './template--image.html';
import allStyles from './styles';
import getMutations, { getDataByTag } from './mutations';
import Logo from './logos';
import { ERRORS } from '../../services/logger';
import {
    curry,
    memoize,
    objectGet,
    objectMerge,
    getElement,
    prependStyle,
    prependText,
    appendText,
    appendImage
} from '../../../utils';

// Iframe used solely for calculating the minium width of a template
const calcIframe = document.createElement('iframe');
calcIframe.setAttribute('style', 'opacity: 0; width: 0; height: 0; position: absolute; left: -99999px;');
const baseTemplate = document.createElement('div');
baseTemplate.innerHTML = templateMarkup;
const imageTemplate = document.createElement('div');
imageTemplate.innerHTML = imageTemplateMarkup;

function splitSpan(span, breakWord) {
    const text = span.innerText;
    const breakIndex = text.indexOf(breakWord) + breakWord.length;
    const s1 = span.cloneNode();
    s1.innerText = text.slice(0, breakIndex).trim();

    if (text.length !== breakIndex) {
        const s2 = span.cloneNode();
        s2.innerText = text.slice(breakIndex).trim();
        return [s1, s2];
    }

    return [s1];
}

function injectSpaceNodes(spans) {
    return spans.reduce((accumulator, span) => [...accumulator, span, document.createTextNode(' ')], []).slice(0, -1);
}

/**
 * Break up markup string at specified breakpoints
 * @param {Array<Number>} breaks Indexes to breakup string
 * @param {String} markup String to break up
 * @returns {Array<HTMLSpanElement>} Markup string split into various spans
 */
function createLineBreaks(breaks, markup) {
    const availableBreaks = [...breaks];

    markup.forEach(currentSpan => {
        const text = currentSpan.innerText;
        const containedBreaks = [];

        while (stringIncludes(text, availableBreaks[0])) {
            containedBreaks.push(availableBreaks[0]);
            availableBreaks.shift();
        }

        // Prevent unnecessary nesting if the entire span innerText would be wrapped in a single br span
        if (
            containedBreaks.length === 0 ||
            (containedBreaks.length === 1 && stringEndsWith(text, containedBreaks[0]))
        ) {
            return currentSpan.classList.add('br');
        }

        const startSpan = document.createElement('span');
        startSpan.innerText = text;
        startSpan.className = 'br';

        const breakSpans = containedBreaks.reduce(
            (accumulator, breakWord) => {
                const split = splitSpan(accumulator[accumulator.length - 1], breakWord);
                return [...accumulator.slice(0, -1), ...split];
            },
            [startSpan]
        );

        // eslint-disable-next-line no-param-reassign
        currentSpan.innerHTML = '';
        return breakSpans.forEach(span => {
            currentSpan.appendChild(span);
            currentSpan.appendChild(document.createTextNode(' '));
        });
    });
}
/**
 * Replace string based on specified replacement rules
 * @param {Array<Array<String>>} replacements List of replace instructions
 * @param {String} markup String modify
 * @returns {String} String after replacements
 */
function replace(replacements, markup) {
    markup.forEach(span => {
        const text = replacements.reduce(
            (accumulator, [substr, replacement]) => accumulator.replace(substr, replacement),
            span.innerText
        );

        // eslint-disable-next-line no-param-reassign
        span.innerText = text;
    });
}

function getMarkup(textData, options = {}) {
    const uniformText = Array.isArray(textData) ? textData : [textData];

    const spans = uniformText.map(text => {
        const span = document.createElement('span');

        if (Array.isArray(text)) {
            [span.innerText, span.className] = text;
        } else {
            span.innerText = text;
        }

        return span;
    });

    if (options.replace) {
        replace(options.replace, spans);
    }
    if (options.br) {
        createLineBreaks(options.br, spans);
    }

    return injectSpaceNodes(spans);
}

/**
 * Convert a text option to markup
 * @param {Object} data Source text data
 * @param {any} option Text option
 * @returns {String|HTMLElement|Boolean} Element to be inserted into another element or false if none
 */
const rulesToMarkup = curry((data, prop, option) => {
    if (option === false) return false;
    if (typeof option !== 'string' && typeof option !== 'object') return null;

    let uniformOptions;
    if (typeof option === 'string') {
        uniformOptions = [{ tag: option }];
    } else if (!Array.isArray(option)) {
        uniformOptions = [option];
    } else {
        uniformOptions = option;
    }

    return injectSpaceNodes(
        uniformOptions.map(op => {
            const span = document.createElement('span');

            if (uniformOptions.length > 1) {
                span.setAttribute('class', 'multi');
            }

            let markup;
            if (typeof op === 'string') {
                markup = getMarkup(getDataByTag(data[prop], op));
                span.classList.add(`tag--${op.split('.', 1)[0]}`);
            } else {
                const { tag, ...options } = op;
                markup = getMarkup(getDataByTag(data[prop], tag), options);
                span.classList.add(`tag--${tag.split('.', 1)[0]}`);
            }

            markup.forEach(el => span.appendChild(el));

            return span;
        })
    );
});

/**
 * Get all applicable rules based on user flattened options
 * and available rules to cascade
 * @param {Array<String>} flattened Flattened style options
 * @param {any} type Desired return value type
 * @param {Array<Array<any>>} rules Rules to apply the cascade
 * @returns {Object|Array} Applicable rules
 */
const applyCascade = curry((flattened, type, rules) =>
    rules.reduce(
        (accumulator, [key, val]) => {
            const split = key.split(' && ');
            if (key === 'default' || split.every(k => arrayIncludes(flattened, k))) {
                return type === Array ? [...accumulator, val] : objectMerge(accumulator, val);
            }

            return accumulator;
        },
        type === Array ? [] : {}
    )
);

function createCustomTemplateNode({ data, meta, template }) {
    const newTemplate = document.createElement('div');
    const { offerType } = meta;

    // Invalid sign will return empty string template
    if (template === '') {
        return newTemplate;
    }

    try {
        // TODO: This can potentially be optimized by dynamically creating elements
        // instead of converting all nodes into strings then inserted with innerHTML
        const populatedMarkup = template.replace(/{{\s*?([^\s]+?)\s*?}}/g, (_, templateVariable) => {
            const [type, ...parts] = templateVariable.split('.');
            const tag = parts.join('.');

            if (type === 'logo') {
                const tempContainer = document.createElement('div');
                appendImage(tempContainer, objectGet(Logo, tag.toUpperCase()), 'PayPal Credit logo');
                return tempContainer.innerHTML;
            }

            return getMarkup(getDataByTag(data[type], tag)).reduce(
                (accumulator, span) => `${accumulator}${span.outerHTML || ' '}`, // Space fallback for textNodes
                ''
            );
        });

        newTemplate.innerHTML = populatedMarkup;

        arrayFind(arrayFrom(newTemplate.children), node => node.tagName !== 'STYLE').classList.add(
            `offer--${offerType.replace(/:/g, '-').toLowerCase()}`
        );
    } catch (err) {
        // TODO: Improve error message
    }

    return newTemplate;
}

function createImageTemplateNode(style, { meta }) {
    const newTemplate = imageTemplate.cloneNode(true);
    const getTemplateElement = getElement('pp-legacy', newTemplate);
    const [link, pixel] = ['link', 'pixel'].map(getTemplateElement);

    const size = objectGet(style, 'size');
    const color = objectGet(style, 'color');
    const border = objectGet(style, 'border');

    link.setAttribute('href', meta.clickUrl);
    pixel.setAttribute('href', meta.impressionUrl);

    const baseUrl = 'https://www.paypalobjects.com/upstream/assets/messaging/legacy';
    const styleType = color === 'none' ? '' : `-${color}${border === true ? '' : '-no-border'}`;
    const formattedName = `${color === 'none' ? 'v1' : 'v2'}/${size.replace(/x/, '-')}${styleType}`;
    const srcset = [1, 1.5, 2].map(dpr => `${baseUrl}/${formattedName}@${dpr}x.png ${dpr}x`);

    appendImage(link, `${baseUrl}/${formattedName}@1x.png`, 'PayPal Credit Message', srcset.join(', '));

    return newTemplate;
}

/**
 * IMPORTANT: This function is fragile and very dependent on how
 * IE handles sizing containers with specific style property values
 * @param {HTMLElement} container Container element
 * @returns {Number} Container width
 */
const getContentMinWidth = container => {
    document.body.appendChild(calcIframe);
    calcIframe.contentWindow.document.body.appendChild(calcIframe.contentWindow.document.importNode(container, true));

    // IE Support: importNode() and cloneNode() do not properly import working
    // style elements so they must be manually recreated inside the document
    arrayFrom(calcIframe.contentWindow.document.getElementsByTagName('style')).forEach(styleElem => {
        const styleClone = calcIframe.contentWindow.document.createElement('style');
        styleClone.textContent = styleElem.textContent;
        styleElem.parentNode.insertBefore(styleClone, styleElem);
        styleElem.parentNode.removeChild(styleElem);
    });

    const contentContainer = calcIframe.contentWindow.document.querySelector('.message__content');
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
    const minWidth = stringIncludes(contentStyles.getPropertyValue('display'), 'flex')
        ? Math.round(
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
          )
        : // If the display is not flex, it should be block to stack the child components vertically.
          // We use display block instead of flex because IE does not support the column orientation very well.
          // We calculate the width of the container by the largest width of all the stacked children.
          Math.max(
              ...children.map(child => {
                  const childStyles = window.getComputedStyle(child);
                  return Math.round(
                      properties.reduce(
                          (accumlator, prop) => accumlator + parseFloat(childStyles.getPropertyValue(prop)),
                          0
                      )
                  );
              })
          );

    document.body.removeChild(calcIframe);

    return minWidth;
};

/**
 * Create a new template DOM element
 * @param {Object} options Banner options, including style rules to be applied to the template
 * @param {Array} data Content data to be inserted into the template
 * @returns {HTMLElement} New template element
 */
function createTemplateNode(options, markup) {
    const layout = objectGet(options, 'style.layout');
    if (layout === 'custom') {
        return createCustomTemplateNode(markup);
    }

    const styleSelectors = objectGet(options, 'style._flattened');
    const offerType = objectGet(markup, 'meta.offerType');
    const data = objectGet(markup, 'data');

    if (layout === 'legacy') {
        const typeNI = objectGet(options, 'style.typeNI');
        const typeEZP = objectGet(options, 'style.typeEZP');
        const type = offerType.split(':')[0] === 'NI' ? typeNI : typeEZP;

        if (type === 'image') {
            return createImageTemplateNode(options.style, markup);
        }

        if (!type) {
            throw new Error(ERRORS.MESSAGE_INVALID_LEGACY);
        }
    }

    const classNamePrefix = 'message';
    const applyCascadeRules = applyCascade(styleSelectors);
    const mutationRules = applyCascadeRules(Object, getMutations(offerType, `layout:${layout}`, data));
    const styleRules = applyCascadeRules(Array, allStyles[`layout:${layout}`]);

    const toMarkup = rulesToMarkup(data);
    const newTemplate = baseTemplate.cloneNode(true);
    const getTemplateElement = getElement(classNamePrefix, newTemplate);
    const [logoContainer, headline, subHeadline, disclaimer] = [
        'logo-container',
        'headline',
        'sub-headline',
        'disclaimer'
    ].map(getTemplateElement);

    appendText(headline, toMarkup('headline', mutationRules.headline));
    appendText(subHeadline, toMarkup('subHeadline', mutationRules.subHeadline));
    prependText(disclaimer, toMarkup('disclaimer', mutationRules.disclaimer));
    appendImage(logoContainer, mutationRules.logo, 'PayPal Credit logo');

    // Logo DOM location must be moved in order for logo to be inline between text content
    if (objectGet(options, 'style.logo.type') === 'inline') {
        headline.appendChild(logoContainer);
    }
    if (objectGet(options, 'style.logo.type') === 'none') {
        const span = document.createElement('span');
        span.innerText = 'with ';
        const strong = document.createElement('strong');
        strong.innerText = 'PayPal Credit.';
        span.appendChild(strong);
        headline.appendChild(document.createTextNode(' '));
        headline.appendChild(span);
    }

    // Set boundaries on the width of the message text to ensure proper line counts
    if (mutationRules.messageWidth) {
        if (typeof mutationRules.messageWidth === 'number') {
            styleRules.push(`.${classNamePrefix}__messaging { width: ${mutationRules.messageWidth}px }`);
        } else if (Array.isArray(mutationRules.messageWidth)) {
            styleRules.push(
                `.${classNamePrefix}__messaging { min-width: ${mutationRules.messageWidth[0]}px; max-width: ${
                    mutationRules.messageWidth[1]
                }px }`
            );
        }
    }

    const prefixStyles = styles => {
        if (layout === 'legacy') {
            return styles.replace(/\.message/g, `[data-pp-id="${options.id}"] .message`);
        }

        return styles;
    };

    if (mutationRules.styles) {
        prependStyle(newTemplate, prefixStyles(mutationRules.styles.join('')));
    }
    prependStyle(newTemplate, prefixStyles(styleRules.join('\n')));

    // Determine minimum possible width before content overflow
    newTemplate.width = getContentMinWidth(newTemplate);

    return newTemplate;
}

export default {
    getTemplateNode: memoize(createTemplateNode)
};
