import Logo from '../../../../message/logos';
import { xSmallFallback, textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import { crossBorderDisclaimerWrap, xSmallNoWrap } from './mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall'],
        breaks: ['Ratenzahlung']
    },
    {
        sizes: ['medium'],
        breaks: ['Jahreszins: ab']
    }
].reduce((acc, item) => {
    const { sizes, breaks } = item;
    sizes.forEach(size => {
        acc.push({
            tag: size,
            br: breaks
        });
    });
    return acc;
}, []);

const flex = [
    [
        'default',
        {
            logo: Logo.PP_PAYPAL.WHITE,
            headline: [
                {
                    tag: 'xsmall'
                },
                {
                    tag: 'medium'
                }
            ],
            disclaimer: ['extra', 'default']
        }
    ],
    [
        'ratio:20x1',
        {
            styles: [
                `@media (min-aspect-ratio: 200/11) {
                    .message__headline {
                        font-size: 2vw;
                    }
                }`,
                `@media (min-aspect-ratio: 60 / 11) and (max-width: 374px) {
                    .message__headline {
                        font-size: 4vw;
                    }
                }`,
                `@media (min-aspect-ratio: 200 / 11) and (max-width: 650px) {
                    .message__disclaimer > .tag--extra > span {
                        margin-right: 2px;
                    }
                    .message__promo-container {
                        padding-right: 0px;
                    }
                }`
            ],
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:8x1',
        {
            styles: [
                `@media (min-aspect-ratio: 60 / 11) and (max-width: 374px) {
                    .message__headline {
                        font-size: 4vw;
                    }
                }`,
                `@media (min-aspect-ratio: 60/11) and (max-width: 323px) {
                .message__headline {
                    font-size: 4vw;
                }
            }`
            ],
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:1x1',
        {
            styles: [
                `@media (max-aspect-ratio: 11/10) and (max-width: 220px) {
            .message__headline {
                font-size: 8vw;
            }
            .message__disclaimer {
                font-size: 0.65rem;
            }
        }`
            ],
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:1x4',
        {
            styles: [
                `.message__disclaimer {
                font-size: 0.8rem;
            }`
            ],
            headline: [...headlineBreaks]
        }
    ],
    ...flexLogoMutations
];

export default {
    'layout:flex': flex,
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 42.6, textSize, 'DE'),
                    // Wrapping of mehr erfahren separate from PayPal Konto.
                    `@media screen and (max-width: ${
                        textSize * 19.5
                    }px) { .message__messaging > .message__disclaimer > .tag--default { content: ''; display: block; }}`,
                    `@media screen and (max-width: ${
                        textSize * 19.45
                    }px) { .locale--DE .message__messaging { display: inline-block; } }`,
                    xSmallFallback(textSize * 13.8),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    xSmallNoWrap(textSize * 13.8)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['ab']
                    },
                    { tag: 'xsmall', br: ['verfügbar.'] }
                ],
                disclaimer: ['extra', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 32.2, textSize * 39, textSize * 20.5, textSize * 19.45),
                    xSmallFallback(textSize * 17.08),
                    setLogoTop(textSize * 45.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    xSmallNoWrap(textSize * 17.08)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    // Prevent wrapping of amount
                    `@media screen and (max-width: ${
                        textSize * 17.25
                    }px) { .locale--DE .message__headline > .tag--medium > span > span { white-space: nowrap; }}`,
                    crossBorderDisclaimerWrap(textSize * 32.2, textSize * 39, textSize * 20.5, textSize * 19.45),
                    xSmallFallback(textSize * 13.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    xSmallNoWrap(textSize * 13.5)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 15}px) { .message__content { white-space: nowrap; }}`,
                    crossBorderDisclaimerWrap(textSize * 33.2, textSize * 40.75, textSize * 19.6, textSize * 15),
                    textWrap(textSize * 41, textSize, 'DE'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    xSmallFallback(textSize * 15)
                ],
                headline: [{ tag: 'medium', br: ['ab'] }, { tag: 'xsmall' }],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    xSmallNoWrap(textSize * 16),
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['pro'],
                        replace: [['Monat.', 'Monat']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['Ratenzahlung'],
                        replace: [['verfügbar.', 'verfügbar']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    xSmallNoWrap(textSize * 13.8),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after {
                        content: '.';
                    }`,
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['pro'],
                        replace: [['Monat.', 'Monat']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['Ratenzahlung'],
                        replace: [['verfügbar.', 'verfügbar']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
