export const DEV_IT_LONG_TERM = {
    testFileName: 'longTerm',
    country: 'IT',
    description: 'IT merchant eligible for long term only',
    minAmount: 60,
    maxAmount: 5000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paga in 6, 12 o 24 rate',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Inserisci un importo pari o superiore a 60 €.',
                aprDisclaimer: 'Tasso annuo nominale fisso dello 0%'
            }
        },
        {
            value: '60.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Paga in 6, 12 o 24 rate',
            modalContent: {
                offerHeadline: '2,50 €/mese',
                updatedOfferHeadline: '20,83 €/mese',
                offerFieldValues: ['60,00 €', '0,00 €', '60,00 €'],
                aprDisclaimer: 'Tasso annuo nominale fisso dello 0%'
            }
        },
        {
            value: '5000.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paga in 6, 12 o 24 rate',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Inserisci un importo inferiore a 5.000 €.',
                aprDisclaimer: 'Tasso annuo nominale fisso dello 0%'
            }
        }
    ]
};
