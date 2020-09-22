import arrayFind from 'core-js-pure/stable/array/find';
import arrayFrom from 'core-js-pure/stable/array/from';

// Using spread operator here (e.g [...node.children] results in [HtmlCollection]
// rather than [child, child, ...] for some reason
const getChildren = node => arrayFrom(node.children);

// Map class name of visible element to size tag.
const toTagSize = classList => {
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

    // Match on first tag contained in classList, ignoring other values.
    const tag = arrayFind(sizes, size => classList.contains(`tag--${size}`)) || 'NONE';

    return tag.toUpperCase();
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

export function getActiveTags(container) {
    if (!container) {
        return `headline:NONE::subheadline:NONE::disclaimer:NONE`;
    }

    const [headline, subHeadline, disclaimer] = [
        container.querySelector('.message__headline'),
        container.querySelector('.message__subheadline'),
        container.querySelector('.message__disclaimer')
    ];

    return `headline:${getTagSize(headline)}::subheadline:${getTagSize(subHeadline)}::disclaimer:${getTagSize(
        disclaimer
    )}`;
}
