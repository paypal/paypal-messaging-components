export const DEV_CA_LONG_TERM_CHECKOUT_FR = {
    testFileName: 'longTerm',
    country: 'CA',
    description: 'CA merchant eligible for pay monthly (long term) - French',
    minAmount: 49,
    maxAmount: 10000,
    amounts: [
        {
            value: '49.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Payer par mois',
            modalContent: {
                offerHeadline: '$9.23 CAD/mois pendant 6 mois',
                updatedOfferHeadline: '$94.17 CAD/mois pendant 6 mois',
                offerFieldValues: ['26%', '$6.37', '$55.37'],
                aprDisclaimer:
                    "*Le TAEG est de 0 % à 31,99 %. Les conditions et les taux varient en fonction du montant de l'achat et de votre crédit.",
                cta: 'Continuer avec Payer par mois'
            }
        },
        {
            value: '1000.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Payer par mois',
            modalContent: {
                offerHeadline: '$105.00 CAD/mois pendant 12 mois',
                updatedOfferHeadline: '$52.50 CAD/mois pendant 12 mois',
                offerFieldValues: ['26%', '$260.00', '$1,260.00'],
                aprDisclaimer:
                    "*Le TAEG est de 0 % à 31,99 %. Les conditions et les taux varient en fonction du montant de l'achat et de votre crédit.",
                cta: 'Continuer avec Payer par mois'
            }
        },
        {
            value: '0.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Payer par mois',
            modalContent: {
                belowMinAmountErr: 'Indiquez un montant de $49.00 CAD ou plus.'
            }
        },
        {
            value: '10000.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Payer par mois',
            modalContent: {
                aboveMaxAmountErr: 'Indiquez un montant de $10,000.00 CAD ou moins.'
            }
        }
    ]
};
