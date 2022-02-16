export const DEV_US_NO_INTEREST = {
    testFileName: 'noInterest',
    country: 'US',
    description: 'US merchant eligible for NI only',
    amounts: [
        {
            value: '99.00',
            message: 'Qualifying PPC NI',
            expectedValue: 'No interest if paid in full in 6 months.',
            modalContent: 'Apply now and get a decision in seconds.'
        }
    ]
};
