import Logo from '../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    xSmallFallback,
    logo20x1,
    altNoWrap,
    setLogoTop
} from '../../../message/mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 16),
                    textWrap(textSize * 32, textSize, 'GB'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['payments']
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
                    `@media screen and (max-width: ${textSize *
                        14.15}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 10.75),
                    setLogoTop(textSize * 32 + 10),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize *
                        14.15}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 10.75),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize, 'GB'),
                    xSmallFallback(textSize * 11.5),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 18)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 18), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
                    },
                    {
                        tag: 'xsmall.2',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': [
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
                disclaimer: ['default'],
                styles: [
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }',
                    '.message__headline .tag--medium .weak { display: none; }'
                ]
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [
                    logo20x1(),
                    '.message__headline .tag--medium .weak { display: none; }',
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }'
                ]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: [
                    {
                        tag: 'xsmall'
                    },
                    {
                        tag: 'medium',
                        br: ['payments']
                    }
                ],
                styles: [
                    '.message__headline .tag--medium > span:first-child > span:last-child:after { content: "."; }',
                    '.message__headline .tag--medium .weak { display: none; }',
                    '@media (min-aspect-ratio: 80/11) { .message__disclaimer { margin-left: 0;} }'
                ]
            }
        ],
        ...flexLogoMutations
    ]
};
