import { flexLogoMutations, textLogoMutations } from '../../../message/logoMutations';
import Logo from '../../../message/logos';
import {
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
        breaks: ['acquisti']
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
                disclaimer: ['large', 'default'],
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
                    textWrap(textSize * 78.5, textSize, 'IT'),
                    xSmallFallback(textSize * 23),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    `.message__headline .br:nth-child(3) {
    font-weight: bold;
}`
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['acquisti', '€, ']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['large', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 17.4),
                    setLogoTop(textSize * 78.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.message__headline .br:nth-child(3) {
    font-weight: bold;
}`
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['acquisti', '€, ']
                    },
                    { tag: 'xsmall' }
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 21),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.message__headline .br:nth-child(3) {
    font-weight: bold;
}`
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['acquisti', '€, ']
                    },
                    { tag: 'xsmall' }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 14}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 76, textSize, 'IT'),
                    xSmallFallback(textSize * 19),
                    altNoWrap(textSize * 14),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.message__headline .br:nth-child(3) {
    font-weight: bold;
}`
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 24),
                    `.message__headline .br:nth-child(3) {
    font-weight: bold;
}`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['acquisti', '€, '],
                        replace: [['0%.', '0%']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['dopo.'],
                        replace: [['dopo.', 'dopo']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 24),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__headline .br:nth-child(3) {
    font-weight: bold;
}`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium.2',
                        br: ['acquisti', '€, '],
                        replace: [['0%.', '0%']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['dopo.'],
                        replace: [['dopo.', 'dopo']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
