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
                template: 'pay_in_thirty.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                template: 'ratenzahlung.json',
                product: 'PAYPAL_CREDIT_INSTALLMENTS'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gplq_eqz.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'gplq_eqz.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 1500.01,
                template: 'gplq_eqz.json',
                product: 'PAYPAL_CREDIT_NO_INTEREST'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 4,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 30,
                    maxAmount: 1500
                }
            ],
            PAYPAL_CREDIT_NO_INTEREST: [
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 9999.99
                }
            ]
        }
    }
};
