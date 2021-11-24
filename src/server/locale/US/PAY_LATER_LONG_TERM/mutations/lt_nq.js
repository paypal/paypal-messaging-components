import Logo from '../../../../message/logos';
import { textWrap, messageLogoWidth, altNoWrap, setLogoTop, logo20x1 } from '../../../../message/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';
import hideMinOrMax from './hideMinOrMax';

const flex = [
    [
        'default',
        ({ amount, variables: { minAmount: min, maxAmount: max } }) => ({
            logo: Logo.PP_PAYPAL.WHITE,
            headline: [
                {
                    tag: 'default'
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
                    tag: 'default'
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
                    `@media screen and (max-width: ${textSize * 18.5}px) { 
                        .message__headline > .tag--default > span.br:first-child { white-space: normal; } 
                    }`,
                    textWrap(textSize * 32, textSize, 'US'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'default',
                        br: ['purchases']
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [
                    hideMinOrMax({ amount, min, max }),
                    `@media screen and (max-width: ${textSize * 18.5}px) { 
                        .message__headline > .tag--default > span.br:first-child { white-space: normal; } 
                    }`,
                    setLogoTop(textSize * 32),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [
                    hideMinOrMax({ amount, min, max }),
                    `@media screen and (max-width: ${textSize * 18.5}px) { 
                        .message__headline > .tag--default > span.br:first-child { white-space: normal; } 
                    }`,
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [
                    hideMinOrMax({ amount, min, max }),
                    `@media screen and (max-width: ${textSize * 10.6}px) { 
                        .message__headline > .tag--default > span.br:first-child { white-space: normal; } 
                    }`,
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [hideMinOrMax({ amount, min, max })],
                logo: false,
                headline: [
                    {
                        tag: 'default',
                        br: ['purchases'],
                        replace: [['less.', 'less']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize, amount, variables: { minAmount: min, maxAmount: max } }) => ({
                styles: [hideMinOrMax({ amount, min, max }), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'default',
                        br: ['purchases'],
                        replace: [['less.', 'less']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
