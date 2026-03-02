// Note that these values are solely mock structures for development purposes
// that are not guaranteed to be reflective of what is in production
export default {
    DEV_AT_MULTI: {
        country: 'AT',
        modalViews: [
            {
                template: 'product_list.json',
                product: 'PRODUCT_LIST'
            },
            {
                template: 'pay_in_1.json',
                product: 'PAY_LATER_PAY_IN_1'
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
                    maxAmount: 2000
                }
            ],
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 3,
                    apr: 9.99,
                    nominalRate: 9.48,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 6,
                    apr: 9.99,
                    nominalRate: 9.48,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 9.99,
                    nominalRate: 9.5,
                    minAmount: 99,
                    maxAmount: 10000
                },
                {
                    totalPayments: 24,
                    apr: 9.99,
                    nominalRate: 9.51,
                    minAmount: 99,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_AT_PAY_IN_1: {
        country: 'AT',
        modalViews: [
            {
                template: 'pay_in_1.json',
                product: 'PAY_LATER_PAY_IN_1'
            }
        ],
        messageThresholds: [
            {
                amount: 0.01,
                template: 'pi30nq.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                amount: 1,
                template: 'pi30q.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                amount: 2000.01,
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
                    maxAmount: 2000
                }
            ]
        }
    },
    DEV_AT_PAY_IN_1_EN: {
        country: 'AT',
        modalViews: [
            {
                template: 'pay_in_1_en.json',
                product: 'PAY_LATER_PAY_IN_1'
            }
        ],
        messageThresholds: [
            {
                amount: 0.01,
                template: 'pi30nq-non-at.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                amount: 1,
                template: 'pi30q-non-at.json',
                product: 'PAY_LATER_PAY_IN_1'
            },
            {
                amount: 2000.01,
                template: 'pi30nq-non-at.json',
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
                    maxAmount: 2000
                }
            ]
        }
    },
    DEV_AT_LONG_TERM: {
        country: 'AT',
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
                template: 'gpl_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 99,
                template: 'gplq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 10000.01,
                template: 'gpl_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 3,
                    apr: 9.99,
                    nominalRate: 9.48,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 6,
                    apr: 9.99,
                    nominalRate: 9.48,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 9.99,
                    nominalRate: 9.5,
                    minAmount: 99,
                    maxAmount: 10000
                },
                {
                    totalPayments: 24,
                    apr: 9.99,
                    nominalRate: 9.51,
                    minAmount: 99,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_AT_LONG_TERM_EN: {
        country: 'AT',
        modalViews: [
            {
                template: 'long_term_en.json',
                offersTemplate: 'long_term_en.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gpl_gtz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 99,
                template: 'gplq_gtz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 10000.01,
                template: 'gpl_gtz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 3,
                    apr: 9.99,
                    nominalRate: 9.48,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 6,
                    apr: 9.99,
                    nominalRate: 9.48,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 9.99,
                    nominalRate: 9.5,
                    minAmount: 99,
                    maxAmount: 10000
                },
                {
                    totalPayments: 24,
                    apr: 9.99,
                    nominalRate: 9.51,
                    minAmount: 99,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_AT_LONG_TERM_0APR: {
        country: 'AT',
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
                template: 'gpl_eqz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 99,
                template: 'gplq_eqz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 10000.01,
                template: 'gpl_eqz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 3,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 10000
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_AT_XB_MULTI_LT: {
        country: 'AT',
        modalViews: [
            {
                template: 'long_term_en.json',
                offersTemplate: 'long_term_en.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                template: 'pay_in_1_en.json',
                product: 'PAY_LATER_PAY_IN_1'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gpl_gtz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 99,
                template: 'gplq_gtz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 10000.01,
                template: 'gpl_gtz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_PAY_IN_1: [
                {
                    totalPayments: 1,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 1,
                    maxAmount: 2000
                }
            ],
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 3,
                    apr: 9.99,
                    nominalRate: 9.48,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 6,
                    apr: 9.99,
                    nominalRate: 9.48,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 9.99,
                    nominalRate: 9.5,
                    minAmount: 99,
                    maxAmount: 10000
                },
                {
                    totalPayments: 24,
                    apr: 9.99,
                    nominalRate: 9.51,
                    minAmount: 99,
                    maxAmount: 10000
                }
            ]
        }
    },
    DEV_AT_LONG_TERM_EN_0APR: {
        country: 'AT',
        modalViews: [
            {
                template: 'long_term_en.json',
                offersTemplate: 'long_term_en.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gpl_eqz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 99,
                template: 'gplq_eqz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 10000.01,
                template: 'gpl_eqz-non-at.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 3,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 10000
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 10000
                }
            ]
        }
    }
};
