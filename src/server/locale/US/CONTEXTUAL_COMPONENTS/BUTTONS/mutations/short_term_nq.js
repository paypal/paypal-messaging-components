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
                    textWrap(textSize * 42, textSize, 'US'),
                    xSmallFallback(textSize * 16.5),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    hideDisclaimer(textSize * 16.5)
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
                    `.message__messaging span.br {white-space: normal;}`,
                    xSmallFallback(textSize * 14),
                    setLogoTop(textSize * 42.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    hideDisclaimer(textSize * 14)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `.message__messaging span.br {white-space: normal;}`,
                    xSmallFallback(textSize * 13),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    hideDisclaimer(textSize * 13)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 38, textSize, 'US'),
                    xSmallFallback(textSize * 15.4),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.locale--US .message__headline > .tag--medium > span { white-space: normal }`,
                    `.message__headline .tag--xsmall > span {white-space: normal;}`,
                    hideDisclaimer(textSize * 15.4)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 18),
                    hideDisclaimer(textSize * 18),
                    removePeriodFromProductName(textSize * 18)
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['00.', '00']]
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
                    xSmallFallback(textSize * 18),
                    `.message__logo { width: ${textSize * 4}px }`,
                    hideDisclaimer(textSize * 18),
                    removeInlinePeriod(textSize * 18)
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['00.', '00']]
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
