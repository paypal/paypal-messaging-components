import Logo from '../logos';
import {
    plContentMediaQuery,
    plAltContentMediaQuery,
    messageLogoWidth,
    xSmallFallback,
    smallFallback
} from './mediaQueries';
import { textLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { white-space: nowrap; }`,
                    xSmallFallback(textSize * 15.5),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR,
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
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 15.5), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallFallback(textSize * 15.5),
                    plContentMediaQuery(textSize * 31 + 10),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [xSmallFallback(textSize * 15.5), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    plAltContentMediaQuery(textSize * 17, textSize * 26.5),
                    xSmallFallback(textSize * 17),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [smallFallback(textSize * 17)],
                logo: false,
                headline: [
                    {
                        tag: 'medium'
                    },
                    {
                        tag: 'small',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [smallFallback(textSize * 17 + 4), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    {
                        tag: 'medium'
                    },
                    {
                        tag: 'small',
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
                logo: Logo.PRIMARY.WHITE,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']]
                    }
                ],
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x4',
            {
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']],
                        br: ['per ']
                    }
                ],
                styles: [`@media (min-height: 500px) {.message__headline {font-size: 1.4rem;}}`]
            }
        ],
        [
            'ratio:20x1',
            {
                headline: [
                    'default',
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']],
                        br: ['per ']
                    }
                ]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: [
                    'default',
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']],
                        br: ['per ']
                    }
                ]
            }
        ],

        [
            'color:gray',
            {
                logo: Logo.PRIMARY.COLOR
            }
        ],
        [
            'color:white',
            {
                logo: Logo.PRIMARY.COLOR
            }
        ],
        [
            'color:black',
            {
                logo: Logo.PRIMARY.WHITE
            }
        ]
    ]
};
