import objectEntries from 'core-js-pure/stable/object/entries';

import events, { clearEvents } from './events';
import insertMarkup from './insertMarkup';
import runStats from './stats';
import setSize from './setSize';

export default function createContainer(type) {
    const container = document.createElement(type);

    if (type === 'iframe') {
        container.setAttribute('title', 'PayPal Credit Promotion Message');
        container.setAttribute('style', 'width: 100%; border: none;');
        container.setAttribute('src', 'about:blank');
        container.setAttribute('height', 0);
    }

    const helperFns = objectEntries({
        insertMarkup,
        setSize,
        runStats,
        events
    }).reduce((accumulator, [fnName, fn]) => ({ ...accumulator, [fnName]: fn(container) }), {});

    helperFns.clearEvents = () => clearEvents(container);

    return [container, helperFns];
}
