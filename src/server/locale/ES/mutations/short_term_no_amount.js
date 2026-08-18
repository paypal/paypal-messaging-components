import Logo from '../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    logo20x1,
    xSmallFallback,
    disclaimerWrap
} from '../../../message/mediaQueries';
import { textLogoMutations, flexLogoMutations } from '../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['default'],
        breaks: ['ahora y']
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
            disclaimer: ['large', 'default']
        }
    ],
    [
        'ratio:20x1',
        {
            headline: [...headlineBreaks],
            styles: [logo20x1()]
        }
    ],
    [
        'ratio:8x1',
        {
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
                    textWrap(textSize * 57.5, textSize, 'ES'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16),
                    disclaimerWrap(textSize * 11.5)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'default',
                        br: ['ahora y']
                    }
                ],
                disclaimer: ['large', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 17.4),
                    setLogoTop(textSize * 57.5),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    disclaimerWrap(textSize * 11.5)
                ],
                headline: [
                    {
                        tag: 'default',
                        br: ['ahora y']
                    }
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 17.4),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    disclaimerWrap(textSize * 11.5)
                ],
                headline: [
                    {
                        tag: 'default',
                        br: ['ahora y']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 57.5, textSize, 'ES'),
                    xSmallFallback(textSize * 17.75),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    disclaimerWrap(textSize * 11.5)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0],
                headline: [
                    {
                        tag: 'default',
                        br: ['ahora y']
                    }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 20)],
                logo: false,
                headline: [
                    {
                        tag: 'default',
                        br: ['ahora y'],
                        replace: [['después.', 'después']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 20), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'default',
                        br: ['ahora y'],
                        replace: [['después.', 'después']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
