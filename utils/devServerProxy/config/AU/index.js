export default {
    DEV_AU_MULTI: {
        country: 'AU',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'ni.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'gplnq.json',
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
    }
};
