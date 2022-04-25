// Note that these values are solely mock structures for development purposes
// that are not guaranteed to be reflective of what is in production
export default {
    DEV_DE_MULTI: {
        country: 'DE',
        modalViews: [
            {
                template: 'product_list.json',
                product: 'PRODUCT_LIST'
            },
            {
                template: 'pay_in_1.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                template: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [],
        offers: {}
    }
};
