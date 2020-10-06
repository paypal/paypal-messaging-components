import Logo from '../logos';
import {
    gbPLContentMediaQuery,
    xSmallTagMediaQuery,
    gbPLAltContentMediaQuery,
    gbPLMessageLogoWidth,
    smallTagMediaQuery
} from './mediaQueries';
import { textLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    xSmallTagMediaQuery(textSize * 16),
                    gbPLMessageLogoWidth(false, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR,
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
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [xSmallTagMediaQuery(textSize * 16), gbPLMessageLogoWidth(false, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xSmallTagMediaQuery(textSize * 16),
                    gbPLContentMediaQuery(textSize * 36 + 10),
                    gbPLMessageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    xSmallTagMediaQuery(textSize * 16),
                    gbPLMessageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    gbPLAltContentMediaQuery(textSize * 17, textSize * 32),
                    xSmallTagMediaQuery(textSize * 18),
                    gbPLMessageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [smallTagMediaQuery(textSize * 18)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
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
                styles: [smallTagMediaQuery(textSize * 18), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['on'],
                        replace: [['purchases.', 'purchases']]
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
                        replace: [['purchases.', 'purchases']]
                    }
                ],
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:20x1',
            {
                headline: [
                    'default',
                    {
                        tag: 'medium',
                        replace: [['purchases.', 'purchases']],
                        br: ['eligible ']
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
                        replace: [['purchases.', 'purchases']],
                        br: ['eligible ']
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
