const ES = {
    DEV_ES_SHORT_TERM: {
        country: 'ES',
        description: 'ES merchant eligible for short term only',
        minAmount: 30,
        maxAmount: 2000,
        amounts: [
            {
                value: '0.00',
                message: 'Non-qualifying Pay in 3',
                expectedValue: 'Paga en 3 plazos sin intereses tus compras de 30 € a 2.000 €',
                modalContent: {
                    subheadline:
                        'Disponible para las compras de 30 € a 2.000 €. Sin comisiones de apertura ni por pago atrasado.',
                    periodicPayment: null
                }
            },
            {
                value: '30.00',
                message: 'Qualifying Pay in 3',
                expectedValue: 'Paga en 3 plazos de 10.00 €, sin intereses',
                modalContent: {
                    subheadline:
                        'Divide tu compra de 30.00 € en 3 plazos, sin comisiones de apertura ni por pago atrasado.',
                    periodicPayment: '10.00 €'
                }
            },
            {
                value: '2000.01',
                message: 'Non-qualifying Pay in 3',
                expectedValue: 'Paga en 3 plazos sin intereses tus compras de 30 € a 2.000 €',
                modalContent: {
                    subheadline:
                        'Disponible para las compras de 30 € a 2.000 €. Sin comisiones de apertura ni por pago atrasado.',
                    periodicPayment: ''
                }
            }
        ]
    }
};

export default ES;
