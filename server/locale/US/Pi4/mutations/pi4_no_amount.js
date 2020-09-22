import Logo from '../logos';
import { messageLogoWidth } from '../../../GB/mutations/mediaQueries';
import { xsmallTagMediaQuery, setLogoTop, textWrap } from './mediaQueries';
import { flexLogoMutations, textLogoMutations } from './common';

const flex = [
    [
        'default',
        {
            logo: Logo.PRIMARY.WHITE,
            headline: [
                {
                    tag: 'default'
                }
            ],
            disclaimer: ['default']
        }
    ],
    [
        'ratio:20x1',
        {
            styles: [
                `
                .message__logo:nth-of-type(2) {
                    display: inline-block;
                }

                @media (max-aspect-ratio: 61/10) and (min-width: 324px) {
                    .message__logo-container {
                        margin-right: 7%;
                    }
                    .message__logo:nth-of-type(1) {
                        margin: 0 5px;
                        width: 30%;
                    }
                    .message__logo:nth-of-type(2) {
                        display: inline;
                        width: 70px;
                    }
                }

                @media (min-aspect-ratio: 200/11) and (min-width: 300px) {
                    .message__logo-container {
                        max-width: 15%;
                    }
                    .message__logo:nth-of-type(1) {
                        width: 20%;
                    }
                    .message__logo:nth-of-type(2) {
                        width: 60%;
                    }
                }
                `
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
                    textWrap(textSize * 32, textSize),
                    xsmallTagMediaQuery(textSize),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20)
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'default'
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    xsmallTagMediaQuery(textSize * 16),
                    setLogoTop(textSize * 21),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [xsmallTagMediaQuery(textSize), messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (max-width: ${textSize * 10.5}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize),
                    xsmallTagMediaQuery(textSize),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [xsmallTagMediaQuery(textSize)],
                logo: false,
                headline: [
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
                styles: [xsmallTagMediaQuery(textSize), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.INLINE.COLOR,
                headline: [
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
