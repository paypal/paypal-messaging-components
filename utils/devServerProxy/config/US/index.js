export default {
    DEV_US_MULTI: {
        country: 'US',
        modalViews: [
            {
                template: 'product_list.json'
            },
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                template: 'ni_v2.json',
                product: 'PAYPAL_CREDIT_NO_INTEREST'
            },
            {
                template: 'long_term.json',
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'ni.json',
                product: 'PAYPAL_CREDIT_NO_INTEREST'
            },
            {
                amount: 0,
                template: 'gplnq.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAYPAL_CREDIT_NO_INTEREST: [
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 9999.99
                }
            ],
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 4,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 30,
                    maxAmount: 1500
                }
            ],
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 2999.99
                },
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 20000
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 500,
                    maxAmount: 20000
                },
                {
                    totalPayments: 36,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 3000,
                    maxAmount: 20000
                }
            ]
        }
    },

    DEV_US_PAY_MONTHLY: {
        country: 'US',
        modalViews: [
            {
                template: 'long_term.json',
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 20000,
                template: 'pay_monthly_lt_nqez.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 499.99,
                template: 'pay_monthly_lt_sqez.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 30,
                template: 'gplq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0,
                template: 'gplnq.json',
                product: 'PAY_LATER_SHORT_TERM'
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
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 2999.99
                },
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 20000
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 500,
                    maxAmount: 20000
                }
            ],
            PAY_MONTHLY_CUSTOM: [
                {
                    totalPayments: 3,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 30,
                    maxAmount: 1500
                },
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 2999.99
                },
                {
                    totalPayments: 9,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 4999.99
                },
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 20000
                },
                {
                    totalPayments: 18,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 500,
                    maxAmount: 20000
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 20000
                },
                {
                    totalPayments: 36,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 3000,
                    maxAmount: 20000
                },
                {
                    totalPayments: 48,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 5000,
                    maxAmount: 20000
                }
            ]
        }
    }
};
