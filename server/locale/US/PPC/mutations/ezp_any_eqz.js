import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

const defaultTextStyles = [
    '.message__headline > span:first-of-type { color: #0070ba; text-decoration: underline; font-weight: 500; }',
    '.message__disclaimer > span:not(.multi) { color: #2c2e2f; text-decoration: none; }'
];

const whiteStyles = [
    '.message__headline > span:nth-last-child(2)::after { content: ""; }',
    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 500; }',
    '.message__disclaimer > span:not(.multi) { color: white; text-decoration: none; }'
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
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        width: { smallLogo: textSize * 5, largeLogo: textSize * 9 },
                        whiteSpaceBP: textSize * 27
                    })
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo-container { width: ${textSize * 9}px }`]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                messageWidth: [textSize * 10, 1000],
                styles: [
                    ...defaultTextStyles,
                    `
                    .message__logo-container { width: ${textSize * 9}px }
                    .message__content { display: inline-block; }
                    `,
                    altContentMediaQuery(textSize * 35.8)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                styles: [...defaultTextStyles, `.message__logo { width: ${textSize * 7}px }`]
            })
        ],
        ['logo.type:none', { logo: false }],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    altContentMediaQuery(textSize * 35.8),
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
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo-container { width: ${textSize * 5}px }`]
            })
        ],
        [
            'text.color:white',
            ({ textSize }) => ({
                styles: [...whiteStyles, `.message__logo-container { width: ${textSize * 9}px }`]
            })
        ],
        [
            'logo.type:alternative && text.color:white',
            ({ textSize }) => ({
                styles: [...whiteStyles, `.message__logo-container { width: ${textSize * 5}px }`]
            })
        ],
        [
            'logo.type:inline && text.color:white',
            ({ textSize }) => ({
                styles: [...whiteStyles, `.message__logo { width: ${textSize * 7}px }`]
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
                    ...whiteStyles
                ]
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
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.STACKED.WHITE,
                headline: 'legacy-small',
                disclaimer: 'legacy-large'
            }
        ],
        ['size:1000x36', { logo: Logo.STACKED.COLOR }],
        [
            'size:120x90',
            {
                logo: false,
                styles: ['.message__disclaimer { line-height: 12px }', '.message__headline { font-size: 12px }']
            }
        ],
        [
            'size:234x60',
            {
                disclaimer: 'legacy-medium',
                styles: ['.message__disclaimer { font-size: 9px }', '.message__messaging { padding-top: 5px }']
            }
        ],
        [
            'size:250x250',
            {
                disclaimer: 'legacy-medium',
                styles: ['.message__disclaimer { font-size: 10px }', '.message__headline { margin-bottom: 20px }']
            }
        ],
        [
            'size:300x50',
            { styles: ['.message__headline { font-size: 13px }', '.message__disclaimer { font-size: 11px }'] }
        ],
        [
            'size:340x60',
            {
                disclaimer: 'legacy-medium',
                styles: ['.message__headline { font-size: 13px }', '.message__messaging { padding: 7px 0 }']
            }
        ],
        [
            'size:468x60',
            {
                styles: [
                    '.message__headline { font-size: 14px; margin-bottom: 5px }',
                    '.message__disclaimer { font-size: 10px }',
                    '.message__messaging { padding: 14px 0 }'
                ]
            }
        ],
        [
            'size:728x90',
            {
                styles: [
                    '.message__headline { font-size: 20px }',
                    '.message__disclaimer { font-size: 11px }',
                    '.message__messaging { padding: 23px 0 }'
                ]
            }
        ],
        [
            'size:540x200',
            {
                subHeadline: 'legacy-medium',
                disclaimer: 'legacy-medium.2',
                styles: ['.message__headline { padding-right: 40px; }']
            }
        ],
        [
            'size:170x100',
            {
                logo: false,
                styles: [
                    '.message__disclaimer { font-size: 9px; }',
                    '.message__headline { font-size: 15px; line-height: 1.2em; }'
                ]
            }
        ]
    ]
};
