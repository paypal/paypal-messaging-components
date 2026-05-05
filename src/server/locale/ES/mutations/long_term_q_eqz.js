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
        breaks: ['al mes']
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
                    textWrap(textSize * 37, textSize, 'ES'),
                    xSmallFallback(textSize * 18),
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 16),
                    `.message__headline .br:nth-child(2) {
    font-weight: bold;
}`
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mes al']
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
                    `@media screen and (max-width: ${
                        textSize * 18.5
                    }px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 16),
                    setLogoTop(textSize * 37),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    `.message__headline .br:nth-child(2) {
    font-weight: bold;
}`
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['mes al']
                    },
                    { tag: 'xsmall' }
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${
                        textSize * 18.5
                    }px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    `.message__headline .br:nth-child(2) {
    font-weight: bold;
}`
                ],
                headline: [
                    {
                        tag: 'medium',
                        br: ['mes al']
                    },
                    { tag: 'xsmall' }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 14}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 33.5, textSize, 'ES'),
                    xSmallFallback(textSize * 14),
                    altNoWrap(textSize * 14),
                    messageLogoWidth(textSize * 1.75, textSize * 1.35),
                    `.message__headline .br:nth-child(2) {
    font-weight: bold;
}`
                ],
                logo: Logo.PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mes al']
                    },
                    { tag: 'xsmall' }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 19),
                    `.message__headline .br:nth-child(2) {
    font-weight: bold;
}`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mes al'],
                        replace: [['TAE.', 'TAE']]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [['después.', 'después']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 19),
                    `.message__logo { width: ${textSize * 4.1}px }`,
                    `.message__headline .br:nth-child(2) {
    font-weight: bold;
}`
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'medium',
                        br: ['mes al'],
                        replace: [['TAE.', 'TAE']]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [['después.', 'después']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
