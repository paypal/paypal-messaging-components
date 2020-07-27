import Logo from '../logos';
import { altLogoMediaQuery } from './mediaQueries';

const textDisclaimerStyles = [
    '.message__disclaimer > .multi.tag--extra > span { display: block; white-space: normal; margin-top: .5rem }'
];

const flexCommonStyles = [
    '@media (min-aspect-ratio: 80/11) and (min-width: 500px) { .message__headline { font-size: 2.3vw } }',
    '.message__disclaimer { display: block; }',
    '.message__disclaimer > .multi.tag--extra > span { text-decoration: none; white-space: normal }'
];

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [...textDisclaimerStyles, `.message__logo { width: ${textSize * 13}px }`],
                messageWidth: [textSize * 20, 1000],
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'default',
                    replace: [['Jahreszins', 'Jahreszins.']]
                },
                disclaimer: ['default', 'extra']
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                logo: Logo.ALT_NO_PP.COLOR,
                messageWidth: [textSize * 29, 1000]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                logo: false,
                messageWidth: [textSize * 26, 1000]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    altLogoMediaQuery(textSize * 35, textSize),
                    ...textDisclaimerStyles,
                    '.message__messaging, .message__headline span:only-child { white-space: normal }',
                    `.message__logo-container { width: ${textSize * 11}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: {
                    tag: 'default',
                    replace: [['Jahreszins', 'Jahreszins.']]
                }
            })
        ],
        [
            'text.color:white',
            {
                styles: [
                    ...textDisclaimerStyles,
                    '.message__disclaimer > .multi.tag--default:first-of-type > span { color: white }',
                    '.message__disclaimer > .multi.tag--extra > span { color: white; }'
                ]
            }
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],

    'layout:flex': [
        [
            'default',
            {
                styles: [...flexCommonStyles],
                logo: Logo.PRIMARY.WHITE,
                headline: 'large',
                disclaimer: ['extra', 'xsmall']
            }
        ],
        [
            'ratio:20x1',
            {
                headline: ['small', 'large'],
                styles: [
                    ...flexCommonStyles,
                    `
                        @media (min-width: 600px) {
                            .message__messaging { display: block }
                            .message__disclaimer { padding-right: 0; font-size: 1.5vw; text-align: left; }
                            .message__headline { margin-bottom: .5vw; font-size: 2vw; }
                        }
                    `,
                    `
                        @media (max-aspect-ratio: 61/10) and (min-width: 600px) {
                            .message__logo-container { margin-bottom: 3vw }
                            .message__headline { font-size: 2.5vw }
                        }
                    `
                ]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: ['small', 'large'],
                styles: [
                    ...flexCommonStyles,
                    `
                        @media (min-width: 500px) {
                            .message__messaging { display: block }
                            .message__disclaimer { padding-right: 0; font-size: 1.7vw }
                            .message__logo-container { margin-bottom: 1vw }
                            .message__headline { margin-bottom: 1vw }
                        }
                    `,
                    `
                        @media (max-aspect-ratio: 61/10) and (min-width: 500px) {
                            .message__logo-container { margin-bottom: 3vw }
                            .message__headline { font-size: 2.5vw }
                        }
                    `
                ]
            }
        ],
        [
            'ratio:1x1',
            {
                logo: [Logo.PRIMARY.WHITE, Logo.ALTERNATIVE.WHITE],
                headline: ['small', 'large']
            }
        ],
        ['ratio:1x4', { logo: Logo.STACKED.WHITE }],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['ratio:1x4 && color:gray', { logo: Logo.STACKED.COLOR }],
        ['ratio:1x4 && color:white', { logo: Logo.STACKED.COLOR }],
        [
            'ratio:1x1 && color:gray',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white-no-border',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ]
    ]
};
