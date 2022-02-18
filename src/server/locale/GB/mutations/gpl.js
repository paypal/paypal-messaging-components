import Logo from '../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    xSmallFallback,
    logo20x1,
    altNoWrap,
    setLogoTop
} from '../../../message/mediaQueries';
import { textLogoMutations, flexLogoMutations } from '../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 37, textSize, 'GB'),
                    xSmallFallback(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on']
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
                    xSmallFallback(textSize * 16),
                    setLogoTop(textSize * 36 + 10),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 16), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize, 'GB'),
                    xSmallFallback(textSize * 18),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 16)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [
                            ['purchases.', 'purchases'],
                            ['later.', 'later']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        br: ['later.'],
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
                        replace: [
                            ['purchases.', 'purchases'],
                            ['later.', 'later']
                        ]
                    },
                    {
                        tag: 'xsmall.2',
                        br: ['later.'],
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
                disclaimer: ['default']
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [logo20x1()]
            }
        ],
        ...flexLogoMutations
    ]
};
