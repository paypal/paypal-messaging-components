import Logo from '../../../../message/logos';
import {
    xSmallFallback,
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    primaryWrap
} from '../../../../message/mediaQueries';
import {
    logoNoneAddRatenzahlungAfterPayPal,
    logoInlineAddRatenzahlungAfterPayPal,
    xSmallNoWrap,
    crossBorderDisclaimerWrap,
    crossBorderLogoNoneWrap
} from './mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall'],
        breaks: ['mit']
    },
    {
        sizes: ['medium'],
        breaks: ['monatlichen']
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
                        font-size: 1.7vw;
                    }
                }`,
                `@media (min-aspect-ratio: 60 / 11) and (max-width: 374px) {
                    .message__headline {
                        font-size: 3.5vw;
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
                    .locale--DE .message__logo:nth-of-type(1) {
                        width: 40%;
                    }
                    .locale--DE .message__logo:nth-of-type(2) {
                        display: none;
                    }
                    .message__headline {
                        font-size: 3.5vw;
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
                    textWrap(textSize * 43.8, textSize, 'DE'),
                    crossBorderDisclaimerWrap(textSize * 20.5, textSize * 20, textSize * 18.6, textSize * 22.5),
                    xSmallFallback(textSize * 12.4),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    xSmallNoWrap(textSize * 12.5),
                    primaryWrap(textSize * 12.4)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['monatlichen']
                    },
                    { tag: 'xsmall', br: ['mit'] }
                ],
                disclaimer: ['extra', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 20.5, textSize * 20, textSize * 18.6, textSize * 22.5),
                    xSmallFallback(textSize * 12),
                    setLogoTop(textSize * 44),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 31, textSize * 38, textSize * 18.6, textSize * 22.5),
                    xSmallFallback(textSize * 12.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 15}px) { .message__content { white-space: nowrap; }}`,
                    crossBorderDisclaimerWrap(textSize * 33.2, textSize * 39.42, textSize * 20.2, textSize * 11.6),
                    textWrap(textSize * 39.5, textSize, 'DE'),
                    xSmallFallback(textSize * 12.25),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                headline: [
                    { tag: 'medium', br: ['monatlichen'] },
                    { tag: 'xsmall', br: ['mit'] }
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    logoNoneAddRatenzahlungAfterPayPal(textSize * 16),
                    crossBorderLogoNoneWrap(textSize * 16),
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Einkäufen'],
                        replace: [['Raten.', 'Raten']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['monatlichen'],
                        replace: [['mit Ratenzahlung.', '']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`,
                    xSmallFallback(textSize * 16.5),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after {
                        content: '.';
                    }`,
                    logoInlineAddRatenzahlungAfterPayPal(textSize * 16.5)
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['monatlichen'],
                        replace: [['Raten.', 'Raten']]
                    },
                    {
                        tag: 'xsmall',
                        br: ['monatlichen'],
                        replace: [['mit Ratenzahlung.', '']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
