import Logo from '../logos';
import {
    gbPLContentMediaQuery,
    fallbackMediaQuery,
    gbPLAltContentMediaQuery,
    whiteTextMediaQuery
} from './mediaQueries';
import { messageDisclaimerMediaQuery } from '../../US/mutations/mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 25 + 10),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; margin-right: 5px; }`
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']]
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
                    fallbackMediaQuery(textSize * 25 + 10),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; margin-right: 5px; }`
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['purchases.', 'purchases']]
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
                    fallbackMediaQuery(textSize * 26),
                    gbPLContentMediaQuery(textSize * 38 + 10),
                    `.message__logo-container { width: ${textSize * 6}px }`,
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 26),
                    `.message__logo-container { width: ${textSize * 6}px }`,
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    messageDisclaimerMediaQuery(textSize * 34 + 10),
                    fallbackMediaQuery(textSize * 29),
                    gbPLAltContentMediaQuery(textSize * 17 + 7, textSize * 29),
                    `.message__logo-container { width: ${textSize * 2}px }`,
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ],
                logo: Logo.PRIMARY.COLOR[0],
                headline: [
                    {
                        tag: 'medium',
                        replace: [['purchases.', 'purchases']]
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 29 + 10)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['purchases.', 'purchases']]
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 29 + 14)],
                logo: false,
                headline: [{ tag: 'medium', replace: [['purchases.', 'purchases']] }, { tag: 'xsmall' }],
                disclaimer: ['default']
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        [
            'text.color:white && logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 29 + 15),
                    whiteTextMediaQuery(textSize * 29 + 15),
                    '.locale--GB .message__headline .pp-text-logo::before { color: white; }',
                    '.locale--GB .message__headline .pp-text-logo::after { color: white; }',
                    '.locale--GB .message__headline > span:last-child > span:last-child { color: white; }',
                    '.locale--GB .message__headline > span:last-child > span:last-child::after { color: white; }'
                ],
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
                    '@media (min-aspect-ratio: 80/11) and (min-width: 500px) { .message__headline > span:not(.multi) { display: inline; } }'
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
