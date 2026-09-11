import Logo from '../../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallNoWrap,
    primaryWrap
} from '../../../../message/mediaQueries';
import { crossBorderDisclaimerWrap, crossBorderLogoNoneWrap } from '../../GPL/mutations/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall'],
        breaks: ['kaufen,']
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
                }
            ],
            disclaimer: ['large', 'extra', 'default']
        }
    ],
    [
        'ratio:8x1',
        {
            headline: [...headlineBreaks],
            styles: [
                `@media (min-aspect-ratio: 60/11) {.message__headline span.tag--xsmall {display: inline}};`,
                `@media (min-aspect-ratio: 60/11) {
                    .message__disclaimer {
                        display: block;
                        font-size: 1vw;
                        line-height: 1.2;
                        margin-top: 2px;
                    }
                    .message__disclaimer > .tag--extra > span:only-child {
                        line-height: 1.2;
                    }
                }`,
                `@media (min-aspect-ratio: 60 / 11) and (max-width: 374px) {
                    .message__headline {
                        font-size: 2vw;
                    }
                    .message__disclaimer {
                        font-size: 1.5vw;
                    }
                    .message__disclaimer > span.tag--large {
                        font-size: 2vw;
                    }
                }`,
                `@media (min-aspect-ratio: 60/11) and (max-width: 323px) {
                    .message__headline {
                        font-size: 2vw;
                    }
                    .message__disclaimer > span.tag--large {
                        font-size: 2vw;
                    }
                }`
            ]
        }
    ],
    [
        'ratio:1x1',
        {
            styles: [
                `.message__disclaimer > span.tag--extra {
                    font-size: 4vw;
                }`,
                `@media (max-aspect-ratio: 11/10) and (max-width: 150px) {
                    .message__disclaimer > span.tag--extra {
                        font-size: 0.6rem;
                    }
                }`
            ],
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:1x4',
        {
            headline: [...headlineBreaks],
            styles: [`.message__headline .tag--xsmall { display: inline;}`]
        }
    ],
    [
        'ratio:20x1',
        {
            headline: [...headlineBreaks],
            styles: [`@media (min-aspect-ratio: 60/11) {.message__headline span.tag--xsmall {display: inline}};`]
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
                    textWrap(textSize * 68.5, textSize, 'AT'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    xSmallNoWrap(textSize * 7.7),
                    primaryWrap(textSize * 12.4),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [{ tag: 'xsmall', br: [','] }],
                disclaimer: ['large', 'extra', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    setLogoTop(textSize * 68.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
                    `@media screen and 
                    (max-width: ${textSize * 29}px) {
                        .message__headline > .tag--medium > span > span.br:nth-child(2) {white-space: nowrap;}
                    }`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
                    `@media screen and 
                    (max-width: ${textSize * 29}px) {
                        .message__headline > .tag--medium > span > span.br:nth-child(2) {white-space: nowrap;}
                    }`
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
                    textWrap(textSize * 65, textSize, 'AT'),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    xSmallNoWrap(textSize * 8),
                    altNoWrap(textSize * 15.5)
                ],
                headline: [{ tag: 'xsmall', br: ['später'] }],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    crossBorderLogoNoneWrap(textSize * 14),
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`,
                    `.message__headline .tag--xsmall > span { white-space: nowrap }`,
                    `margin-top: 0px;`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['bezahlen.', 'bezahlen']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after { content: '.'; }`,
                    `.message__disclaimer { white-space: normal; }`,
                    `.message__headline .tag--xsmall > span { white-space: nowrap }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['bezahlen.', 'bezahlen']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
