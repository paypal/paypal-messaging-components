export const DEV_IT_LONG_TERM_0APR = {
    testFileName: 'longTerm',
    country: 'IT',
    description: 'IT merchant eligible for long term only at 0% APR',
    minAmount: 120,
    maxAmount: 5000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying IT Long Term Installments',
            expectedValue: 'Paga fino a 24 rate mensili per acquisti da 120 € a 5000 €, a partire da TAEG 0%.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Inserisci un importo pari o superiore a 120 €.',
                aprDisclaimer: 'Tasso annuo nominale fisso dello 0%'
            }
        },
        {
            value: '120.00',
            message: 'Qualifying IT Long Term Installments',
            expectedValue: 'A partire da 5,00 € al mese con TAEG 0%.',
            modalContent: {
                offerHeadline: '5,00 €/mese*',
                updatedOfferHeadline: '20,83 €/mese*',
                offerFieldValues: ['120,00 €', '0,00 €', '0,00 €', '120,00 €'],
                aprDisclaimer: 'Tasso annuo nominale fisso dello 0%'
            }
        },
        {
            value: '5000.01',
            message: 'Non-qualifying IT Long Term Installments',
            expectedValue: 'Paga fino a 24 rate mensili per acquisti da 120 € a 5000 €, a partire da TAEG 0%.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Inserisci un importo inferiore a 5.000 €.',
                aprDisclaimer: 'Tasso annuo nominale fisso dello 0%'
            }
        }
    ]
};
