export default {
    DEV_CA_SHORT_TERM: {
        country: 'CA',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 1500.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0,
                template: 'generic.json',
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
    DEV_CA_SHORT_TERM_CHECKOUT: {
        country: 'CA',
        modalViews: [
            {
                template: 'short_term_xo.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 1500.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0,
                template: 'generic.json',
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
    DEV_CA_SHORT_TERM_FR: {
        country: 'CA',
        modalViews: [
            {
                template: 'short_term_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 1500.01,
                template: 'short_term_nq_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'short_term_q_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0,
                template: 'generic_fr.json',
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
    DEV_CA_SHORT_TERM_CHECKOUT_FR: {
        country: 'CA',
        modalViews: [
            {
                template: 'short_term_xo_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 1500.01,
                template: 'short_term_nq_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'short_term_q_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0,
                template: 'generic_fr.json',
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
    }
};
