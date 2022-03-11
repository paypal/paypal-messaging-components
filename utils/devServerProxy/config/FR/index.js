// Note that these values are solely mock structures for development purposes
// that are not guaranteed to be reflective of what is in production
export default {
    DEV_FR_SHORT_TERM: {
        country: 'FR',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gpl.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'gplq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 2000.01,
                template: 'gpl.json',
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
