import Logo from '../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallFallback,
    addPeriod
} from '../../../message/mediaQueries';
import { textLogoMutations } from '../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 33, textSize, 'ES'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16),
                    addPeriod()
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['plazos']
                    },
                    {
                        tag: 'xsmall',
                        br: ['ahora y']
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize *
                        18.5}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 10.75),
                    setLogoTop(textSize * 34),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    `@media screen and (max-width: ${textSize *
                        14.5}px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize *
                        18.5}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 10.75),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    `@media screen and (max-width: ${textSize *
                        14.5}px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['plazos']
                    },
                    {
                        tag: 'xsmall',
                        br: ['ahora y']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize, 'ES'),
                    xSmallFallback(textSize * 11.5),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod()
                ],
                logo: Logo.PP_PAYPAL.COLOR[0],
                headline: [
                    {
                        tag: 'medium',
                        br: ['€,']
                    },
                    {
                        tag: 'xsmall',
                        br: ['ahora']
                    }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 18)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['plazos']
                    },
                    {
                        tag: 'xsmall',
                        br: ['después.'],
                        replace: [['después.', 'después']]
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
                    `@media screen and (max-width: ${textSize *
                        14.5}px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['€,']
                    },
                    {
                        tag: 'xsmall',
                        replace: [['después.', 'después']],
                        br: ['después']
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
