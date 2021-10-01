export default {
    DEV_US_LT: {
        country: 'US',
        // productName
        modalViews: ['long_term'],
        messageThresholds: [
            // minAmount, messageTemplate, productName
            [0, 'long_term', 'long_term']
        ],
        offers: {
            // productName
            long_term: [
                {
                    term: 6,
                    apr: 15,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 5000
                },
                {
                    term: 12,
                    apr: 20,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 5000
                },
                {
                    term: 24,
                    apr: 25,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 5000
                }
            ]
        }
    }
};
