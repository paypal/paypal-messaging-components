import Logo from '../logos';
import {
    gbPLContentMediaQuery,
    fallbackMediaQuery,
    gbPLAltContentMediaQuery,
    gbPLMessageLogoWidth
} from './mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 25 + 20),
                    gbPLMessageLogoWidth(false, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']],
                        br: ['of']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 14 + 4),
                    gbPLMessageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 14 + 4),
                    gbPLContentMediaQuery(textSize * 38 + 10),
                    gbPLMessageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 14 + 4),
                    gbPLMessageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    gbPLAltContentMediaQuery(textSize * 17, textSize * 34, textSize * 24),
                    fallbackMediaQuery(textSize * 21),
                    gbPLMessageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 17)],
                logo: false
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 17 + 4)],
                logo: false
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        [
            'text.color:white && logo.type:inline',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 17 + 4)],
                logo: false
            })
        ],
        ['text.color:white && logo.type:alternative', { logo: Logo.PRIMARY.WHITE[0] }]
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
            'ratio:20x1',
            {
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']],
                        br: ['of ']
                    }
                ],
                // styles: [
                //     `@media (max-aspect-ratio: 61/10) {
                //         .message__logo-container { flex-basis: 26%; }
                //         .message__logo:nth-of-type(2) { display: inline-block; }
                //         .message__disclaimer { font-size: .6rem; }
                //     }`,
                //     `@media (max-width: 250px) {
                //         .message__logo-container { flex-basis: 13%; }
                //         .message__logo:nth-of-type(2) { display: none; }
                //         .message__promo-container { display: inline; }
                //         .message__headline { display: inline; width: 75%; }
                //         .message__disclaimer { display: inline; }
                //     }`
                // ]
                styles: [
                    `
                    .message__logo-container {
                        margin-right: 0;
                        flex-basis: 3%;
                    }
                    .message__logo:nth-of-type(1) {
                        width: 45%;
                    }
                    .message__headline {
                        font-size: 2.8vw;
                    }
                    @media (min-aspect-ratio: 200/11) and (min-width: 400px) {
                        .message__logo:nth-of-type(1) {
                            width: 20%;
                        }
                    }
                    `
                ]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']],
                        br: ['of ']
                    }
                ],
                // styles: [
                //     '.message__messaging { flex-basis: 80%; }',
                //     '.message__headline { font-size: 4vw; }',
                //     '.message__disclaimer { display: inline; font-size: .6rem; }',
                //     `@media (min-width: 480px) {
                //         .message__disclaimer { display: inline; font-size: .9rem; }
                //     }`,
                //     '.message__logo-container { flex-basis: 10%; }',
                //     '.message__logo:nth-of-type(2) { display: none; }',
                //     `@media (max-aspect-ratio: 61/10)  {
                //         .message__logo-container { flex-basis: 26%; }
                //         .message__logo:nth-of-type(2) { display: inline-block; }
                //     }`,
                //     `@media (max-width: 250px) {
                //         .message__logo-container { flex-basis: 13%; }
                //         .message__logo:nth-of-type(2) { display: none; }
                //         .message__promo-container { display: inline; }
                //         .message__headline { display: inline; width: 75%; }
                //     }`,
                //     `@media (min-width: 495px) {
                //         .message__logo-container { flex-basis: 23%; }
                //         div.message__logo:nth-of-type(1) { width: 20px; }
                //         div.message__logo:nth-of-type(2) { width: 60px; display: inline-block; }
                //     }`,
                //     `@media (min-width: 495px) {
                //         div.message__logo:nth-of-type(1) { width: 25px; }
                //         div.message__logo:nth-of-type(2) { width: 76px; display: inline-block; }
                //     }`
                // ]
                styles: [
                    `
                    .message__headline {
                        font-size: 3vw;
                    }
                    `
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
