export const DEV_FR_LONG_TERM = {
    testFileName: 'longTerm',
    country: 'FR',
    description: 'FR merchant eligible for long term only',
    minAmount: 60,
    maxAmount: 2999,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paiement en 6, 12 ou 24X',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: null,
                aprDisclaimer: null
            }
        },
        {
            value: '60.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Paiement en 6, 12 ou 24X',
            modalContent: {
                offerHeadline: null,
                updatedOfferHeadline: null,
                offerFieldValues: null,
                aprDisclaimer: null
            }
        },
        {
            value: '2999.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paiement en 6, 12 ou 24X',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: null,
                aprDisclaimer: null
            }
        }
    ]
};
