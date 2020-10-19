import Logo from '../logos';
import {
    textWrap,
    messageLogoWidth,
    setLogoTop,
    xSmallFallback,
    smallFallback,
    logo20x1
} from '../../../../message/mediaQueries';
import { flexLogoMutations, textLogoMutations } from './common';

const flex = [
    [
        'default',
        {
            logo: Logo.PRIMARY.WHITE,
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
    ...flexLogoMutations
];

export default {
    'layout:flex': flex,
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 37, textSize, '.locale--US'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on']
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
                    setLogoTop(textSize * 38),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 14.75 + 10),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 37, textSize, '.locale--US'),
                    xSmallFallback(textSize * 15.4),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [smallFallback(textSize * 18)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
                    },
                    {
                        tag: 'small',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [smallFallback(textSize * 18), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.INLINE.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
                    },
                    {
                        tag: 'small',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
