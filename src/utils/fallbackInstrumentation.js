import arrayFind from 'core-js-pure/stable/array/find';
import objectEntries from 'core-js-pure/stable/object/entries';

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
    const tag = arrayFind(objectEntries(tagMap), ([key]) => classList.contains(key));

    return tagMap[tag];
};

const getTagSize = node => {
    // Provide NONE as value for section in payload if not shown
    if (!node) {
        return 'NONE';
    }

    const visibleElement = arrayFind(
        getChildren(node),
        element => window.getComputedStyle(element).getPropertyValue('display') !== 'none'
    );

    // Get the tag size of the element shown
    return toTagSize(visibleElement.classList);
};

export function instrumentFallback(container) {
    if (!container) {
        return `headline:NONE::subheadline:NONE::disclaimer:NONE`;
    }
    const content = container.contentDocument || container.contentWindow.document;

    const [headline, subHeadline, disclaimer] = [
        content.querySelector('.message__headline'),
        content.querySelector('.message__subheadline'),
        content.querySelector('.message__disclaimer')
    ];

    return `headline:${getTagSize(headline)}::subheadline:${getTagSize(subHeadline)}::disclaimer:${getTagSize(
        disclaimer
    )}`;
}
