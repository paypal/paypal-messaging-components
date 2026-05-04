import Logo from '../logos';
import { basicMediaQuery, altContentMediaQuery, messageDisclaimerMediaQuery } from './mediaQueries';
import { messageLogoWidth, setLogoTop, xSmallFallback, textWrap } from '../../../../message/mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export const flex = [
    [
        'default',
        {
            logo: Logo.CREDIT_WORDMARK.WHITE,
            headline: ['xsmall', { tag: 'medium', br: ['months'] }],
            disclaimer: 'xsmall'
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
            disclaimer: ['xlarge', 'xsmall']
        }
    ],
    ...flexLogoMutations
];

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => {
                return {
                    styles: [
                        textWrap(textSize * 39.5, textSize, 'US'),
                        xSmallFallback(textSize * 16),
                        messageLogoWidth(false, textSize * 5.1),
                        setLogoTop(textSize * 20)
                    ],
                    logo: Logo.CREDIT_REBRAND_BADGE.COLOR,
                    headline: [
                        { tag: 'xsmall', br: ['time.'] },
                        { tag: 'medium', br: ['months'] }
                    ],
                    disclaimer: 'xsmall'
                };
            }
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                messageWidth: [textSize * 13, textSize * 34],
                styles: [
                    basicMediaQuery(textSize * 17),
                    textWrap(textSize * 40, textSize, 'US'),
                    `.locale--US .message__logo-container { width: ${textSize * 7.4}px; }`,
                    `.message__disclaimer { display: inline; }`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:left',
            ({ textSize }) => ({
                messageWidth: [textSize * 13, textSize * 33],
                logo: Logo.CREDIT_REBRAND_BADGE.COLOR,
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['on ', 'months'] }
                ],
                styles: [
                    basicMediaQuery(textSize * 18),
                    textWrap(textSize * 40, textSize, 'US'),
                    `.locale--US .message__logo-container { width: ${textSize * 7.4}px; }`
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [basicMediaQuery(textSize * 15 + 80), `.message__logo { width: ${textSize * 6.8}px }`],
                logo: Logo.CREDIT_WORDMARK.COLOR,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        replace: [['9+.', '9+']],
                        br: ['purchases']
                    }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [basicMediaQuery(textSize * 20)],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        replace: [['9+.', '9+']],
                        br: ['purchases']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    basicMediaQuery(textSize * 18),
                    `.locale--US .message__logo-container { width: ${textSize * 5}px; }`,
                    textWrap(textSize * 39, textSize, 'US'),
                    `@media screen and (max-width: ${textSize * 39}px) {
                        .locale--US .message__content {
                        display: block;
                        margin-top: 0;
                    }
                    }`
                ],
                logo: Logo.CREDIT_REBRAND_PP_BADGE.COLOR
            })
        ],
        [
            'logo.type:alternative && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    basicMediaQuery(textSize * 18),
                    altContentMediaQuery(textSize * 42),
                    `.locale--US .message__logo-container { width: ${textSize * 5}px; }`,
                    `@media screen and (max-width: ${
                        textSize * 42
                    }px) { .locale--US .message__logo > img { top:2.3px; }}`,
                    textWrap(textSize * 39, textSize, 'US'),
                    `@media screen and (max-width: ${
                        textSize * 39
                    }px) { .locale--US .message__logo-container { margin-bottom: 8px; } }`
                ],
                logo: Logo.CREDIT_REBRAND_PP_BADGE.COLOR
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => {
                const breakpointCalc = textSize * 19;
                return {
                    styles: [
                        messageDisclaimerMediaQuery(breakpointCalc - 1),
                        basicMediaQuery(breakpointCalc),
                        `.message__disclaimer { display: block; }`,
                        `.locale--US .message__logo-container { width: ${textSize * 7.4}px; }`
                    ]
                };
            }
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    basicMediaQuery(textSize * 18.5),
                    `.locale--US .message__logo-container { width: ${textSize * 5}px; }`
                ]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': flex
};
