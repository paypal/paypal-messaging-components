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
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'plq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 2000.01,
                template: 'pl.json',
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
    DEV_GB_PAY_IN_1: {
        country: 'GB',
        modalViews: [
            {
                template: 'pay_in_30.json',
                product: 'PAY_LATER_PAY_IN_1'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'pi30nq.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                amount: 1,
                template: 'pi30q.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                amount: 900.01,
                template: 'pi30nq.json',
                product: 'PAY_LATER_PAY_IN_1'
            }
        ],
        offers: {
            PAY_LATER_PAY_IN_1: [
                {
                    totalPayments: 1,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 1,
                    maxAmount: 900
                }
            ]
        }
    },
    DEV_GB_MULTI: {
        country: 'GB',
        modalViews: [
            {
                template: 'product_list.json',
                product: 'PRODUCT_LIST'
            },
            {
                template: 'pay_in_30.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'pl.json',
                product: 'PRODUCT_LIST'
            }
        ],
        offers: {
            PAY_LATER_PAY_IN_1: [
                {
                    totalPayments: 1,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 1,
                    maxAmount: 900
                }
            ],
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
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'plq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 2000.01,
                template: 'pl.json',
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
    }
};
