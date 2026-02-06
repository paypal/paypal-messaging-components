import { getWindowFromElement } from './elements';

// Map class name of visible element to size tag.
const toTagSize = classList => {
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

    // Match on first tag contained in classList, ignoring other values.
    const tag = sizes.find(size => classList.contains(`tag--${size}`)) || 'NONE';

    return tag.toUpperCase();
};

const getTagSize = node => {
    // Provide NONE as value for section in payload if not shown
    if (!node) {
        return 'NONE';
    }

    const visibleElement = Array.from(node.children).find(
        element => getWindowFromElement(node).getComputedStyle(element).getPropertyValue('display') !== 'none'
    );

    if (!visibleElement) {
        return 'NONE';
    }

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
