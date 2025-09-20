export const DEV_IT_LONG_TERM = {
    testFileName: 'longTerm',
    country: 'IT',
    description: 'IT merchant eligible for long term only',
    minAmount: 60,
    maxAmount: 2999,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paga in 6, 12 o 24 rate',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Inserisci un importo pari o superiore a 60 €.',
                aprDisclaimer:
                    "*Tutti gli esempi hanno natura rappresentativa. Le condizioni finali e i tassi d'interesse applicati variano in base all'importo dell'acquisto e del profilo del cliente."
            }
        },
        {
            value: '60.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Paga in 6, 12 o 24 rate',
            modalContent: {
                offerHeadline: '2.50 €/mIT for 6 months',
                updatedOfferHeadline: '$83.33/mo. for 6 months',
                offerFieldValues: ['0%', '$0.00', '$199.00'],
                aprDisclaimer:
                    "*Tutti gli esempi hanno natura rappresentativa. Le condizioni finali e i tassi d'interesse applicati variano in base all'importo dell'acquisto e del profilo del cliente."
            }
        },
        {
            value: '2999.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paga in 6, 12 o 24 rate',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Introduce un importe inferior a 3.000 €.',
                aprDisclaimer:
                    "*Tutti gli esempi hanno natura rappresentativa. Le condizioni finali e i tassi d'interesse applicati variano in base all'importo dell'acquisto e del profilo del cliente."
            }
        }
    ]
};
