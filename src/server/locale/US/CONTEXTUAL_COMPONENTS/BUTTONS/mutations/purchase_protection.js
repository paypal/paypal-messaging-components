import Logo from '../../../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallFallback,
    hideDisclaimer
} from '../../../../../message/mediaQueries';
import { textLogoMutations } from '../../../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.5),
                    textWrap(textSize * 32, textSize, 'US'),
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 10.5),
                    hideDisclaimer(textSize * 10.5),
                    `.message__headline .tag--xsmall > span {display: inline-block;}`
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on']
                    },
                    {
                        tag: 'xsmall',
                        br: ['easier']
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    setLogoTop(textSize * 28.5),
                    xSmallFallback(textSize * 10.5),
                    setLogoTop(textSize * 18),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    hideDisclaimer(textSize * 10.5),
                    `.locale--US .message__messaging {padding-right: 0.4rem;}`,
                    `.message__headline .tag--xsmall > span {white-space: normal;}`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right && text.align:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.5),
                    setLogoTop(textSize * 28.5),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    hideDisclaimer(textSize * 10.5),
                    `.locale--US .message__logo-container {margin-left: 0.4rem;} `,
                    `.message__headline .tag--xsmall > span {white-space: normal;}`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.5),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    hideDisclaimer(textSize * 10.5),
                    `.message__headline .tag--xsmall > span {white-space: normal;}`
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.5),
                    textWrap(textSize * 32, textSize, 'US'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 1.35),
                    `.message__headline .tag--xsmall > span {white-space: normal;}
                    `,
                    hideDisclaimer(textSize * 10.5)
                ],
                logo: Logo.PP_MONOGRAM.COLOR
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.5),
                    `.message__headline span:last-child > strong {
	                        content: 'PayPal';
	                        display: inline-block;
	                        font-weight: bold;
	                    }
	                    `,
                    hideDisclaimer(textSize * 10.5),
                    `.message__headline .tag--xsmall > span {white-space: normal;}
                    `
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['easier']
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10.5),
                    `.message__logo { width: ${textSize * 3.5}px }`,
                    hideDisclaimer(textSize * 10.5),
                    `.message__headline .tag--xsmall > span {white-space: normal;}
                    `
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['easier']
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
