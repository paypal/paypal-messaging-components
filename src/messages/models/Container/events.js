import objectValues from 'core-js-pure/stable/object/values';

const events = {
    click: new Map(),
    message: new Map(),
    scroll: new Map(),
    hover: new Map(),
    resize: new Map()
};

/**
 * Global on message event handler
 * @param {Event} evt Event object
 */
function onMessage(evt) {
    // Origin may need to change depending on how the iframe content is delivered
    // Make sure the modal event is fired from the related modal iframe
    if (
        evt.origin === window.top.location.origin &&
        evt.source === (evt.source.frameElement && evt.source.frameElement.contentWindow) &&
        events.message.has(evt.source.frameElement)
    ) {
        events.message.get(evt.source.frameElement)(evt);
    }
}

/**
 * Global on resize event handler
 * @param {Event} evt Event object
 */
function onResize(evt) {
    if (events.resize.has(evt.target.frameElement)) {
        events.resize.get(evt.target.frameElement)(evt);
    }
}

/**
 * Global on scroll event handler
 * @param {Event} evt Event object
 */
function onScroll(evt) {
    events.scroll.forEach(handler => handler(evt));
}

/**
 * Global on hover event handler
 * @param {Event} evt Event object
 */
function onHover(evt) {
    if (events.hover.has(evt.target)) {
        events.hover.get(evt.target)(evt);
    }
}

/**
 * Global on click event handler
 * @param {Event} evt Event object
 */
function onClick(evt) {
    if (evt.target.ownerDocument && events.click.has(evt.target.ownerDocument.defaultView.frameElement)) {
        events.click.get(evt.target.ownerDocument.defaultView.frameElement)(evt);
    } else if (events.click.has(evt.currentTarget)) {
        events.click.get(evt.currentTarget)(evt);
    }
}

/**
 * Ensure that global listeners are setup for specified event type
 * @param {String} type Event type
 * @param {HTMLElement} elem Element in which to ensure a handler
 */
function ensureListener(type, elem) {
    if (type === 'scroll' && events.scroll.size === 0) {
        window.addEventListener('scroll', onScroll);
    } else if (type === 'hover' && events.hover.size === 0) {
        document.addEventListener('mouseover', onHover);
    } else if (type === 'message' && events.message.size === 0) {
        window.addEventListener('message', onMessage);
    } else if (type === 'resize' && !events[type].has(elem)) {
        elem.contentWindow.addEventListener('resize', onResize);
    } else if (type === 'click' && !events[type].has(elem)) {
        if (elem.tagName === 'IFRAME') {
            elem.contentWindow.document.body.addEventListener('click', onClick);
        } else {
            elem.addEventListener('click', onClick);
        }
    }
}

/**
 * Add a handler function to global events map based on specified type
 * @param {String} type Event type
 * @param {HTMLElement} elem Element to hook event
 * @param {Function} handler Handler function
 */
function addEventListener(type, elem, handler) {
    ensureListener(type, elem);

    if (events[type].has(elem)) {
        const prevHandler = events[type].get(elem);

        events[type].set(elem, evt => {
            prevHandler(evt);
            handler(evt);
        });
    } else {
        events[type].set(elem, handler);
    }
}

/**
 * Create a helper object ot add and remove events from an element
 * @param {HTMLElement} container Element in which to add events
 * @returns {Object} Helper object to add and remove events on container
 */
export default function addEventListenersTo(container) {
    return {
        on: (type, handler) => {
            // Message and resize events are not supported for non-iframe containers
            if (container.tagName === 'IFRAME' || (type !== 'resize' && type !== 'message')) {
                addEventListener(type, container, handler);
            }
        },
        clear: type => {
            events[type].delete(container);

            if (type === 'scroll' && events.scroll.size === 0) {
                window.removeEventListener('scroll', onScroll);
            } else if (type === 'hover' && events.hover.size === 0) {
                document.removeEventListener('mouseover', onHover);
            } else if (type === 'click') {
                if (container.tagName === 'IFRAME') {
                    container.contentWindow.removeEventListener('click', onClick);
                } else {
                    container.removeEventListener('click', onClick);
                }
            } else if (container.tagName === 'IFRAME') {
                if (type === 'resize') {
                    container.contentWindow.removeEventListener('resize', onResize);
                } else if (type === 'message' && events.message.size === 0) {
                    window.removeEventListener('message', onMessage);
                }
            }
        }
    };
}

/**
 * Clear all events hooked onto specified element
 * @param {HTMLElement} container Element
 */
export function clearEvents(container) {
    objectValues(events).forEach(eventMap => eventMap.delete(container));
    if (events.scroll.size === 0) {
        window.removeEventListener('scroll', onScroll);
    }

    if (events.hover.size === 0) {
        document.removeEventListener('mouseover', onHover);
    }

    if (events.message.size === 0) {
        window.removeEventListener('message', onMessage);
    }

    if (container.tagName === 'IFRAME') {
        container.contentWindow.removeEventListener('resize', onResize);
        container.contentWindow.removeEventListener('click', onClick);
    } else {
        container.removeEventListener('click', onClick);
    }
}
