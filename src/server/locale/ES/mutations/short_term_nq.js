import Logo from '../../../message/logos';
import {
    xSmallFallback,
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    addPeriod,
    logo20x1
} from '../../../message/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall']
    },
    {
        sizes: ['medium'],
        breaks: ['tus']
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
            logo: Logo.WORDMARK.WHITE,
            headline: [
                {
                    tag: 'xsmall'
                },
                {
                    tag: 'medium'
                }
            ],
            disclaimer: ['xsmall', 'default'],
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
                    textWrap(textSize * 51, textSize, 'ES'),
                    xSmallFallback(textSize * 19.5),
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 20),
                    addPeriod()
                ],
                logo: Logo.WORDMARK.BLACK,
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
                disclaimer: ['xsmall', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    setLogoTop(textSize * 51),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    addPeriod(),
                    `@media screen and (max-width: ${
                        textSize * 14.5
                    }px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
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
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    addPeriod(),
                    `@media screen and (max-width: ${
                        textSize * 14.5
                    }px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
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
                    textWrap(textSize * 46, textSize, 'ES'),
                    xSmallFallback(textSize * 19),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 1.35),
                    addPeriod()
                ],
                logo: Logo.PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['de']
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
                styles: [
                    xSmallFallback(textSize * 21.6),
                    `@media screen and (max-width: ${
                        textSize * 14.5
                    }px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['de']
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
                    xSmallFallback(textSize * 21.6),
                    `.message__logo { width: ${textSize * 3.5}px }`,
                    `@media screen and (max-width: ${
                        textSize * 14.5
                    }px) { .message__headline > .tag--xsmall > span { white-space: normal;} }`
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['de']
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
