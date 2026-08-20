export const DEV_ES_LONG_TERM = {
    testFileName: 'longTerm',
    country: 'ES',
    description: 'ES merchant eligible for long term only',
    minAmount: 60,
    maxAmount: 5000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paga en 6, 12 o 24 plazos',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Introduce un importe igual o superior a 60 €.',
                aprDisclaimer: 'Tipo de interes nominal (TIN) fijo anual del 0%'
            }
        },
        {
            value: '60.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Paga en 6, 12 o 24 plazos',
            modalContent: {
                offerHeadline: '10,00 €/mes',
                updatedOfferHeadline: '83,33 €/mes',
                offerFieldValues: ['60,00 €', '0,00 €', '0,00 €', '60,00 €'],
                aprDisclaimer: 'Tipo de interes nominal (TIN) fijo anual del 0%'
            }
        },
        {
            value: '5000.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paga en 6, 12 o 24 plazos',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Introduce un importe inferior a 5.000 €.',
                aprDisclaimer: 'Tipo de interes nominal (TIN) fijo anual del 0%'
            }
        }
    ]
};
