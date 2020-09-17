import objectEntries from 'core-js-pure/stable/object/entries';

import { logger } from './logger';

// Using spread operator here (e.g [...node.children] results in [HtmlCollection]
// rather than [child, child, ...] for some reason
const getChildren = node => Array.prototype.slice.call(node.children);

// Map class name of visible element to size tag.
const toTagSize = classList => {
    const tagMap = {
        'tag--xsmall': 'XSMALL',
        'tag--small': 'SMALL',
        'tag--medium': 'MEDIUM',
        'tag--large': 'LARGE',
        'tag--xlarge': 'XLARGE'
    };

    // Match on first tag contained in classList, ignoring other values.
    return objectEntries(tagMap).reduce((acc, [key, value]) => {
        if (acc) {
            return acc;
        }

        return classList.contains(key) ? value : null;
    }, null);
};

const getTagSize = node => {
    // Provide NONE as value for section in payload if not shown
    if (!node) {
        return 'NONE';
    }

    // Get the tag size of the visible element
    return getChildren(node).reduce((acc, next) => {
        if (acc) {
            return acc;
        }

        return window.getComputedStyle(next).getPropertyValue('display') !== 'none' ? toTagSize(next.classList) : null;
    }, null);
};

export function instrumentFallback({ container, index }) {
    const content = container.contentDocument || container.contentWindow.document;

    const [headline, subHeadline, disclaimer] = [
        content.querySelector('.message__headline'),
        content.querySelector('.message__subheadline'),
        content.querySelector('.message__disclaimer')
    ];

    logger.track({
        index,
        banner_type: `headline:${getTagSize(headline)}::subheadline:${getTagSize(subHeadline)}::disclaimer:${getTagSize(
            disclaimer
        )}`
    });
}
