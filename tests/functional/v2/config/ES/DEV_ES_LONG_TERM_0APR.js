export const DEV_ES_LONG_TERM_0APR = {
    testFileName: 'longTerm',
    country: 'ES',
    description: 'ES merchant eligible for long term only at 0% APR',
    minAmount: 120,
    maxAmount: 5000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying ES Long Term Installments',
            expectedValue: 'Paga en hasta 24 plazos para compras de 120 € a 5000 €, desde 0% TAE.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Introduce un importe igual o superior a 120 €.',
                aprDisclaimer: 'TIN fijo anual del 0%'
            }
        },
        {
            value: '120.00',
            message: 'Qualifying ES Long Term Installments',
            expectedValue: 'Desde 5,00 € al mes al 0% TAE.',
            modalContent: {
                offerHeadline: '5,00 €/Monat',
                updatedOfferHeadline: '104,17 €/Monat',
                offerFieldValues: ['120,00 €', '0,00 €', '0,00 €', '120,00 €'],
                aprDisclaimer: 'TIN fijo anual del 0%'
            }
        },
        {
            value: '5000.01',
            message: 'Non-qualifying ES Long Term Installments',
            expectedValue: 'Paga en hasta 24 plazos para compras de 120 € a 5000 €, desde 0% TAE.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Introduce un importe inferior a 5.000 €.',
                aprDisclaimer: 'TIN fijo anual del 0%'
            }
        }
    ]
};
