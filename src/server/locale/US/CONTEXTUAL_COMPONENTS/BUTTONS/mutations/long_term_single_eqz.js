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
                        .message__headline > .tag--medium > span > span:last-child { white-space: normal; }
                    }`,
                    textWrap(textSize * 36.5, textSize, 'US'),
                    xSmallFallback(textSize * 14),
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 16),
                    hideDisclaimer(textSize * 14)
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['of']
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
                    `@media screen and (max-width: ${textSize * 25.5}px) {
                        .message__headline > .tag--medium { white-space: normal; }
                    }`,
                    xSmallFallback(textSize * 13),
                    setLogoTop(textSize * 37),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    hideDisclaimer(textSize * 13)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 25.5}px) { 
                        .message__headline > .tag--medium { white-space: normal; } 
                    }`,
                    xSmallFallback(textSize * 13.2),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    hideDisclaimer(textSize * 13.2)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    xSmallFallback(textSize * 12.5),
                    altNoWrap(textSize * 10.6),
                    textWrap(textSize * 32, textSize, 'US'),
                    messageLogoWidth(textSize * 1.75, textSize * 1.35),
                    `.message__headline .tag--xsmall > span {white-space: normal;}`,
                    hideDisclaimer(textSize * 12.5)
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['mo.']
                    },
                    {
                        tag: 'xsmall'
                    }
                ],
                logo: Logo.PP_MONOGRAM.COLOR
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 14),
                    hideDisclaimer(textSize * 14),
                    removePeriodFromProductName(textSize * 14)
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['of'],
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
                    xSmallFallback(textSize * 14),
                    `.message__logo { width: ${textSize * 4.1}px }`,
                    hideDisclaimer(textSize * 14),
                    removeInlinePeriod(textSize * 14)
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['of'],
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
