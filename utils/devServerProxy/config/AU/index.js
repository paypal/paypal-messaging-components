export default {
    DEV_AU_MULTI: {
        country: 'AU',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                template: 'long_term_placeholder.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic.json',
                product: 'GENERIC'
            },
            {
                amount: 0.01,
                template: 'gpl.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 1,
                template: 'gplq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 500,
                template: 'long_term_q_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 15000.01,
                template: 'long_term_nq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 4,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 1,
                    maxAmount: 1999.99
                }
            ],
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 12,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 18,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 24,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                }
            ]
        }
    },
    DEV_AU_LONG_TERM: {
        country: 'AU',
        modalViews: [
            {
                template: 'long_term_placeholder.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'long_term_nq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 500,
                template: 'long_term_q_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 15000.01,
                template: 'long_term_nq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 12,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 18,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 24,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                }
            ]
        }
    },
    DEV_AU_LONG_TERM_0APR: {
        country: 'AU',
        modalViews: [
            {
                template: 'long_term_placeholder.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'long_term_nq_eqz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 500,
                template: 'long_term_q_eqz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 15000.01,
                template: 'long_term_nq_eqz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 18,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 500,
                    maxAmount: 15000
                }
            ]
        }
    },
    DEV_AU_SHORT_TERM: {
        country: 'AU',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 1999.99,
                template: 'gpl.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.99,
                template: 'gplq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0,
                template: 'gpl.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 4,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 1,
                    maxAmount: 1999.99
                }
            ]
        }
    }
};
