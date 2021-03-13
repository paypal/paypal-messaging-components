import Logo from '../../../../message/logos';
import { xSmallFallback, textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import { textLogoMutations } from '../../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 38, textSize, 'DE'),
                    xSmallFallback(textSize * 8 + 5),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['ab']
                    },
                    { tag: 'xsmall', br: ['verfügbar.'] }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 9 + 8),
                    setLogoTop(textSize * 35),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 9 + 8),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 32, textSize, 'DE'),
                    xSmallFallback(textSize * 10.6),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    `.message__headline > .tag--xsmall > span { white-space: normal;}`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['pro'],
                        replace: [['Monat.', 'Monat']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['Ratenzahlung'],
                        replace: [['verfügbar.', 'verfügbar']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after {
                        content: '.';
                    }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['pro'],
                        replace: [['Monat.', 'Monat']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['Ratenzahlung'],
                        replace: [['verfügbar.', 'verfügbar']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
