import Logo from '../../../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallFallback,
    hideDisclaimer,
    removeInlinePeriod,
    removePeriodFromProductName
} from '../../../../../message/mediaQueries';
import { textLogoMutations } from '../../../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 18.5}px) { 
                        .message__headline > .tag--medium > span.br:first-child { white-space: normal; } 
                    }`,
                    textWrap(textSize * 34, textSize, 'US'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16),
                    hideDisclaimer(textSize * 16)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mo.']
                    },
                    {
                        tag: 'xsmall'
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 18.5}px) {
                        .message__headline > .tag--medium { white-space: normal; }
                    }`,
                    xSmallFallback(textSize * 10.75),
                    setLogoTop(textSize * 34.2),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    hideDisclaimer(textSize * 10.75)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 18.5}px) { 
                        .message__headline > .tag--medium { white-space: normal; } 
                    }`,
                    xSmallFallback(textSize * 10.75),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    hideDisclaimer(textSize * 10.75)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    xSmallFallback(textSize * 11.5),
                    altNoWrap(textSize * 10.6),
                    textWrap(textSize * 32, textSize, 'US'),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.message__headline .tag--xsmall > span {white-space: normal;}`,
                    hideDisclaimer(textSize * 11.5)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 12.5),
                    hideDisclaimer(textSize * 12.5),
                    removePeriodFromProductName(textSize * 12.5)
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mo.', 'mo'],
                        replace: [
                            ['APR.', 'APR'],
                            ['mo.', 'mo']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 12.5),
                    `.message__logo { width: ${textSize * 4}px }`,
                    hideDisclaimer(textSize * 12.5),
                    removeInlinePeriod(textSize * 12.5)
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mo.', 'mo'],
                        replace: [
                            ['APR.', 'APR'],
                            ['mo.', 'mo']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
