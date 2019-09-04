import Logo from '../logos';

const textDisclaimerStyles = [
    '.message__disclaimer > span { text-decoration: none; color: #2c2e2f }',
    '.message__disclaimer > .multi.tag--default:first-of-type { text-decoration: underline; color: #0076ff }',
    '.message__disclaimer > .multi.tag--extra { display: block; white-space: normal; margin-top: .5rem }'
];

export default {
    'layout:text': [
        [
            'default',
            {
                styles: [...textDisclaimerStyles],
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'default'
                },
                disclaimer: ['default', 'extra'],
                messageWidth: [265, 1000]
            }
        ],
        [
            'logo.type:inline',
            {
                logo: Logo.ALT_NO_PP.COLOR,
                messageWidth: [320, 1000]
            }
        ],
        [
            'logo.type:none',
            {
                logo: false,
                messageWidth: [315, 1000]
            }
        ],
        [
            'logo.type:alternative',
            {
                styles: [
                    '.message__messaging, .message__headline span:only-child { white-space: normal }',
                    ...textDisclaimerStyles
                ],
                logo: Logo.ALTERNATIVE.COLOR
            }
        ],
        [
            'text.color:white',
            {
                styles: [
                    ...textDisclaimerStyles,
                    '.message__disclaimer > .multi.tag--default:first-of-type { text-decoration: underline; color: white }'
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
                logo: Logo.PRIMARY.WHITE,
                headline: 'large',
                disclaimer: ['extra', 'xsmall']
            }
        ],
        [
            'ratio:20x1',
            {
                headline: ['xsmall', 'large'],
                styles: [
                    `
                        @media (min-width: 600px) {
                            .message__messaging { display: block }
                            .message__disclaimer { padding-right: 0; font-size: 1.5vw; }
                            .message__headline { margin-bottom: .5vw }
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
                headline: ['xsmall', 'large'],
                styles: [
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
                headline: ['small', 'large']
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ]
};
