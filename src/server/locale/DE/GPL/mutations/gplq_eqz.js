import Logo from '../../../../message/logos';
import { xSmallFallback, textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import { xSmallNoWrap } from './mediaQueries';
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
            disclaimer: ['default']
        }
    ],
    [
        'ratio:20x1',
        {
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:8x1',
        {
            headline: [...headlineBreaks],
            styles: [
                `@media (min-aspect-ratio: 60 / 11) and (max-width: 374px) {
                .message__headline {
                    font-size: 4.5vw;
                }
            }`,
                `@media (min-aspect-ratio: 60/11) and (max-width: 323px) {
                .message__headline {
                    font-size: 4.5vw;
                }
            }`
            ]
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
                    textWrap(textSize * 38, textSize, 'DE'),
                    xSmallFallback(textSize * 14.5),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    xSmallNoWrap(textSize * 14.5)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['ab']
                    },
                    { tag: 'xsmall', br: ['verfügbar.'] }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 13.6),
                    setLogoTop(textSize * 35),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    xSmallNoWrap(textSize * 13.6)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 12.9),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    xSmallNoWrap(textSize * 12.9)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 15.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize, 'DE'),
                    xSmallFallback(textSize * 12.5),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `@media screen and (max-width: ${
                        textSize * 12.5
                    }px) { .locale--DE .message__messaging { white-space: nowrap;}}`
                ],
                headline: [
                    { tag: 'medium', br: ['ab'] },
                    { tag: 'xsmall', br: ['Ratenzahlung'] }
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 16), xSmallNoWrap(textSize * 16)],
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
                    }`
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
