import Logo from '../../../../message/logos';
import { xSmallFallback, textWrap, messageLogoWidth, altNoWrap, setLogoTop } from '../../../../message/mediaQueries';
import { addPeriod, xSmallNoWrap } from './mediaQueries';
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
                    addPeriod(),
                    xSmallNoWrap(textSize * 14.2)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['Einkäufen']
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
                    addPeriod(),
                    xSmallNoWrap(textSize * 13.8)
                ],
                headline: [{ tag: 'medium', br: ['Einkäufen'] }, { tag: 'xsmall' }]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 14.8),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    addPeriod(),
                    xSmallNoWrap(textSize * 13.8)
                ],
                headline: [{ tag: 'medium', br: ['Einkäufen'] }, { tag: 'xsmall' }]
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
                    addPeriod(),
                    xSmallNoWrap(textSize * 15.5)
                ],
                headline: [{ tag: 'medium', br: ['Einkäufen'] }, { tag: 'xsmall' }],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 16), xSmallNoWrap(textSize * 16)],
                logo: false,
                headline: [
                    { tag: 'medium' },
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
                    addPeriod(),
                    xSmallNoWrap(textSize * 13.8),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after {
                    content: '.';
                }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    { tag: 'medium' },
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
