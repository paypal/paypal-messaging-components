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
    },
    DEV_CA_LONG_TERM_CHECKOUT: {
        country: 'CA',
        modalViews: [
            {
                template: 'long_term_xo.json',
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 10000.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 49,
                template: 'short_term_q.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 0,
                template: 'generic.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                },
                {
                    totalPayments: 12,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_CA_LONG_TERM_CHECKOUT_FR: {
        country: 'CA',
        modalViews: [
            {
                template: 'long_term_xo_fr.json',
                offersTemplate: 'long_term_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 10000.01,
                template: 'short_term_nq_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 49,
                template: 'short_term_q_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 0,
                template: 'generic_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                },
                {
                    totalPayments: 12,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_CA_LONG_TERM: {
        country: 'CA',
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
                template: 'generic.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 0.01,
                template: 'long_term_nq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 49,
                template: 'long_term_q_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 10000.01,
                template: 'long_term_nq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                },
                {
                    totalPayments: 12,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_CA_LONG_TERM_FR: {
        country: 'CA',
        modalViews: [
            {
                template: 'long_term_fr.json',
                offersTemplate: 'long_term_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 0.01,
                template: 'long_term_nq_gtz_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 49,
                template: 'long_term_q_gtz_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 10000.01,
                template: 'long_term_nq_gtz_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                },
                {
                    totalPayments: 12,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_CA_MULTI: {
        country: 'CA',
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
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 49,
                template: 'long_term_q_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 1500.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 10000.01,
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
                    minAmount: 30,
                    maxAmount: 1500
                }
            ],
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                },
                {
                    totalPayments: 12,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_CA_MULTI_FR: {
        country: 'CA',
        modalViews: [
            {
                template: 'product_list_fr.json',
                product: 'PRODUCT_LIST'
            },
            {
                template: 'short_term_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                template: 'long_term_fr.json',
                offersTemplate: 'long_term_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'generic_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'short_term_q_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 49,
                template: 'long_term_q_gtz_fr.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 1500.01,
                template: 'short_term_nq_fr.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 10000.01,
                template: 'long_term_nq_gtz_fr.json',
                product: 'PAY_LATER_LONG_TERM'
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
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                },
                {
                    totalPayments: 12,
                    apr: 26,
                    nominalRate: 0,
                    minAmount: 49,
                    maxAmount: 10000
                }
            ]
        }
    }
};
