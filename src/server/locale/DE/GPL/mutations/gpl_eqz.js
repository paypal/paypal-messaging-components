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
            disclaimer: ['default']
        }
    ],
    [
        'ratio:20x1',
        {
            styles: [
                `.message__headline > .tag--medium > span > span:last-child::after {
                    content: '.'
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
                        font-size: 4.5vw;
                    }
                }`,
                `@media (min-aspect-ratio: 60/11) and (max-width: 323px) {
                    .message__headline {
                        font-size: 4.5vw;
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
                `.message__headline > .tag--medium > span > span:last-child::after {
                content: '.'
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
                    textWrap(textSize * 55, textSize, 'DE'),
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
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 15),
                    setLogoTop(textSize * 53),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.message__headline > .tag--medium > span > span:last-child::after {
                        content: '.'
                    }`,
                    xSmallNoWrap(textSize * 13.8),
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
                    xSmallFallback(textSize * 14.8),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    `.message__headline > .tag--medium > span > span:last-child::after {
                        content: '.'
                    }`,
                    xSmallNoWrap(textSize * 13.8),
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
                    `@media screen and (max-width: ${textSize * 15.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 15.5),
                    altNoWrap(textSize * 15.5),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    `.message__headline > .tag--medium > span > span:last-child::after {content: '.'}`,
                    `.locale--DE .message__messaging .tag--medium span.br:last-child {white-space:normal;}`,
                    xSmallNoWrap(textSize * 15.5),
                    `@media screen and (max-width: ${
                        textSize * 12.5
                    }px) { .locale--DE .message__messaging { white-space: nowrap;}}`
                ],
                headline: [
                    { tag: 'medium', br: ['Sie', 'Raten'] },
                    { tag: 'xsmall', br: ['Ratenzahlung'] }
                ],
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
                    `.locale--DE .message__messaging .tag--medium span.br:nth-child(2) {white-space:nowrap;}`
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
                    `.locale--DE .message__messaging .tag--medium span.br:nth-child(2) {white-space:nowrap;}`
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
