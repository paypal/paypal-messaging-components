import Logo from '../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallFallback,
    logo20x1
} from '../../../message/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../message/logoMutations';

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
            disclaimer: ['default']
        }
    ],
    [
        'ratio:20x1',
        {
            styles: [logo20x1()]
        }
    ],
    [
        'ratio:8x1',
        {
            headline: [
                {
                    tag: 'xsmall'
                },
                {
                    tag: 'medium',
                    br: ['on']
                }
            ],
            styles: [
                `@media (min-aspect-ratio: 60/11) and (min-width: 324px) {
                    .message__headline .tag--medium .br:first-child {
                        display: inline;
                    }
                }
                `
            ]
        }
    ],
    ['color:white-no-border', { logo: Logo.WORDMARK.BLACK }],
    ...flexLogoMutations
];

export default {
    'layout:flex': flex,
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 39.5, textSize, 'CA'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['for', 'pour']
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
                    xSmallFallback(textSize * 16),
                    setLogoTop(textSize * 40),
                    messageLogoWidth(textSize * 6, textSize * 5.1)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 14.75 + 10), messageLogoWidth(textSize * 6, textSize * 5.1)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 37, textSize, 'CA'),
                    xSmallFallback(textSize * 15.4),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 1.35),
                    `.locale--CA .message__headline > .tag--medium > span { white-space: normal }`,
                    `@media screen and (max-width: ${
                        textSize * 12.5
                    }px) {.locale--CA .message__headline > .tag--xsmall > span { white-space: normal }}`
                ],
                logo: Logo.PP_MONOGRAM.COLOR
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
                        br: ['for', 'pour'],
                        replace: [
                            ['00.', '00'],
                            ['00 $.', '00 $']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [
                            ['later.', 'later'],
                            ['tard.', 'tard']
                        ]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 18), `.message__logo { width: ${textSize * 2}px }`],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [
                            ['00.', '00'],
                            ['00 $.', '00 $']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [
                            ['later.', 'later'],
                            ['tard.', 'tard']
                        ]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
