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
                    tag: 'medium'
                },
                {
                    tag: 'xsmall'
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
                    tag: 'medium'
                },
                {
                    tag: 'xsmall'
                }
            ],
            styles: ['@media (min-aspect-ratio: 80/11) { .message__disclaimer { margin-left: 0;} }']
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
                    `@media screen and (max-width: ${textSize * 18.5}px) { 
                        .message__headline > .tag--medium > span.br:first-child { white-space: normal; } 
                    }`,
                    xSmallFallback(textSize * 16),
                    textWrap(textSize * 32, textSize, 'US'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['purchases']
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
                    xSmallFallback(textSize * 10.75),
                    setLogoTop(textSize * 32),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 13), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 11.5),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.locale--US .message__messaging span.br {white-space: normal}`,
                    `.message__headline .tag--xsmall > span {white-space: normal}`
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 14)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['purchases'],
                        replace: [
                            ['less.', 'less'],
                            ['+.', '+']
                        ]
                    },
                    {
                        tag: 'xsmall',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 18), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['purchases'],
                        replace: [
                            ['less.', 'less'],
                            ['+.', '+']
                        ]
                    },
                    {
                        tag: 'xsmall',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
