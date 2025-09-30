export const DEV_CA_SHORT_TERM_FR = {
    testFileName: 'shortTerm',
    country: 'CA',
    description: 'CA merchant eligible for short term only',
    minAmount: 30,
    maxAmount: 1500,
    amounts: [
        {
            value: '0.00',
            message: 'Generic Pay in 4',
            expectedValue: 'Achetez maintenant, payez plus tard.',
            modalContent: {
                subheadline:
                    'Aucun impact sur la cote de crédit et aucuns frais de retard. Disponible pour les achats de $30 à $1,500.',
                periodicPayment: null
            }
        },
        {
            value: '30.00',
            message: 'Qualifying Pay in 4',
            expectedValue: 'Payer en 4 versements sans intérêt de $7.50',
            modalContent: {
                subheadline:
                    'Divisez le montant de $30.00 en 4 versements sans intérêt, sans incidence sur votre cote de crédit et sans frais de retard.',
                periodicPayment: '$7.50'
            }
        },
        {
            value: '1500.01',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Payer en 4 versements sans intérêt pour les achats de $30 à $1,500.',
            modalContent: {
                subheadline:
                    'Aucun impact sur la cote de crédit et aucuns frais de retard. Disponible pour les achats de $30 à $1,500.',
                periodicPayment: ''
            }
        }
    ]
};
