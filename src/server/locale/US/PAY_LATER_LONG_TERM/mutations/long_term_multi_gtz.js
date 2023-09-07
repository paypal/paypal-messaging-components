import Logo from '../../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    logo20x1,
    xSmallFallback
} from '../../../../message/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

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
            disclaimer: ['default'],
            styles: []
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
                    tag: 'medium'
                }
            ]
        }
    ],
    ['color:white-no-border', { logo: Logo.PP_PAYPAL.COLOR }],
    ...flexLogoMutations
];

export default {
    'layout:flex': flex,
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 19),
                    textWrap(textSize * 43, textSize, 'US'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mo. ', 'as']
                    },
                    {
                        tag: 'xsmall'
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 18.5}px) { 
                        .message__headline > .tag--medium > span.br:first-child { white-space: normal; } 
                    }`,
                    xSmallFallback(textSize * 17.5),
                    setLogoTop(textSize * 43),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 18.5}px) { 
                        .message__headline > .tag--medium > span.br:first-child { white-space: normal; } 
                    }`,
                    xSmallFallback(textSize * 17.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    xSmallFallback(textSize * 17.5),
                    altNoWrap(textSize * 10.6),
                    textWrap(textSize * 40.5, textSize, 'US'),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 18.5)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mo.', 'mo', 'as'],
                        replace: [
                            ['mo.', 'mo'],
                            ['for 6 or 12 months.', 'for 6 or 12 months']
                        ]
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
                styles: [`.message__logo { width: ${textSize * 4}px }`, xSmallFallback(textSize * 18.5)],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mo.', 'mo'],
                        replace: [
                            ['mo.', 'mo'],
                            ['for 6 or 12 months.', 'for 6 or 12 months']
                        ]
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
