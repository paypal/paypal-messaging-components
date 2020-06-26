import Logo from '../logos';
import {
    gbPLContentMediaQuery,
    fallbackMediaQuery,
    gbPLAltContentMediaQuery,
    gbPLMessageLogoWidth
} from './mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 13), gbPLMessageLogoWidth(false, textSize * 4, textSize * 1.25)],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['purchases.', 'purchases']],
                        br: ['on']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 13), gbPLMessageLogoWidth(false, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 13),
                    gbPLContentMediaQuery(textSize * 38 + 10),
                    gbPLMessageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 13),
                    gbPLMessageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    gbPLAltContentMediaQuery(textSize * 17, textSize * 33, textSize * 23),
                    fallbackMediaQuery(textSize * 20),
                    gbPLMessageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 16)],
                logo: false
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 17 + 2)],
                logo: false
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        [
            'text.color:white && logo.type:inline',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 17 + 2)],
                logo: false
            })
        ],
        ['text.color:white && logo.type:alternative', { logo: Logo.PRIMARY.WHITE[0] }]
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['purchases.', 'purchases']]
                    }
                ],
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x1',
            {
                logo: Logo.PRIMARY.WHITE
            }
        ],
        [
            'ratio:20x1',
            {
                headline: [
                    'default',
                    {
                        tag: 'medium',
                        replace: [['purchases.', 'purchases']],
                        br: ['on ']
                    }
                ],

                styles: [
                    '.message__headline { font-size: .8rem; }',
                    '.message__headline > span:not(.multi) { display: none; }',
                    `@media (min-aspect-ratio: 200/11) and (min-width: 600px) {
                        .message__headline {
                            font-size: 1.75vw;
                        }
                    }`,
                    '@media (min-aspect-ratio: 80/11) and (min-width: 600px) { .message__headline > span:not(.multi) { display: inline; } }'
                ]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: [
                    'default',
                    {
                        tag: 'medium',
                        replace: [['purchases.', 'purchases']],
                        br: ['on ']
                    }
                ],

                styles: [
                    '.message__headline > span:not(.multi) { display: none; }',
                    '.message__disclaimer { display: block; font-size: .6rem; }',
                    `@media (min-width: 480px) {
                        .message__disclaimer { display: inline; font-size: .9rem; }
                    }`,
                    '.message__logo-container { flex-basis: 33%; }',
                    `@media (min-aspect-ratio: 80/11) and (min-width: 500px) {
                        .message__headline > span:not(.multi) { display: inline; }
                    }`
                ]
            }
        ],

        [
            'color:gray',
            {
                logo: Logo.PRIMARY.COLOR
            }
        ],
        [
            'color:white',
            {
                logo: Logo.PRIMARY.COLOR
            }
        ],
        [
            'color:black',
            {
                logo: Logo.PRIMARY.WHITE
            }
        ]
    ]
};
