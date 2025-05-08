export default {
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
