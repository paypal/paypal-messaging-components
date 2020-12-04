import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery, zeroAprMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

const defaultTextStyles = [
    '.message__headline > span:first-of-type { color: #0070ba; text-decoration: underline; font-weight: 500; }',
    '.message__disclaimer > span:not(.multi) { color: #2c2e2f; font-weight: normal; text-decoration: none; }'
];

const whiteStyles = [
    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 500; }',
    '.message__disclaimer > span:not(.multi) { color: white; font-weight: normal; text-decoration: none; }'
];

export default {
    'layout:text': [
        [
            'default',
            {
                styles: defaultTextStyles,
                logo: Logo.SINGLE_LINE.COLOR,
                headline: {
                    tag: 'small',
                    br: ['APR']
                },
                disclaimer: 'xsmall.2'
            }
        ],
        [
            'logo.type:primary',
            {
                headline: {
                    tag: 'small',
                    br: ['APR.'],
                    replace: [['APR', 'APR.']]
                }
            }
        ],
        [
            'logo.type:primary && logo.position:left',
            ({ textSize }) => ({
                messageWidth: textSize * 16,
                logo: [Logo.SINGLE_LINE_NO_PAYPAL.COLOR, Logo.SINGLE_LINE.COLOR],
                styles: [
                    ...defaultTextStyles,
                    zeroAprMediaQuery(textSize * 16),
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        width: { smallLogo: textSize * 5, largeLogo: textSize * 9 },
                        whiteSpaceBP: textSize * 27
                    }),
                    `
                    @media (max-width: ${textSize * 16 - 1}px) {
                        .tag--small > span:first-child:after { content: '.' }
                    }
                    `
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    zeroAprMediaQuery(textSize * 16),
                    `
                    @media (max-width: ${textSize * 16 - 1}px) {
                        .tag--small > span:first-child:after { content: '.' }
                    }
                    `,
                    `.message__logo-container { width: ${textSize * 9}px }`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                messageWidth: [textSize * 10, 1000],
                styles: [
                    ...defaultTextStyles,
                    `
                    @media (max-width: ${textSize * 16 - 1}px) {
                        .tag--small > span:first-child:after { content: '.' }
                    }
                    `,
                    `
                    .message__logo-container { width: ${textSize * 9}px }
                    .message__content { display: inline-block; }
                    `,
                    zeroAprMediaQuery(textSize * 16),
                    altContentMediaQuery(textSize * 35.8)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                styles: [
                    ...defaultTextStyles,
                    zeroAprMediaQuery(textSize * 16),
                    `.message__logo { width: ${textSize * 7}px }`
                ]
            })
        ],
        ['logo.type:none', { logo: false }],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    zeroAprMediaQuery(textSize * 16),
                    `
                    @media (max-width: ${textSize * 16 - 1}px) {
                        .tag--small > span:first-child:after { content: '.' }
                    }
                    `,
                    `.message__logo-container { width: ${textSize * 5}px }`
                ],
                messageWidth: [textSize * 15, 1000],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR,
                headline: {
                    replace: [['APR', 'APR.']],
                    br: ['APR.']
                }
            })
        ],
        [
            'logo.type:alternative && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    zeroAprMediaQuery(textSize * 16),
                    altContentMediaQuery(textSize * 35.8),
                    `
                    @media (max-width: ${textSize * 16 - 1}px) {
                        .tag--small > span:first-child:after { content: '.' }
                    }
                    `,
                    `.message__logo-container { width: ${textSize * 5}px }`
                ]
            })
        ],
        [
            'text.color:white',
            ({ textSize }) => ({
                styles: [
                    ...whiteStyles,
                    zeroAprMediaQuery(textSize * 16),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ]
            })
        ],
        [
            'logo.type:primary && text.color:white',
            ({ textSize }) => ({
                styles: [
                    ...whiteStyles,
                    zeroAprMediaQuery(textSize * 16),
                    `
                    @media (max-width: ${textSize * 16 - 1}px) {
                        .tag--small > span:first-child:after { content: '.' }
                    }
                    `,
                    `.message__logo-container { width: ${textSize * 9}px }`
                ]
            })
        ],
        [
            'logo.type:alternative && text.color:white',
            ({ textSize }) => ({
                styles: [
                    ...whiteStyles,
                    zeroAprMediaQuery(textSize * 16),
                    `
                    @media (max-width: ${textSize * 16 - 1}px) {
                        .tag--small > span:first-child:after { content: '.' }
                    }
                    `,
                    `.message__logo-container { width: ${textSize * 5}px }`
                ]
            })
        ],
        [
            'logo.type:inline && text.color:white',
            ({ textSize }) => ({
                styles: [
                    ...whiteStyles,
                    zeroAprMediaQuery(textSize * 16),
                    `.message__logo { width: ${textSize * 7}px }`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:left && text.color:white',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        width: { smallLogo: textSize * 5, largeLogo: textSize * 9 },
                        whiteSpaceBP: textSize * 27
                    }),
                    zeroAprMediaQuery(textSize * 16),
                    ...whiteStyles,
                    `
                    @media (max-width: ${textSize * 16 - 1}px) {
                        .tag--small > span:first-child:after { content: '.' }
                    }
                    `
                ]
            })
        ],
        [
            'logo.type:none && text.color:monochrome',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, zeroAprMediaQuery(textSize * 16), `.tag--small { color: black; }`]
            })
        ],
        [
            'logo.type:none && text.color:grayscale',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, zeroAprMediaQuery(textSize * 16), `.tag--small { color: #2c2e2f; }`]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.STACKED.WHITE,
                headline: { tag: 'small', br: ['months', 'APR'] },
                disclaimer: ['xsmall.2', 'xsmall']
            }
        ],

        [
            'ratio:1x4',
            {
                headline: { br: ['over', 'at', 'APR'] }
            }
        ],

        [
            'ratio:20x1',
            {
                styles: [
                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.7rem; } }'
                ]
            }
        ],
        ...flexLogoMutations
    ]
};
