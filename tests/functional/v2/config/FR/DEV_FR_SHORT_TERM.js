export const DEV_FR_SHORT_TERM = {
    testFileName: 'shortTerm',
    country: 'FR',
    description: 'FR merchant eligible for short term only',
    minAmount: 30,
    maxAmount: 2000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay in 3',
            expectedValue: 'Paga en 3 plazos sin intereses tus compras de 30,00 € a 2.000,00 €',
            modalContent: {
                subheadline:
                    'Disponible para las compras de 30,00 € a 2.000,00 €. Sin comisiones de apertura ni por pago atrasado.',
                periodicPayment: null
            }
        },
        {
            value: '30.00',
            message: 'Qualifying Pay in 3',
            expectedValue: 'Paga en 3 plazos de 10,00 €, sin intereses',
            modalContent: {
                subheadline:
                    'Divide tu compra de 30,00 € en 3 plazos, sin comisiones de apertura ni por pago atrasado.',
                periodicPayment: '10,00 €'
            }
        },
        {
            value: '2000.01',
            message: 'Non-qualifying Pay in 3',
            expectedValue: 'Paga en 3 plazos sin intereses tus compras de 30,00 € a 2.000,00 €',
            modalContent: {
                subheadline:
                    'Disponible para las compras de 30,00 € a 2.000,00 €. Sin comisiones de apertura ni por pago atrasado.',
                periodicPayment: ''
            }
        }
    ]
};
