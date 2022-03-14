export const DEV_FR_SHORT_TERM = {
    testFileName: 'shortTerm',
    country: 'FR',
    description: 'FR merchant eligible for short term only',
    minAmount: 30,
    maxAmount: 2000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Disponible pour les achats de 30,00 € à 2.000,00 €',
            modalContent: {
                subheadline:
                    'Disponible pour les achats de 30,00 € à 2.000,00 €. Pas de frais de dossier ni de frais de retard.',
                periodicPayment: null
            }
        },
        {
            value: '30.00',
            message: 'Qualifying Pay in 4',
            expectedValue: 'Payez votre achat de 30,00 €',
            modalContent: {
                subheadline: 'Payez votre achat de 30,00 € en 4 fois sans frais de dossier ni frais de retard.',
                periodicPayment: '10,00 €'
            }
        },
        {
            value: '2000.01',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Disponible pour les achats de 30,00 € à 2.000,00 €',
            modalContent: {
                subheadline:
                    'Disponible pour les achats de 30,00 € à 2.000,00 €. Pas de frais de dossier ni de frais de retard.',
                periodicPayment: ''
            }
        }
    ]
};
