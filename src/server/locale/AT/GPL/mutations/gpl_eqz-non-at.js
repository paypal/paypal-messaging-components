import Logo from '../../../../message/logos';
import { xSmallFallback, textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import { xSmallNoWrap, crossBorderDisclaimerWrap } from './mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall'],
        breaks: ['Ratenzahlung']
    },
    {
        sizes: ['medium'],
        breaks: ['Sie in', 'Einkäufen']
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
                `.message__headline > .tag--medium > span > span:last-child::after {
                    content: '.'
                }`,
                `@media (min-aspect-ratio: 200/11) {
                    .message__headline {
                        font-size: 1.7vw;
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
                `.message__headline > .tag--medium > span > span:last-child::after {
                    content: '.'
                }`,
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
                `.message__headline > .tag--medium > span > span:last-child::after {
                content: '.'
            }`,
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
                    textWrap(textSize * 62, textSize, 'DE'),
                    crossBorderDisclaimerWrap(textSize * 27 + 1, textSize * 33, textSize * 21.1, textSize * 15),
                    xSmallFallback(textSize * 15),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    xSmallNoWrap(textSize * 14.2),
                    `.message__headline > .tag--medium > span > span:last-child::after {content: '.'}`,
                    `@media screen and 
                    (min-width: ${textSize * 23.8}px),
                    (max-width: ${textSize * 21.8}px) {
                        .message__headline > .tag--medium > span > span.br:last-child {white-space: normal;}
                    }`
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Sie']
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
                    crossBorderDisclaimerWrap(textSize * 26.4, textSize * 28.45, textSize * 21.1, textSize * 19),
                    xSmallFallback(textSize * 19),
                    setLogoTop(textSize * 61.75),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.message__headline > .tag--medium > span > span:last-child::after {
                        content: '.'
                    }`,
                    xSmallNoWrap(textSize * 19),
                    `@media screen and 
                    (max-width: ${textSize * 18.67}px) {
                        .message__headline > .tag--medium > span > span.br:nth-child(2) {white-space: nowrap;}
                    }`
                ],
                headline: [{ tag: 'medium', br: ['Sie', 'Raten'] }, { tag: 'xsmall' }]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 27, textSize * 30.3, textSize * 21.1, textSize * 15),
                    xSmallFallback(textSize * 19.08),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.message__headline > .tag--medium > span > span:last-child::after {
                        content: '.'
                    }`,
                    xSmallNoWrap(textSize * 19.08),
                    `@media screen and 
                    (max-width: ${textSize * 18.67}px) {
                        .message__headline > .tag--medium > span > span.br:nth-child(2) {white-space: nowrap;}
                    }`
                ],
                headline: [{ tag: 'medium', br: ['Sie', 'Raten'] }, { tag: 'xsmall' }]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 27, textSize * 30.3, textSize * 21.75, textSize * 15),
                    `@media screen and (max-width: ${textSize * 15.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 57.2, textSize, 'DE'),
                    xSmallFallback(textSize * 15.5),
                    altNoWrap(textSize * 15.5),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.message__headline > .tag--medium > span > span:last-child::after {content: '.'}`,
                    `.locale--DE .message__messaging .tag--medium span.br:last-child {white-space:normal;}`,
                    xSmallNoWrap(textSize * 15.5)
                ],
                headline: [{ tag: 'medium', br: ['Sie', 'Raten'] }, { tag: 'xsmall' }],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    xSmallNoWrap(textSize * 16),
                    `.locale--DE .message__messaging .tag--medium span.br {white-space:normal;}`,
                    `.locale--DE .message__messaging .tag--medium span.br:nth-child(2) {white-space:nowrap;}`,
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Sie', 'Raten']
                    },
                    {
                        tag: 'xsmall',
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
                    `.message__logo-container::after { content: '.'; }`,
                    `.locale--DE .message__messaging .tag--medium span.br {white-space:normal;}`,
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Sie', 'Raten']
                    },
                    {
                        tag: 'xsmall',
                        replace: [['verfügbar.', 'verfügbar']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
