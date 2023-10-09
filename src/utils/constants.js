/**
 * We're manually defining these instead of importing to avoid
 * an issue with webpack when it attempts to import `@krakenjs/zoid/src/constants`
 * @see {@link https://github.com/krakenjs/zoid/blob/main/src/constants.js#L52-L64 zoid EVENT}
 */
const zoidEvent = {
    RENDER: 'zoid-render',
    RENDERED: 'zoid-rendered',
    PRERENDER: 'zoid-prerender',
    PRERENDERED: 'zoid-prerendered',
    DISPLAY: 'zoid-display',
    ERROR: 'zoid-error',
    CLOSE: 'zoid-close',
    DESTROY: 'zoid-destroy',
    PROPS: 'zoid-props',
    RESIZE: 'zoid-resize',
    FOCUS: 'zoid-focus'
};

/**
 * Events we are using on the EventEmitter for the message component.
 * @const
 * @enum
 * @see {@link https://github.com/krakenjs/zoid/blob/main/src/constants.js#L52-L64 zoid EVENT}
 */
export const MESSAGE_EVENT = {
    ...zoidEvent,
    STYLE: 'styles'
};

/**
 * Events we are using on the EventEmitter for the modal component.
 * @const
 * @enum
 * @see {@link https://github.com/krakenjs/zoid/blob/main/src/constants.js#L52-L64 zoid EVENT}
 */
export const MODAL_EVENT = {
    ...zoidEvent,
    READY: 'ready',
    PRERENDER_MODAL_DESTROY: 'prerender-modal-destroy',
    MODAL_SHOW: 'modal-show',
    MODAL_HIDE: 'modal-hide',
    MODAL_FOCUS: 'modal-focus',
    MODAL_BLUR: 'modal-blur'
};

/**
 * Events we are using on the EventEmitter for the treatment component.
 * @const
 * @enum
 * @see {@link https://github.com/krakenjs/zoid/blob/main/src/constants.js#L52-L64 zoid EVENT}
 */
export const TREATMENTS_EVENT = {
    ...zoidEvent
};

/**
 * Props on the message component that represent a function
 * that will execute, that the merchant can hook into
 * @const
 * @enum
 */
export const MESSAGE_PROP_EVENT = {
    CLICK: 'onClick',
    APPLY: 'onApply',
    HOVER: 'onHover',
    MARKUP: 'onMarkup',
    DESTROY: 'onDestroy',
    CLOSE: 'onClose'
};

/**
 * Props on the modal component that represent a function
 * that will execute, that the merchant can hook into
 * @const
 * @enum
 */
export const MODAL_PROP_EVENT = {
    CLICK: 'onClick',
    CALCULATE: 'onCalculate',
    SHOW: 'onShow',
    CLOSE: 'onClose',
    READY: 'onReady'
};

/**
 * Events we are using on the `window` object *within*
 * the iframe for the message component
 * @const
 * @enum
 */
export const MESSAGE_DOM_EVENT = {
    DOM_CONTENT_LOADED: 'DOMContentLoaded',
    CLICK: 'click',
    MOUSEOVER: 'mouseover',
    FOCUS: 'focus',
    BLUR: 'blur'
};

/**
 * Events we are using on the `window` object *within*
 * the iframe for the modal component
 * @const
 * @enum
 */
export const MODAL_DOM_EVENT = {
    DOM_CONTENT_LOADED: 'DOMContentLoaded',
    CLICK: 'click',
    MOUSEOVER: 'mouseover',
    FOCUS: 'focus',
    BLUR: 'blur',
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
    SCROLL: 'scroll',
    TOUCHMOVE: 'touchmove',
    APPLY_NOW_VISIBLE: 'apply-now-visible',
    APPLY_NOW_HIDDEN: 'apply-now-hidden'
};

/**
 * Events we are using on the `window` object *within*
 * the parent page (containing the message and modal components)
 * @const
 * @enum
 */
export const PARENT_DOM_EVENT = {
    DOM_CONTENT_LOADED: 'DOMContentLoaded',
    CLICK: 'click',
    FOCUS: 'focus',
    BLUR: 'blur',
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
    LOAD: 'load',
    MOUSEOVER: 'mouseover',
    SCROLL: 'scroll',
    TOUCHMOVE: 'touchmove'
};

/**
 * Events we are using on the `globalEvent` EventEmitter
 * @const
 * @enum
 */
export const GLOBAL_EVENT = {
    /** When we render our first element on the page (generally a message component) with a given set of properties. */
    RENDER: 'render',
    /** When the modal first renders */
    MODAL_RENDER: 'modal-render',
    /** When the modal renders */
    TREATMENTS: 'treatments'
};

/**
 * Buy Now Pay Later offers
 * @const
 * @enum
 */
export const OFFER = {
    PAY_LATER_LONG_TERM: 'PAY_LATER_LONG_TERM',
    PAY_LATER_SHORT_TERM: 'PAY_LATER_SHORT_TERM',
    PAY_LATER_PAY_IN_1: 'PAY_LATER_PAY_IN_1',
    PAYPAL_CREDIT_INSTALLMENTS: 'PAYPAL_CREDIT_INSTALLMENTS',
    PAYPAL_CREDIT_NO_INTEREST: 'PAYPAL_CREDIT_NO_INTEREST'
};

/**
 * The tags we want our zoid components to use
 * @const
 * @enum
 */
export const TAG = {
    MESSAGE: 'paypal-message',
    MODAL: 'paypal-credit-modal',
    TREATEMENTS: 'paypal-credit-treatments'
};
