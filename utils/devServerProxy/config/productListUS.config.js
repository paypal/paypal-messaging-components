export const DEV_US_PRODUCT_LIST = {
    country: 'US',
    modalViews: [
        {
            template: 'product_list.json',
            offersTemplate: 'long_term.json',
            product: 'PRODUCT_LIST'
        },
        {
            template: 'long_term.json',
            offersTemplate: 'long_term.json',
            product: 'PAY_LATER_LONG_TERM'
        },
        {
            template: 'gpl.json',
            offersTemplate: 'short_term.json',
            product: 'PAY_LATER_SHORT_TERM'
        }
    ],
    messageThresholds: [
        {
            amount: 0,
            template: 'gplnq.json',
            product: 'PAY_LATER_SHORT_TERM'
        }
    ],
    offers: {
        PRODUCT_LIST: [
            {
                totalPayments: 6,
                apr: 0,
                nominalRate: 0,
                minAmount: 99,
                maxAmount: 5000
            }
        ],
        PAYPAL_CREDIT_NO_INTEREST: [
            {
                totalPayments: 6,
                apr: 0,
                nominalRate: 0,
                minAmount: 99
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
};
