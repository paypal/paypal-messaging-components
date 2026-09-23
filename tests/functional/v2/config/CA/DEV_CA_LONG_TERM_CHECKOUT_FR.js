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
                offerHeadline: '9,23 $ CA/mois pendant 6 mois',
                updatedOfferHeadline: '94,17 $ CA/mois pendant 6 mois',
                offerFieldValues: ['26%', '6,37 $ CA', '55,37 $ CA'],
                aprDisclaimer:
                    "*Les modalités et les taux varient selon le montant de l'achat et votre dossier de crédit. Au Québec et à Terre-Neuve, le TAP n'excède pas 22 %.",
                cta: 'Continuer avec Payer par mois'
            }
        },
        {
            value: '1000.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Payer par mois',
            modalContent: {
                offerHeadline: '188,33 $ CA/mois pendant 6 mois',
                updatedOfferHeadline: '94,17 $ CA/mois pendant 6 mois',
                offerFieldValues: ['26%', '130,00 $ CA', '1 130,00 $ CA'],
                aprDisclaimer:
                    "*Les modalités et les taux varient selon le montant de l'achat et votre dossier de crédit. Au Québec et à Terre-Neuve, le TAP n'excède pas 22 %.",
                cta: 'Continuer avec Payer par mois'
            }
        },
        {
            value: '0.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Payer par mois',
            modalContent: {
                belowMinAmountErr: 'Indiquez un montant de 49,00 $ CA ou plus.'
            }
        },
        {
            value: '10000.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Payer par mois',
            modalContent: {
                aboveMaxAmountErr: 'Indiquez un montant de 10 000,00 $ CA ou moins.'
            }
        }
    ]
};
