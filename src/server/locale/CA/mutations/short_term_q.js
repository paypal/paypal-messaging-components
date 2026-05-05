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
            disclaimer: ['default'],
            styles: [
                '.message__headline .tag--medium > span:first-child:after { content: "."; }',
                '.message__headline .tag--medium .weak { display: none; }'
            ]
        }
    ],
    [
        'ratio:20x1',
        {
            styles: [
                logo20x1(),
                '.message__headline .tag--medium > span:first-child:after { content: "."; }',
                '.message__headline .tag--medium .weak { display: none; }'
            ]
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
                    br: ['payments', 'versements']
                }
            ],
            styles: [
                '.message__headline .tag--medium > span:first-child > span:last-child:after { content: "."; }',
                '.message__headline .tag--medium .weak { display: none; }'
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
                    textWrap(textSize * 32, textSize, 'CA'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 16),
                    `.message__headline > .tag--medium > span:not(.weak):first-child {white-space: nowrap;}`,
                    `.weak { display: none}`,
                    `.message__headline > .tag--medium > span::after {content: '.'}`
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['payments', 'versements']
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
                    `@media screen and (max-width: ${
                        textSize * 18.5
                    }px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }
                    .message__headline > .tag--medium > span:not(.weak):first-child {white-space: nowrap;}`,
                    xSmallFallback(textSize * 10.75),
                    setLogoTop(textSize * 32),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    `.weak { display: none}`,
                    `.message__headline > .tag--medium > span::after {content: '.'}`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${
                        textSize * 18.5
                    }px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }
                    .message__headline > .tag--medium > span:not(.weak):first-child {white-space: nowrap;}`,
                    xSmallFallback(textSize * 10.75),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    `.weak { display: none}`,
                    `.message__headline > .tag--medium > span::after {content: '.'}`
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize, 'CA'),
                    xSmallFallback(textSize * 11.5),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 1.35),
                    `.weak { display: none}`,
                    `.message__headline > .tag--medium > span::after {content: '.'}`
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
                        br: ['payments', 'versements'],
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
                styles: [xSmallFallback(textSize * 18), `.message__logo { width: ${textSize * 4.1}px }`],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['payments', 'versements'],
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
