export const OFFER = {
    PAY_LATER_LONG_TERM: 'PAY_LATER_LONG_TERM',
    PAY_LATER_SHORT_TERM: 'PAY_LATER_SHORT_TERM',
    PAY_LATER_PAY_IN_1: 'PAY_LATER_PAY_IN_1',
    PAYPAL_CREDIT_INSTALLMENTS: 'PAYPAL_CREDIT_INSTALLMENTS',
    PAYPAL_CREDIT_NO_INTEREST: 'PAYPAL_CREDIT_NO_INTEREST'
};

export const TAG = {
    MESSAGE: 'paypal-message',
    MODAL: 'paypal-credit-modal',
    TREATEMENTS: 'paypal-credit-treatments'
};

export const FPTI_EVENTS = {
    // // SSR: 'ssr',
    // PAGE_LOADED: 'page_loaded',
    // STATS: 'stats',
    // SCROLL: 'scroll',
    // MESSAGE_RENDERED: 'message_rendered',
    // HOVER: 'hover',
    // MODAL_RENDERED: 'modal-rendered',
    // MESSAGE_HIDDEN: 'message_hidden',
    // MESSAGE_CLICKED: 'message_clicked',
    // ERROR: 'error',
    // CLICK: 'click',
    // MODAL_OPEN: 'modal-open',
    // MODAL_CLOSE: 'modal-close'

    /** The page finished loading the parent page . */
    PAGE_LOADED: 'page_loaded',
    /** The observer hid the message because there was not enough space to display it. */
    MESSAGE_HIDDEN: 'message_hidden',
    /** A message entered the viewport after scrolling. */
    MESSAGE_SCROLL: 'scroll',
    /** A modal was closed. */
    MODAL_CLOSE: 'modal-close',

    /** A message was shown on the web page or mobile app. */
    MESSAGE_RENDERED: 'message_rendered',
    /** The message was hovered over with by the user's mouse. */
    MESSAGE_HOVERED: 'message_hovered',
    /** The message was clicked or tapped by the user. */
    MESSAGE_CLICKED: 'message_clicked',
    /** An error happened while trying to render a message. */
    MESSAGE_ERROR: 'message_error',
    /** A modal was rendered in the web page or mobile app. */
    MODAL_RENDERED: 'modal_rendered',
    /** A view was displayed to the user in the modal. */
    MODAL_VIEWED: 'modal_viewed'
};
