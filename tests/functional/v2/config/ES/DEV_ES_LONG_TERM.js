export const DEV_ES_LONG_TERM = {
    testFileName: 'longTerm',
    country: 'ES',
    description: 'ES merchant eligible for long term only',
    minAmount: 60,
    maxAmount: 2999,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paga en 6, 12 o 24 plazos',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Introduce un importe igual o superior a 60 €.',
                aprDisclaimer:
                    '*Todos los ejemplos tienen carácter representativo. Las condiciones finales y los tipos de interés varían en función del importe de la compra y el perfil del cliente.'
            }
        },
        {
            value: '60.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Paga en 6, 12 o 24 plazos',
            modalContent: {
                offerHeadline: '2.50 €/mes for 6 months',
                updatedOfferHeadline: '$83.33/mo. for 6 months',
                offerFieldValues: ['0%', '$0.00', '$199.00'],
                aprDisclaimer:
                    '*Todos los ejemplos tienen carácter representativo. Las condiciones finales y los tipos de interés varían en función del importe de la compra y el perfil del cliente.'
            }
        },
        {
            value: '2999.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Paga en 6, 12 o 24 plazos',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Introduce un importe inferior a 3.000 €.',
                aprDisclaimer:
                    '*Todos los ejemplos tienen carácter representativo. Las condiciones finales y los tipos de interés varían en función del importe de la compra y el perfil del cliente.'
            }
        }
    ]
};
