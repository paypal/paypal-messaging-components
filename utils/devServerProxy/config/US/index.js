import { OFFER } from '../../../../src/utils/constants';
// Note that these values are solely mock structures for development purposes
// that are not guaranteed to be reflective of what is in production
export default {
    DEV_US_MULTI: {
        country: 'US',
        modalViews: [
            {
                template: 'v2_product_list.json',
                product: 'PRODUCT_LIST'
            },
            {
                template: 'v2_short_term.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                template: 'v2_ppc_ni.json',
                product: OFFER.PAYPAL_CREDIT_NO_INTEREST
            },
            {
                template: 'v2_long_term.json',
                offersTemplate: 'v2_long_term.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic.json',
                product: 'PRODUCT_LIST'
            },
            {
                amount: 0.01,
                template: 'short_term_nq.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                amount: 1500.01,
                template: 'ppc_ni_q.json',
                product: OFFER.PAYPAL_CREDIT_NO_INTEREST
            }
        ],
        offers: {
            [OFFER.PAY_LATER_SHORT_TERM]: [
                {
                    totalPayments: 4,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 30,
                    maxAmount: 1500
                }
            ],
            [OFFER.PAYPAL_CREDIT_NO_INTEREST]: [
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 9999.99
                }
            ],
            [OFFER.PAY_LATER_LONG_TERM]: [
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
                template: 'v2_short_term.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'short_term_nq.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                amount: 1500.01,
                template: 'short_term_nq.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            }
        ],
        offers: {
            [OFFER.PAY_LATER_SHORT_TERM]: [
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
    DEV_US_SHORT_TERM_PL2GO: {
        country: 'US',
        modalViews: [
            {
                template: 'pl2go/pl2go_short_term.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'short_term_nq.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                amount: 1500.01,
                template: 'short_term_nq.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            }
        ],
        offers: {
            [OFFER.PAY_LATER_SHORT_TERM]: [
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
    DEV_US_SHORT_TERM_PLHUB: {
        country: 'US',
        modalViews: [
            {
                template: 'PLHub/plhub_short_term.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'short_term_nq.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            },
            {
                amount: 1500.01,
                template: 'short_term_nq.json',
                product: OFFER.PAY_LATER_SHORT_TERM
            }
        ],
        offers: {
            [OFFER.PAY_LATER_SHORT_TERM]: [
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
                template: 'v2_ppc_ni.json',
                product: OFFER.PAYPAL_CREDIT_NO_INTEREST
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'ppc_ni_nq.json',
                product: OFFER.PAYPAL_CREDIT_NO_INTEREST
            },
            {
                amount: 99,
                template: 'ppc_ni_q.json',
                product: OFFER.PAYPAL_CREDIT_NO_INTEREST
            }
        ],
        offers: {
            [OFFER.PAYPAL_CREDIT_NO_INTEREST]: [
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
                template: 'v2_long_term.json',
                offersTemplate: 'v2_long_term.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic.json',
                product: 'PRODUCT_LIST'
            },
            {
                amount: 0.01,
                template: 'long_term_nq_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            },
            {
                amount: 199,
                template: 'long_term_single_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            },
            {
                amount: 10000.01,
                template: 'long_term_nq_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        offers: {
            [OFFER.PAY_LATER_LONG_TERM]: [
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
                template: 'v2_long_term_xo.json',
                offersTemplate: 'v2_long_term.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic.json',
                product: OFFER.PAY_LATER_LONG_TERM
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        offers: {
            [OFFER.PAY_LATER_LONG_TERM]: [
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
    },
    DEV_US_LONG_TERM_PL2GO: {
        country: 'US',
        modalViews: [
            {
                template: 'PL2GO/pl2go_long_term.json',
                offersTemplate: 'v2_long_term.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic.json',
                product: 'PRODUCT_LIST'
            },
            {
                amount: 0.01,
                template: 'long_term_nq_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            },
            {
                amount: 199,
                template: 'long_term_single_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            },
            {
                amount: 10000.01,
                template: 'long_term_nq_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        offers: {
            [OFFER.PAY_LATER_LONG_TERM]: [
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
    DEV_US_LONG_TERM_PLHUB: {
        country: 'US',
        modalViews: [
            {
                template: 'PLHub/plhub_long_term.json',
                offersTemplate: 'v2_long_term.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic.json',
                product: 'PRODUCT_LIST'
            },
            {
                amount: 0.01,
                template: 'long_term_nq_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            },
            {
                amount: 199,
                template: 'long_term_single_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            },
            {
                amount: 10000.01,
                template: 'long_term_nq_eqz.json',
                product: OFFER.PAY_LATER_LONG_TERM
            }
        ],
        offers: {
            [OFFER.PAY_LATER_LONG_TERM]: [
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
    }
};
