import Logo from '../../../../message/logos';
import { textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

const flex = [
    [
        'default',
        {
            logo: Logo.PP_PAYPAL.WHITE,
            headline: [
                {
                    tag: 'xsmall'
                }
            ],
            disclaimer: ['default']
        }
    ],
    [
        'ratio:20x1',
        {
            styles: [
                `
                @media (min-aspect-ratio: 200/11) and (min-width: 523px) {
                    .message__logo-container {
                        max-width: 12%;
                    }
                }

                @media (min-aspect-ratio: 200/11) and (min-width: 300px) {
                    .message__logo:nth-of-type(1) {
                        width: 18%;
                    }
                    .message__logo:nth-of-type(2) {
                        width: 60%;
                    }
                }

                @media (min-aspect-ratio: 60/11) and (min-width: 324px) {
                    .message__headline .tag--xsmall .br:first-child {
                        display: inline;
                    }
                }
                `
            ]
        }
    ],
    [
        'ratio:8x1',
        {
            headline: [
                {
                    tag: 'xsmall'
                }
            ],
            styles: [
                `@media (min-aspect-ratio: 60/11) and (min-width: 324px) {
                    .message__headline .tag--xsmall .br:first-child {
                        display: inline;
                    }
                }
                `
            ]
        }
    ],
    [
        'ratio:1x4',
        {
            headline: [
                {
                    tag: 'xsmall'
                }
            ],
            styles: [
                `.message__headline .tag--xsmall {
    display: inline;
}`
            ]
        }
    ],
    ['color:white-no-border', { logo: Logo.PP_PAYPAL.COLOR }],
    ...flexLogoMutations
];

export default {
    'layout:flex': flex,
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 38, textSize, 'US'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [{ tag: 'xsmall' }],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [setLogoTop(textSize * 22), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize, 'US'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [`@media screen and (max-width: ${textSize * 37.3}) {.message__content {margin-top: 0px;}}`],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall.2',
                        br: ['later.'],
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'xsmall.2',
                        br: ['later.'],
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
