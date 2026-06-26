export default {
    DEV_GB_SHORT_TERM: {
        country: 'GB',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'pl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'plq.json',
                templateV2: 'short-term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 2000.01,
                template: 'pl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 3,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 30,
                    maxAmount: 2000
                }
            ]
        }
    },
    DEV_GB_SHORT_TERM_CHECKOUT: {
        country: 'GB',
        modalViews: [
            {
                template: 'short_term_xo.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'pl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'plq.json',
                templateV2: 'short-term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 2000.01,
                template: 'pl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 3,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 30,
                    maxAmount: 2000
                }
            ]
        }
    },
    DEV_GB_PAY_IN_1_CHECKOUT: {
        country: 'GB',
        modalViews: [
            {
                template: 'pay_in_1_xo.json',
                product: 'PAY_LATER_PAY_IN_1'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'pl.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 1,
                template: 'plq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 900.01,
                template: 'pl.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAY_LATER_PAY_IN_1: [
                {
                    totalPayments: 1,
                    apr: 9.99,
                    nominalRate: 0,
                    minAmount: 1,
                    maxAmount: 900
                }
            ]
        }
    }
};
