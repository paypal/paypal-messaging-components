// Selectors used in modal tests
export const selectors = {
    // Standalone tests learn more button
    standaloneLearnMore: '.learn-more',

    modal: {
        // Zoid iFrame selector
        iframe: "div[id^=zoid-paypal-credit-modal]:not([class$='-hide']) iframe[title^='PayPal Modal']",
        // API iframe selector
        apiIframe: '#api-iframe',
        overlay: '.overlay',

        // Header content selectors
        headerWrapper: '.header__wrapper',
        // headerContainer: '.header__container',
        headerContent: '.header__content',
        h1: 'h1',
        h2: 'h2',

        // Body content selectors
        contentWrapper: '.content__wrapper',
        contentContainer: '.content__container',
        contentRow: '.content__row',

        // Numbered bullet instructions selector
        instructions: '.instructions',
        instructionsItemWrapper: '.instructions__item-wrapper',
        li: 'li',

        // Button selectors shared across all views - i.e., the product list link and close button
        button: {
            close: '.close',
            productList: '#productListLink'
        }
    },
    shortTerm: {
        // Donut component used in short term view modals
        donuts: {
            periodicPayment: '.donut__payment'
        }
    },
    productList: {
        tile: '.tile'
    },
    noInterest: {
        // Apply Now button selectors unique to PPC NI view
        button: {
            termsLink: '.content__footer-item > a',
            applyNowBtn: '.button'
        }
    },
    longTerm: {
        // Calc component selectors
        calculator: {
            input: '.input',
            errorContainer: '.calculator__error'
        },
        // Offer card selectors
        offerCard: {
            offerContainer: '.offer__container',
            offerRow: '.offer__row',
            offerField: '.offer__field-col'
        },
        // channel: CHECKOUT button "Continue with Pay Monthly"
        button: {
            checkoutCta: '.cta'
        },
        // Legal disclaimer underneath terms table
        termsDisclaimer: '.finance-terms__disclaimer'
    },
    // SDK message selectors
    message: {
        messageContainer: '.messages.banner-1',
        messageIframe: "span[id^=zoid-paypal-message] iframe[title^='PayPal Message']",
        messageMessaging: '.message__messaging'
    }
};
