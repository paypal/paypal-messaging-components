import { flexLogoMutations, textLogoMutations } from '../../../message/logoMutations';
import Logo from '../../../message/logos';
import {
    addPeriod,
    altNoWrap,
    logo20x1,
    messageLogoWidth,
    setLogoTop,
    textWrap,
    xSmallFallback
} from '../../../message/mediaQueries';

const headlineBreaks = [
    {
        sizes: ['xsmall']
    },
    {
        sizes: ['medium'],
        breaks: ['da']
    }
].reduce((acc, item) => {
    const { sizes, breaks } = item;
    sizes.forEach(size => {
        acc.push({
            tag: size,
            br: breaks
        });
    });
    return acc;
}, []);

export default {
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PP_PAYPAL.WHITE,
                headline: [
                    {
                        tag: 'xsmall'
                    },
                    {
                        tag: 'medium'
                    }
                ],
                disclaimer: ['xsmall', 'default'],
                styles: []
            }
        ],
        [
            'ratio:20x1',
            {
                headline: [...headlineBreaks],
                styles: [logo20x1()]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: [...headlineBreaks]
            }
        ],
        ...flexLogoMutations
    ],
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 37, textSize, 'IT'),
                    xSmallFallback(textSize * 18),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16),
                    addPeriod()
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['senza'],
                        replace: [['interessi.', 'interessi']]
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['xsmall', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${
                        textSize * 18.5
                    }px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 16),
                    setLogoTop(textSize * 37),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod()
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${
                        textSize * 18.5
                    }px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod()
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 14}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 33.5, textSize, 'IT'),
                    xSmallFallback(textSize * 14),
                    altNoWrap(textSize * 14),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod()
                ],
                logo: Logo.PP_PAYPAL.COLOR[0],
                headline: [
                    {
                        tag: 'medium',
                        br: ['senza'],
                        replace: [['interessi.', 'interessi']]
                    },
                    { tag: 'xsmall' }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 19)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['senza'],
                        replace: [['interessi.', 'interessi']]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [['dopo.', 'dopo']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 19), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['senza'],
                        replace: [['interessi.', 'interessi']]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [['dopo.', 'dopo']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
