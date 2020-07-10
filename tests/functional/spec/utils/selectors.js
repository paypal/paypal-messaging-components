// Selectors used in modal tests
const selectors = {
    message: {
        messageMessaging: '.message__messaging'
    },
    modal: {
        container: '.modal__container',
        wrapper: '.modal__wrapper',
        overlay: '.modal__overlay',
        overlaySide: '.modal__overlay-side',
        contentWrapper: '.modal__content-wrapper',
        contentBackground: '.modal__content-background',
        modalContent: '.modal__content',
        modalMain: '.modal__main',
        contentBody: '.content-body',
        contentBodyTitle: '.content-body__title',
        contentBodyTerms: '.content-body__terms',
        contentHeader: '.content-header',
        contentHeaderTitle: '.content-header__title'
    },
    calculator: {
        calc: '.calculator',
        contentCalc: '.content__calculator',
        calcTitle: '.calculator__title',
        calcInstructions: '.calculator__instructions',
        calcForm: '.calculator__form',
        calcInput: '.calculator__input'
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
