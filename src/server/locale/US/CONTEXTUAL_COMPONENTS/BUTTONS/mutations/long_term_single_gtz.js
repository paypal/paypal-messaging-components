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
                    textWrap(textSize * 32, textSize, 'US'),
                    xSmallFallback(textSize * 14),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16),
                    hideDisclaimer(textSize * 14)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['of']
                    },
                    { tag: 'xsmall' }
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
                    xSmallFallback(textSize * 12.5),
                    setLogoTop(textSize * 30.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    hideDisclaimer(textSize * 12.5)
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['payments']
                    },
                    { tag: 'xsmall' }
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
                    xSmallFallback(textSize * 13),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    hideDisclaimer(textSize * 13)
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['payments']
                    },
                    { tag: 'xsmall' }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    altNoWrap(textSize * 10.6),
                    textWrap(textSize * 32, textSize, 'US'),
                    xSmallFallback(textSize * 12.5),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.message__headline .tag--xsmall > span {white-space: normal;}`,
                    hideDisclaimer(textSize * 12.5)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    hideDisclaimer(textSize * 16),
                    removePeriodFromProductName(textSize * 16)
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['mo.', 'mo']]
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
                    xSmallFallback(textSize * 16),
                    `.message__logo { width: ${textSize * 4}px }`,
                    hideDisclaimer(textSize * 16),
                    removeInlinePeriod(textSize * 16)
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['mo.', 'mo']]
                    },
                    { tag: 'xsmall.2', replace: [['later.', 'later']] }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
