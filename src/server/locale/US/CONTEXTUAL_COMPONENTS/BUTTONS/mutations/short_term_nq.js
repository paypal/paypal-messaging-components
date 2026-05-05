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
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 20),
                    hideDisclaimer(textSize * 16.5)
                ],
                logo: Logo.WORDMARK.BLACK,
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
                    messageLogoWidth(textSize * 6, textSize * 5.1),
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
                    messageLogoWidth(textSize * 6, textSize * 5.1),
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
                    messageLogoWidth(textSize * 1.75, textSize * 1.35),
                    `.locale--US .message__headline > .tag--medium > span { white-space: normal }`,
                    `.message__headline .tag--xsmall > span {white-space: normal;}`,
                    hideDisclaimer(textSize * 15.4)
                ],
                logo: Logo.PP_MONOGRAM.COLOR
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
                    `.message__logo { width: ${textSize * 4.1}px }`,
                    hideDisclaimer(textSize * 18),
                    removeInlinePeriod(textSize * 18)
                ],
                logo: Logo.WORDMARK.BLACK,
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
