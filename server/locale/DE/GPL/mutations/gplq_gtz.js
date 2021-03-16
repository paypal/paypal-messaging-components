import Logo from '../../../../message/logos';
import { xSmallFallback, textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import {
    logoNoneAddRatenzahlungAfterPayPal,
    logoInlineAddRatenzahlungAfterPayPal,
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
                    textWrap(textSize * 38, textSize, 'DE'),
                    xSmallFallback(textSize * 15.4),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    xSmallNoWrap(textSize * 12.5),
                    primaryWrap(textSize * 15.4)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['monatlichen']
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
                    xSmallFallback(textSize * 10.25),
                    setLogoTop(textSize * 32),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.25),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize *
                        11.6}px) { .message__headline > .tag--xsmall > span:first-child { white-space: normal;}}`,
                    textWrap(textSize * 32, textSize, 'DE'),
                    xSmallFallback(textSize * 11.6),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                headline: [
                    { tag: 'medium', br: ['monatlichen'] },
                    { tag: 'xsmall', br: ['mit'] }
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    logoNoneAddRatenzahlungAfterPayPal(textSize * 16),
                    `@media screen and (max-width: ${textSize *
                        16}px) {.message__headline > span:last-child {white-space: nowrap; }}`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Einkäufen'],
                        replace: [['Raten.', 'Raten']]
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
                    xSmallFallback(textSize * 16.5),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after {
                        content: '.';
                    }`,
                    logoInlineAddRatenzahlungAfterPayPal(textSize * 16.5)
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['monatlichen'],
                        replace: [['Raten.', 'Raten']]
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
