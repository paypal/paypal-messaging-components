import Logo from '../logos';
import {
    basicMediaQuery,
    altContentMediaQuery,
    primaryContentMediaQuery,
    messageDisclaimerMediaQuery,
    textWrap
} from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export const flex = [
    [
        'default',
        {
            logo: Logo.STACKED.WHITE,
            headline: ['xsmall', { tag: 'medium', br: ['months'] }],
            disclaimer: ['extra.2', 'small']
        }
    ],
    [
        'ratio:1x1',
        {
            headline: ['xsmall', 'medium'],
            styles: ['@media (min-width: 150px) { .message__headline { font-size: 8vw } }']
        }
    ],
    [
        'ratio:1x4',
        {
            headline: { tag: 'medium', br: ['months'] },
            styles: [
                '.message__logo-container { margin-bottom: 30%; }',
                '.message__disclaimer span.multi:nth-of-type(1) { display: none; }',
                '@media (max-aspect-ratio: 11/40) { .message__disclaimer span.multi:nth-of-type(1) { display: block; } }',
                '.message__headline { font-size: 1.1rem }'
            ],
            disclaimer: ['xlarge', 'extra.2', 'small']
        }
    ],
    ...flexLogoMutations
];

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => {
                const breakpointCalc = textSize * 22 + 70;
                return {
                    styles: [messageDisclaimerMediaQuery(breakpointCalc - 1), basicMediaQuery(breakpointCalc)],
                    logo: Logo.SINGLE_LINE.COLOR,
                    headline: [
                        { tag: 'xsmall', br: ['time.'] },
                        { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }
                    ],
                    disclaimer: ['extra', 'xsmall']
                };
            }
        ],
        [
            'logo.type:primary && logo.position:left',
            ({ textSize }) => ({
                messageWidth: [textSize * 13, textSize * 27],
                logo: [Logo.SINGLE_LINE_NO_PAYPAL.COLOR, Logo.SINGLE_LINE.COLOR],
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['on '], replace: [['99+', '99+.']] }
                ],
                styles: [
                    basicMediaQuery(textSize * 18),
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        width: { smallLogo: textSize * 5, largeLogo: textSize * 9 },
                        whiteSpaceBP: textSize * 27
                    })
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [basicMediaQuery(textSize * 23), `.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                    { tag: 'medium', br: ['purchases'] }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [basicMediaQuery(textSize * 21)],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        br: ['purchases']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => {
                const breakpointCalc = textSize * 17;
                return {
                    styles: [
                        basicMediaQuery(breakpointCalc),
                        `.message__logo-container { width: ${textSize * 5}px }`,
                        textWrap(textSize * 43, textSize, 'US'),
                        `.message__headline span:only-child { white-space: normal; }`
                    ],
                    logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR,
                    headline: [
                        'xsmall',
                        {
                            tag: 'medium',
                            br: ['months'],
                            replace: [['99+', '99+.']]
                        }
                    ]
                };
            }
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    basicMediaQuery(textSize * 20),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    `.message__headline span:only-child { white-space: nowrap; }`
                ],
                headline: [
                    'xsmall',
                    {
                        tag: 'medium',
                        br: ['months'],
                        replace: [['99+', '99+.']]
                    }
                ]
            })
        ],
        [
            'logo.type:alternative && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    basicMediaQuery(textSize * 20),
                    altContentMediaQuery(textSize * 45),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    `@media screen and (max-width: ${
                        textSize * 44.93
                    }px) { .locale--US .message__logo > img { top:2.3px; }}`,
                    textWrap(textSize * 43, textSize, 'US'),
                    `.message__headline span:only-child { white-space: normal; }`
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => {
                const breakpointCalc = textSize * 21;
                return {
                    styles: [
                        messageDisclaimerMediaQuery(breakpointCalc - 1),
                        basicMediaQuery(breakpointCalc),
                        `
                        @media (min-width: ${textSize * 28}px) {
                            .message__disclaimer {
                                display:block;
                            }
                        }
                        `,
                        `.message__logo-container { width: ${textSize * 9}px }`
                    ]
                };
            }
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                messageWidth: [textSize * 10, 1000],
                styles: [
                    `
                    .message__logo-container { width: ${textSize * 9}px }
                    .message__content { display: inline-block; }
                    `,
                    basicMediaQuery(textSize * 18),
                    altContentMediaQuery(textSize * 46.25)
                ]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': flex
};
