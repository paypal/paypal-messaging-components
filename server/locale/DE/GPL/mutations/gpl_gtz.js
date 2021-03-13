import Logo from '../../../../message/logos';
import { xSmallFallback, textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import {
    addPeriod,
    logoNoneAddRatenzahlungAfterPayPal,
    logoInlineAddRatenzahlungAfterPayPal,
    middleAndSmallestFallback
} from './mediaQueries';
import { textLogoMutations } from '../../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 55, textSize, 'DE'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    addPeriod(),
                    middleAndSmallestFallback(textSize * 17, textSize * 11.6)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Einkäufen']
                    },
                    {
                        tag: 'medium.2',
                        br: ['Einkäufen']
                    },
                    { tag: 'xsmall', br: ['mit'] }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    middleAndSmallestFallback(textSize * 14.75, textSize * 11.6),
                    setLogoTop(textSize * 48),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod()
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    middleAndSmallestFallback(textSize * 17, textSize * 11.6)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 55, textSize, 'DE'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    middleAndSmallestFallback(textSize * 17, textSize * 11.6),
                    `@media screen and (max-width: ${textSize *
                        14.6}px) {.message__headline .tag--xsmall > span {white-space: normal;
                        }
                    }
                    `
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    middleAndSmallestFallback(textSize * 19, textSize * 15.5),
                    logoNoneAddRatenzahlungAfterPayPal(textSize * 15.5, 4)
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Einkäufen']
                    },
                    {
                        tag: 'medium.2',
                        br: ['Einkäufen']
                    },
                    {
                        tag: 'xsmall',
                        br: ['monatlichen'],
                        replace: [['mit Ratenzahlung.', '']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 18),
                    `.message__logo { width: ${textSize * 4}px }`,
                    logoInlineAddRatenzahlungAfterPayPal(textSize * 18),
                    `@media screen and (min-width: ${textSize * 14.3}px) {
                        .message__logo-container::after {
                            content: '.';
                        }
                    }`,
                    middleAndSmallestFallback(textSize * 19, textSize * 14.25)
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['monatlichen'],
                        replace: [['Raten.', 'Raten']]
                    },
                    {
                        tag: 'medium.2',
                        br: ['monatlichen']
                    },
                    {
                        tag: 'xsmall',
                        br: ['monatlichen'],
                        replace: [['mit Ratenzahlung.', '']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
