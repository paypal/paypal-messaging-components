import Logo from '../../../../message/logos';
import {
    xSmallFallback,
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallNoWrap,
    addPeriod
} from '../../../../message/mediaQueries';
import { crossBorderDisclaimerWrap, crossBorderLogoNoneWrap } from '../../GPL/mutations/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall'],
        breaks: ['kaufen,']
    },
    {
        sizes: ['medium'],
        breaks: ['nach']
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
        'ratio:1x1',
        {
            styles: [addPeriod()],
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:1x4',
        {
            styles: [addPeriod()],
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:8x1',
        {
            styles: [addPeriod()],
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:20x1',
        {
            styles: [addPeriod()],
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
                    textWrap(textSize * 39, textSize, 'DE'),
                    xSmallFallback(textSize * 17),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 15),
                    xSmallNoWrap(textSize * 7.7),
                    addPeriod(),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
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
                        br: ['nach']
                    },
                    { tag: 'xsmall', br: [','] }
                ],
                disclaimer: ['extra', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 10),
                    setLogoTop(textSize * 39),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 9.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
                    `@media screen and (max-width: ${textSize * 15.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 14),
                    altNoWrap(textSize * 14),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    `.locale--DE .message__messaging .tag--medium span.br:last-child {white-space:normal;}`,
                    xSmallNoWrap(textSize * 8)
                ],
                headline: [
                    { tag: 'medium', br: ['nach'] },
                    { tag: 'xsmall', br: ['später'] }
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 14),
                    crossBorderLogoNoneWrap(textSize * 14),
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['nach'],
                        replace: [
                            ['Sie nach', 'Sie'],
                            ['Tagen', 'Tage später']
                        ]
                    },
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
                    xSmallFallback(textSize * 14),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after { content: '.'; }`,
                    `.message__disclaimer { white-space: normal; }`,
                    `.message__headline .tag--xsmall > span { white-space: nowrap }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['nach'],
                        replace: [
                            ['Sie nach', 'Sie'],
                            ['Tagen', 'Tage später']
                        ]
                    },
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
