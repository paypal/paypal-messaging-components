import Logo from '../logos';
import { messageLogoWidth } from '../../../GB/mutations/mediaQueries';
import { smallTagMediaQuery, xsmallTagMediaQuery, setLogoTop, textWrap } from './mediaQueries';
import { flexLogoMutations, textLogoMutations } from './common';

const flex = [
    [
        'default',
        {
            logo: Logo.PRIMARY.WHITE,
            headline: [
                {
                    tag: 'medium'
                }
            ],
            disclaimer: 'xsmall',
            styles: [
                '.message__headline .tag--medium > span:first-child:after { content: "."; }',
                '.message__headline .tag--medium .weak { display: none; }'
            ]
        }
    ],
    [
        'ratio:8x1',
        {
            headline: [
                {
                    tag: 'medium',
                    br: ['payments']
                }
            ],
            styles: [
                '.message__headline .tag--medium > span:first-child > span:last-child:after { content: "."; }',
                '.message__headline .tag--medium .weak { display: none; }'
            ]
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
                    `.message__headline > .tag--medium .weak.br { display: inline-block; transform: translateX(-4.5px); white-space: nowrap; }`,
                    textWrap(textSize * 32, textSize),
                    xsmallTagMediaQuery(textSize * 16),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 16)
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
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { margin-left: -4.5px; white-space: nowrap; }`,
                    `@media screen and (max-width: ${textSize *
                        14.15}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xsmallTagMediaQuery(textSize * 10.75),
                    setLogoTop(textSize * 32),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { margin-left: -4.5px; }`,
                    `@media screen and (max-width: ${textSize *
                        14.15}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xsmallTagMediaQuery(textSize * 10.75),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { display: inline-block; transform: translateX(-4.5px); white-space: nowrap; } .message__messaging span.br { white-space: nowrap; }`,
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize),
                    xsmallTagMediaQuery(textSize * 11.5),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
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
                logo: Logo.INLINE.COLOR,
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
    ]
};
