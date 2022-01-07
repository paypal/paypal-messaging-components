import Logo from '../../../message/logos';
import {
    xSmallFallback,
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    addPeriod
} from '../../../message/mediaQueries';
import { textLogoMutations } from '../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 43, textSize, 'ES'),
                    xSmallFallback(textSize * 19.5),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    addPeriod()
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['tus']
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
                    xSmallFallback(textSize * 16),
                    setLogoTop(textSize * 43.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    `@media screen and (max-width: ${textSize *
                        14.5}px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['tus']
                    },
                    {
                        tag: 'xsmall',
                        br: ['ahora y']
                    }
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    `@media screen and (max-width: ${textSize *
                        14.5}px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['tus']
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
                    textWrap(textSize * 39, textSize, 'ES'),
                    xSmallFallback(textSize * 16),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod()
                ],
                logo: Logo.PP_PAYPAL.COLOR[0],
                headline: [
                    {
                        tag: 'medium',
                        br: ['intereses']
                    },
                    {
                        tag: 'xsmall',
                        br: ['ahora y']
                    }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 16)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['tus']
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
                        br: ['tus']
                    },
                    {
                        tag: 'xsmall',
                        br: ['después.'],
                        replace: [['después.', 'después']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
