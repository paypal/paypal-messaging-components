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
    addPeriod,
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
                addPeriod(),
                `@media (min-aspect-ratio: 60 / 11) and (max-width: 374px) {
                    .message__headline {
                        font-size: 4vw;
                    }
                }`,
                `@media (min-aspect-ratio: 60/11) and (max-width: 323px) {
                    .message__headline span.tag--xsmall {
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
                addPeriod(),
                `@media (min-aspect-ratio: 60 / 11) and (max-width: 374px) {
                .message__headline {
                    font-size: 4vw;
                }
            }`,
                `@media (min-aspect-ratio: 60/11) and (max-width: 323px) {
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
                addPeriod(),
                `.message__headline {
                font-size: 7vw;
            }`,
                `.message__headline > .tag--medium > span > span:last-child::after {
            content: '.'
        }`,
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
                addPeriod(),
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
                    textWrap(textSize * 58.5, textSize, 'DE'),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    addPeriod(),
                    xSmallFallback(textSize * 16.5),
                    xSmallNoWrap(textSize * 16.5),
                    primaryWrap(textSize * 15.4)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Einkäufen']
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
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.2, textSize * 21.4, textSize * 15),
                    xSmallFallback(textSize * 19.08),
                    setLogoTop(textSize * 59.2),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod()
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 25.2, textSize * 29, textSize * 20.5, textSize * 15),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    xSmallFallback(textSize * 19)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 25.5, textSize * 29, textSize * 20.5, textSize * 15),
                    `@media screen and (max-width: ${
                        textSize * 14
                    }px) { .message__headline > .tag--xsmall > span:first-child { white-space: normal;}}`,
                    textWrap(textSize * 55, textSize, 'DE'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    xSmallFallback(textSize * 14)
                ],
                headline: [{ tag: 'medium', br: ['Einkäufen'] }, { tag: 'xsmall' }],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 15.6),
                    logoNoneAddRatenzahlungAfterPayPal(textSize * 15.6),
                    crossBorderLogoNoneWrap(textSize * 14),
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`
                ],
                logo: false,
                headline: [
                    { tag: 'medium' },
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
                    `.message__logo { width: ${textSize * 4}px }`,
                    logoInlineAddRatenzahlungAfterPayPal(textSize * 18),
                    xSmallFallback(textSize * 18),
                    `@media screen and (min-width: ${textSize * 18.08}px) {
                        .message__logo-container::after {
                            content: '.';
                        }
                    }`,
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`,
                    `.message__messaging span.br { white-space: normal;}`
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
