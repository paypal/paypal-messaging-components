// Selectors used in modal tests
const selectors = {
    banner: {
        wrapper: '.banner-1',
        iframe: '.banner-1 iframe',
        iframeByAttribute: '[data-pp-id] iframe',
        container: '.message__container',
        messageMessaging: '.message__messaging',
        legacyContainer: 'button .message'
    },
    modal: {
        iframe: 'iframe[title^="PayPal Modal"]',
        container: '.modal-container',
        wrapper: '.wrapper',
        overlay: '.overlay',
        overlaySide: '.overlay-side',
        headerHeadline: 'header>h1',
        contentWrapper: '.content-wrapper',
        contentBackground: '.content-background',
        modalContent: '.content',
        modalMain: '.main',
        contentBody: '.content-body',
        contentBodyTitle: '.content-body .title',
        contentBodyTerms: '.content-body .terms',
        contentHeader: '.content-header',
        contentDescriptionTitle: '.content-body .description h3',
        contentTermsTitle: '.content-body .terms h3',
        ezpContentHeaderTitle: '.content-header .title',
        instructions: '.instructions',
        applynow: '.button.content__row'
    },
    calculator: {
        calc: '.calculator',
        contentCalc: '.calculator-container',
        calcTitle: '.calculator .title',
        calcInstructions: '.calculator .instructions',
        calcForm: '.calculator .form',
        calcInput: '.calculator .input'
    },
    button: {
        tabs: '.tabs',
        tab: '.tab',
        tabUnselected: 'button.tab:not(.tab--selected)',
        contentHeader: '.content-header .button',
        btn: '.button',
        closeBtn: '#close-btn',
        btnSecondary: '.button.secondary',
        // Used in DE modal instead of .btnSecondary
        btnMd: '.button.md',
        // Used in DE Multiproduct modal
        pi30Button: '#PI30-button',
        gplButton: '#GPL-button',
        switchingLink: '.switching-link'
    }
};

export default selectors;
