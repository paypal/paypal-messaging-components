const IT = {
    DEV_IT_SHORT_TERM: {
        country: 'IT',
        description: 'IT merchant eligible for short term only',
        minAmount: 30,
        maxAmount: 2000,
        amounts: [
            {
                value: '0.00',
                message: 'Pay in 3, no amount',
                expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
                modalContent: {
                    subheadline:
                        'Disponibile per acquisti tra 30,00 € e 2.000,00 €. Nessuna tariffa iniziale o di ritardo.',
                    periodicPayment: null
                }
            },
            {
                value: '30.00',
                message: 'Pay in 3, qualifying',
                expectedValue: 'Pay in 4 interest-free payments of 10,00 €',
                modalContent: {
                    subheadline: 'Dividi in 3 il tuo acquisto di 30,00 € senza tariffe iniziali o di ritardo.',
                    periodicPayment: '10,00 €'
                }
            },
            {
                value: '2000.01',
                message: 'Pay in 3, non-qualifying',
                expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
                modalContent: {
                    subheadline:
                        'Disponibile per acquisti tra 30,00 € e 2.000,00 €. Nessuna tariffa iniziale o di ritardo.',
                    periodicPayment: ''
                }
            }
        ]
    }
};

export default IT;
