import Logo from '../../../../message/logos';
import {
    xSmallFallback,
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallNoWrap,
    addPeriod,
    primaryWrap
} from '../../../../message/mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall'],
        breaks: ['kaufen,']
    },
    {
        sizes: ['medium'],
        breaks: ['Einkäufen']
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
        'ratio:8x1',
        {
            styles: [addPeriod()],
            headline: [...headlineBreaks]
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
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 14),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    xSmallNoWrap(textSize * 7.7),
                    addPeriod(),
                    primaryWrap(textSize * 12.4)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['erst']
                    },
                    { tag: 'xsmall', br: [','] }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 15),
                    setLogoTop(textSize * 45),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
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
                    xSmallFallback(textSize * 15.1),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
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
                    textWrap(textSize * 55, textSize, 'DE'),
                    xSmallFallback(textSize * 15.5),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    xSmallNoWrap(textSize * 8),
                    altNoWrap(textSize * 15.5),
                    addPeriod()
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
                styles: [xSmallFallback(textSize * 14)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['erst']
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
                    xSmallFallback(textSize * 16),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after { content: '.'; }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['erst']
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
