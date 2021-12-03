export const DEV_US_PRODUCT_LIST = {
    country: 'US',
    template: 'product_list.json',
    offersTemplate: 'long_term.json',
    product: 'PRODUCT_LIST',
    modalViews: [
        {
            template: 'product_list.json',
            product: 'PRODUCT_LIST'
        },
        {
            template: 'short_term.json',
            product: 'PAY_LATER_SHORT_TERM'
        },
        {
            template: 'long_term.json',
            product: 'PAY_LATER_LONG_TERM'
        },
        {
            template: 'ni.json',
            product: 'PAYPAL_CREDIT_NO_INTEREST'
        }
    ]
};
