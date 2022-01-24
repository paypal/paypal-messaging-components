// Note that these values are solely mock structures for development purposes
// that are not guaranteed to be reflective of what is in production
export default {
    DEV_US_MULTI: {
        country: 'US',
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
                template: 'gplnq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'gplq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 1500.01,
                template: 'niq.json',
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
    DEV_US_SHORT_TERM: {
        country: 'US',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gplnq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'gplq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 1500.01,
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
            ]
        }
    },
    DEV_US_NO_INTEREST: {
        country: 'US',
        modalViews: [
            {
                template: 'ni_v2.json',
                product: 'PAYPAL_CREDIT_NO_INTEREST'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'ni.json',
                product: 'PAYPAL_CREDIT_NO_INTEREST'
            },
            {
                amount: 99,
                template: 'niq.json',
                product: 'PAYPAL_CREDIT_NO_INTEREST'
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
            ]
        }
    },
    DEV_US_LONG_TERM: {
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
                amount: 0,
                template: 'gplnq.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
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
    DEV_US_LONG_TERM_CHECKOUT: {
        country: 'US',
        modalViews: [
            {
                template: 'long_term_xo.json',
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gplnq.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 30,
                template: 'gplq.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 10,
                    nominalRate: 10,
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
    }
};
