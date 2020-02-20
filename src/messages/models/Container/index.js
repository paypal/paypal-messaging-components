import objectEntries from 'core-js-pure/stable/object/entries';

import events, { clearEvents } from './events';
import insertMarkup from './insertMarkup';
import runStats from './stats';
import setSize from './setSize';

export default function createContainer(typeOrElement, isOnlyModal = false) {
    const container = typeOrElement.constructor === String ? document.createElement(typeOrElement) : typeOrElement;

    if (typeOrElement === 'iframe') {
        container.setAttribute('title', 'PayPal Credit Promotion Message');
        container.setAttribute('style', 'width: 100%; border: none;');
        container.setAttribute('src', 'about:blank');
        container.setAttribute('height', 0);
    }

    const helpers = { runStats, events };
    if (!isOnlyModal) {
        helpers.insertMarkup = insertMarkup;
        helpers.setSize = setSize;
    }

    const helperFns = objectEntries(helpers).reduce(
        (accumulator, [fnName, fn]) => ({ ...accumulator, [fnName]: fn(container, isOnlyModal) }),
        {}
    );

    helperFns.clearEvents = () => clearEvents(container);

    return [container, helperFns];
}
