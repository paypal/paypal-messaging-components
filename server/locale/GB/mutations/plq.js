import Logo from '../logos';
import {
    gbPLContentMediaQuery,
    fallbackMediaQuery,
    plAltContentMediaQuery,
    messageLogoWidth,
    logo20x1
} from './mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 25 + 20),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']],
                        br: ['of']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 14 + 4),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 14 + 4),
                    gbPLContentMediaQuery(textSize * 38 + 10),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 14 + 4),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    plAltContentMediaQuery(textSize * 17, textSize * 34, textSize * 24),
                    fallbackMediaQuery(textSize * 21),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 17)],
                logo: false
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 17 + 4)],
                logo: false
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        [
            'text.color:white && logo.type:inline',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 17 + 4)],
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
                '.message__headline .tag--medium .weak { display: none; }',
                '.message__headline .tag--medium > span:first-child:after { content: "."; }'
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
                        br: ['payments']
                    }
                ],
                styles: [
                    '.message__headline .tag--medium > span:first-child > span:last-child:after { content: "."; }',
                    '.message__headline .tag--medium .weak { display: none; }',
                    '@media (min-aspect-ratio: 80/11) { .message__disclaimer { margin-left: 0;} }'
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
