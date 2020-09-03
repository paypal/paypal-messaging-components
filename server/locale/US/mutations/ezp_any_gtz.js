import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

const defaultTextStyles = [
    '.message__headline > span:not(:nth-of-type(2)) { text-decoration: underline; color: #0076ff; font-weight: 600; }',
    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
];

export default {
    'layout:text': [
        [
            'default',
            {
                styles: defaultTextStyles,
                logo: Logo.SINGLE_LINE.COLOR,
                headline: {
                    tag: 'xsmall',
                    replace: [['months', 'months.']],
                    br: ['months.']
                },
                disclaimer: 'xsmall.2'
            }
        ],
        [
            'logo.type:primary && logo.position:left',
            ({ textSize }) => ({
                messageWidth: textSize * 11,
                logo: [Logo.SINGLE_LINE_NO_PAYPAL.COLOR, Logo.SINGLE_LINE.COLOR],
                styles: [
                    ...defaultTextStyles,
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        logoAltWidth: textSize * 5,
                        logoWidth: textSize * 9,
                        whiteSpaceBP: textSize * 27
                    }),
                    '.message__messaging span.br { white-space: nowrap; }'
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    `.message__logo-container { width: ${textSize * 9}px }`,

                    `
                    .message__logo--svg:nth-child(2) {
                        display: none;
                    }
                    @media (min-width: ${textSize * 21}px) {
                        .message__logo--svg:nth-child(1) {
                            display: none;
                        }
                        .message__logo--svg:nth-child(2) {
                            display: block;
                        }
                    }
                    `
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
                    .message__logo-container { width: ${textSize * 9}px }
                    .message__content { display: inline-block; }
                    `,
                    altContentMediaQuery(textSize * 30.6)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.SINGLE_LINE_NO_PP.COLOR
            })
        ],
        ['logo.type:none', { logo: false }],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    altContentMediaQuery(textSize * 30.6),
                    `.message__logo-container { width: ${textSize * 5}px }`
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR,
                headline: {
                    replace: [['months', 'months.']],
                    br: ['months.']
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
            {
                styles: [
                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                ]
            }
        ],
        [
            'logo.type:primary && logo.position:left && text.color:white',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        logoAltWidth: textSize * 5,
                        logoWidth: textSize * 9,
                        whiteSpaceBP: textSize * 27
                    }),
                    '.message__messaging span.br { white-space: nowrap; }',
                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                    '.message__disclaimer > span { color: white; text-decoration: none; }'
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
                headline: { tag: 'xsmall', br: ['months'] },
                disclaimer: ['xsmall.2', 'xsmall']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['over', 'months'] }
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
                disclaimer: 'legacy-medium'
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
                disclaimer: 'legacy-medium.2',
                styles: ['.message__disclaimer { font-size: 9px }', '.message__messaging { padding-top: 5px }']
            }
        ],
        [
            'size:250x250',
            {
                styles: ['.message__disclaimer { font-size: 10px }', '.message__headline { margin-bottom: 20px }'],
                disclaimer: 'legacy-medium.2'
            }
        ],
        [
            'size:300x50',
            { styles: ['.message__headline { font-size: 13px }', '.message__disclaimer { font-size: 11px }'] }
        ],
        [
            'size:340x60',
            {
                styles: ['.message__headline { font-size: 13px }', '.message__messaging { padding: 7px 0 }'],
                disclaimer: 'legacy-medium.2'
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
