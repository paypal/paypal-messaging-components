import Logo from '../logos';
import { messageLogoWidth } from '../../../GB/mutations/mediaQueries';
import { xsmallTagMediaQuery, setLogoTop, textWrap, logo6x1 } from './mediaQueries';
import { flexLogoMutations, textLogoMutations } from './common';

const flex = [
    [
        'default',
        {
            logo: Logo.PRIMARY.WHITE,
            headline: [
                {
                    tag: 'default'
                }
            ],
            disclaimer: ['default']
        }
    ],
    [
        'ratio:20x1',
        {
            styles: [
                logo6x1(),
                `
                .message__logo:nth-of-type(2) {
                    display: inline-block;
                }

                 @media (min-aspect-ratio: 200/11) and (min-width: 523px) {
                    .message__logo-container {
                        max-width: 12%;
                    }
                }

                @media (min-aspect-ratio: 200/11) and (min-width: 300px) {
                    .message__logo:nth-of-type(1) {
                        width: 18%;
                    }
                    .message__logo:nth-of-type(2) {
                        width: 60%;
                    }
                }
                `
            ]
        }
    ],
    [
        'ratio:8x1',
        {
            styles: [logo6x1()]
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
                    textWrap(textSize * 38, textSize),
                    xsmallTagMediaQuery(textSize * 21),
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
                    xsmallTagMediaQuery(textSize * 16),
                    setLogoTop(textSize * 21),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xsmallTagMediaQuery(textSize * 16),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 38, textSize),
                    xsmallTagMediaQuery(textSize * 16),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xsmallTagMediaQuery(textSize * 16)],
                logo: false,
                headline: [
                    {
                        tag: 'medium.2',
                        br: ['on'],
                        replace: [
                            ['purchases.', 'purchases'],
                            ['later.', 'later']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        br: ['later.'],
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xsmallTagMediaQuery(textSize * 18), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.INLINE.COLOR,
                headline: [
                    {
                        tag: 'medium.2',
                        br: ['on'],
                        replace: [
                            ['purchases.', 'purchases'],
                            ['later.', 'later']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        br: ['later.'],
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
