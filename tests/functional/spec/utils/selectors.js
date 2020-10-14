// Selectors used in modal tests
const selectors = {
    message: {
        messageMessaging: '.message__messaging'
    },
    modal: {
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
        contentHeaderTitle: '.content-header .title',
        // Used in GB modal
        containerLeft: '.content-body--left',
        offer: '.content-body__offer',
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
        btn: '.button',
        closeBtn: '#close-btn',
        btnSecondary: '.button--secondary',
        // Used in DE modal instead of .btnSecondary
        btnMd: '.button--md'
    }
};

export default selectors;
