import Logo from '../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    logo20x1,
    xSmallFallback,
    addPeriod,
    disclaimerWrap
} from '../../../message/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall']
    },
    {
        sizes: ['medium'],
        breaks: ["jusqu'à"]
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

const flex = [
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
            styles: ['.message__headline .tag--medium > span:first-child:after { content: "."; }']
        }
    ],
    [
        'ratio:20x1',
        {
            headline: [...headlineBreaks],
            styles: [logo20x1(), '.message__headline .tag--medium > span:first-child:after { content: "."; }']
        }
    ],
    [
        'ratio:8x1',
        {
            headline: [...headlineBreaks]
        }
    ],
    ...flexLogoMutations
];
export default {
    'layout:flex': flex,
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 42, textSize, 'FR'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16),
                    addPeriod(),
                    disclaimerWrap()
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ["jusqu'à"]
                    },
                    {
                        tag: 'xsmall',
                        br: ['en, ']
                    }
                ],
                disclaimer: ['large', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${
                        textSize * 18.5
                    }px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 12),
                    setLogoTop(textSize * 40),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    disclaimerWrap(),
                    `@media screen and (max-width: ${
                        textSize * 14.5
                    }px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
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
                    xSmallFallback(textSize * 12),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    disclaimerWrap(),
                    `@media screen and (max-width: ${
                        textSize * 14.5
                    }px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ["jusqu'à"]
                    },
                    {
                        tag: 'xsmall',
                        br: ['en, ']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 34, textSize, 'FR'),
                    xSmallFallback(textSize * 11.5),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    disclaimerWrap()
                ],
                logo: Logo.PP_PAYPAL.COLOR[0],
                headline: [
                    {
                        tag: 'medium',
                        br: ["jusqu'à"]
                    },
                    {
                        tag: 'xsmall',
                        br: ['en,']
                    }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 20),
                    disclaimerWrap(),
                    `@media screen and (max-width: ${
                        textSize * 14.5
                    }px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mensualités'],
                        replace: [['mensualités.', 'mensualités ']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['fois.'],
                        replace: [['fois.', 'fois']]
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
                    disclaimerWrap(),
                    `@media screen and (max-width: ${
                        textSize * 14.5
                    }px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mensualités'],
                        replace: [['mensualités.', 'mensualités ']]
                    },
                    {
                        tag: 'xsmall',
                        replace: [['fois.', 'fois']],
                        br: ['fois']
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
