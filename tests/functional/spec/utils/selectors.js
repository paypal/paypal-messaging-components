// Selectors used in modal tests
const selectors = {
    banner: {
        iframe: '.banner-1 iframe',
        iframeByAttribute: '[data-pp-id] iframe',
        container: '.message__container',
        messageMessaging: '.message__messaging',
        legacyContainer: 'div[role="button"].message'
    },
    modal: {
        iframe: 'iframe[title*="paypal_credit_modal"]',
        container: '.modal-container',
        wrapper: '.wrapper',
        overlay: '.overlay',
        overlaySide: '.overlay-side',
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
        // Used in GB modal
        containerLeft: '.left',
        offer: '.content-body .offer',
        gbContainer: '.modal-container',
        gbContent: '.content',
        gbMain: '.main',
        gbContainerLeft: '.left',
        gbOffer: '.offer',
        gbOverlay: '.overlay-side'
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
        btn: '.button',
        closeBtn: '#close-btn',
        btnSecondary: '.button.secondary',
        // Used in DE modal instead of .btnSecondary
        btnMd: '.button.md'
    }
};

export default selectors;
