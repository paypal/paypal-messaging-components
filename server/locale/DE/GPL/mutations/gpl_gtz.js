import Logo from '../../../../message/logos';
import { xSmallFallback, textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import {
    addPeriod,
    logoNoneAddRatenzahlungAfterPayPal,
    logoInlineAddRatenzahlungAfterPayPal,
    middleAndSmallestFallback,
    xSmallNoWrap,
    primaryWrap
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
                    middleAndSmallestFallback(textSize * 25, textSize * 16.5),
                    xSmallNoWrap(textSize * 16.5),
                    primaryWrap(textSize * 15.4)
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
                    middleAndSmallestFallback(textSize * 25, textSize * 20),
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
                    middleAndSmallestFallback(textSize * 25, textSize * 20)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize *
                        11.3}px) { .message__headline > .tag--xsmall > span:first-child { white-space: normal;}}`,
                    textWrap(textSize * 55, textSize, 'DE'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    middleAndSmallestFallback(textSize * 25, textSize * 11.3)
                ],
                headline: [
                    { tag: 'medium', br: ['Einkäufen'] },
                    { tag: 'medium.2', br: ['i.H.v.'] },
                    { tag: 'xsmall' }
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    middleAndSmallestFallback(textSize * 19, textSize * 14.25),
                    logoNoneAddRatenzahlungAfterPayPal(textSize * 14.25, 4),
                    `@media screen and (max-width: ${textSize *
                        14}px) {.message__headline > span:last-child {white-space: nowrap; }}`
                ],
                logo: false,
                headline: [
                    { tag: 'medium' },
                    { tag: 'medium.2' },
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
