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
import hideMinOrMax from './hideMinOrMax';

const flex = [
    [
        'default',
        ({ amount, variables: { minAmount: min, maxAmount: max } }) => ({
            logo: Logo.PP_PAYPAL.WHITE,
            headline: [
                {
                    tag: 'medium'
                },
                {
                    tag: 'xsmall'
                }
            ],
            disclaimer: ['default'],
            styles: [hideMinOrMax({ amount, min, max })]
        })
    ],
    [
        'ratio:20x1',
        ({ amount, variables: { minAmount: min, maxAmount: max } }) => ({
            styles: [hideMinOrMax({ amount, min, max }), logo20x1()]
        })
    ],
    [
        'ratio:8x1',
        ({ amount, variables: { minAmount: min, maxAmount: max } }) => ({
            headline: [
                {
                    tag: 'medium'
                }
            ],
            styles: [
                hideMinOrMax({ amount, min, max }),
                '@media (min-aspect-ratio: 80/11) { .message__disclaimer { margin-left: 0;} }'
            ]
        })
    ],
    ['color:white-no-border', { logo: Logo.PP_PAYPAL.COLOR }],
    ...flexLogoMutations
];

export default {
    'layout:flex': flex,
    'layout:text': [
        [
            'default',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [
                    hideMinOrMax({ amount, min, max }),
                    `@media screen and (max-width: ${textSize * 28.5}px) { 
                        .message__headline > .tag--medium > span.br:first-child { white-space: normal; } 
                    }`,
                    textWrap(textSize * 45, textSize, 'US'),
                    xSmallFallback(textSize * 14),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['purchases']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [
                    hideMinOrMax({ amount, min, max }),
                    xSmallFallback(textSize * 13),
                    `@media screen and (max-width: ${textSize * 28.5}px) { 
                        .message__headline > .tag--medium > span.br:first-child { white-space: normal; } 
                    }`,
                    setLogoTop(textSize * 38),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [
                    hideMinOrMax({ amount, min, max }),
                    `@media screen and (max-width: ${textSize * 28.5}px) { 
                        .message__headline > .tag--medium > span.br:first-child { white-space: normal; } 
                    }`,
                    xSmallFallback(textSize * 13),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [
                    hideMinOrMax({ amount, min, max }),
                    `@media screen and (max-width: ${textSize * 28.5}px) { 
                        .message__headline > .tag--medium > span.br:first-child { white-space: normal; } 
                    }`,
                    xSmallFallback(textSize * 12.5),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [xSmallFallback(textSize * 18), hideMinOrMax({ amount, min, max })],
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
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [
                    xSmallFallback(textSize * 18),
                    hideMinOrMax({ amount, min, max }),
                    `.message__logo { width: ${textSize * 4}px }`
                ],
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
