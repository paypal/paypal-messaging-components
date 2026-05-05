import { flexLogoMutations, textLogoMutations } from '../../../message/logoMutations';
import Logo from '../../../message/logos';
import {
    altNoWrap,
    logo20x1,
    messageLogoWidth,
    setLogoTop,
    textWrap,
    xSmallFallback
} from '../../../message/mediaQueries';

const headlineBreaks = [
    {
        sizes: ['xsmall']
    },
    {
        sizes: ['medium'],
        breaks: ['rate']
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

export default {
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.WORDMARK.WHITE,
                headline: [
                    {
                        tag: 'xsmall'
                    },
                    {
                        tag: 'medium'
                    }
                ],
                disclaimer: ['default'],
                styles: []
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
    ],
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 40.5, textSize, 'IT'),
                    xSmallFallback(textSize * 22),
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['in']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 17.4),
                    setLogoTop(textSize * 41.5),
                    messageLogoWidth(textSize * 6, textSize * 5.1)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 17.4), messageLogoWidth(textSize * 6, textSize * 5.1)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 36.5, textSize, 'IT'),
                    xSmallFallback(textSize * 17.75),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 1.35)
                ],
                logo: Logo.PP_MONOGRAM.COLOR
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 20)],
                logo: false,
                headline: [
                    {
                        tag: 'medium.2',
                        br: ['rate', 'in\b'],
                        replace: [
                            ['interessi.', 'interessi'],
                            ['dopo.', 'dopo']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        br: ['dopo.'],
                        replace: [['dopo.', 'dopo']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 20), `.message__logo { width: ${textSize * 4.1}px }`],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium.2',
                        br: ['rate', 'in\b'],
                        replace: [
                            ['interessi.', 'interessi'],
                            ['dopo.', 'dopo']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        br: ['dopo.'],
                        replace: [['dopo.', 'dopo']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
