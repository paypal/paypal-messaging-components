export const DEV_CA_SHORT_TERM_CHECKOUT_FR = {
    testFileName: 'shortTerm',
    country: 'CA',
    description: 'CA merchant eligible for short term only',
    minAmount: 10,
    maxAmount: 2000,
    amounts: [
        {
            value: '0.00',
            message: 'Generic Pay in 4',
            expectedValue: 'Achetez maintenant, payez plus tard.',
            modalContent: {
                subheadline:
                    'Aucun impact sur la cote de crédit et aucuns frais de retard. Disponible pour les achats de 10 $ CA à 2 000 $ CA.',
                periodicPayment: null
            }
        },
        {
            value: '10.00',
            message: 'Qualifying Pay in 4',
            expectedValue: 'Payer en 4 versements sans intérêt de 2,50 $',
            modalContent: {
                subheadline:
                    'Divisez le montant de 10,00 $ CA en 4 versements sans intérêt, sans incidence sur votre cote de crédit et sans frais de retard.',
                periodicPayment: '2,50 $'
            }
        },
        {
            value: '2000.01',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Payer en 4 versements sans intérêt pour les achats de 10 $ à 2 000 $.',
            modalContent: {
                subheadline:
                    'Aucun impact sur la cote de crédit et aucuns frais de retard. Disponible pour les achats de 10 $ CA à 2 000 $ CA.',
                periodicPayment: ''
            }
        }
    ]
};
