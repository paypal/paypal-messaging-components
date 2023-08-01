import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery, textWrap } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

const defaultTextStyles = [
    '.message__headline > span:first-of-type { color: #0070ba; text-decoration: underline; font-weight: 500; }',
    '.message__disclaimer > span:not(.multi) { color: #2c2e2f; font-weight: normal; text-decoration: none; }'
];

const whiteStyles = [
    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
    '.message__disclaimer > span:not(.multi) { color: white; font-weight: normal; text-decoration: none; }'
];

export default {
    'layout:text': [
        [
            'default',
            {
                styles: defaultTextStyles,
                logo: Logo.SINGLE_LINE.COLOR,
                headline: {
                    tag: 'xsmall',
                    replace: [['months', 'months.']],
                    br: ['months.']
                },
                disclaimer: 'xsmall.2'
            }
        ],
        [
            'logo.type:primary && logo.position:left',
            ({ textSize }) => ({
                messageWidth: textSize * 11,
                logo: [Logo.SINGLE_LINE_NO_PAYPAL.COLOR, Logo.SINGLE_LINE.COLOR],
                styles: [
                    ...defaultTextStyles,
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        width: { smallLogo: textSize * 5, largeLogo: textSize * 9 },
                        whiteSpaceBP: textSize * 27
                    }),
                    '.message__messaging span.br { white-space: nowrap; }'
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo-container { width: ${textSize * 9}px }`]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                messageWidth: [textSize * 10, 1000],
                styles: [
                    ...defaultTextStyles,
                    `
                    .message__logo-container { width: ${textSize * 9}px }
                    .message__content { display: inline-block; }
                    `,
                    altContentMediaQuery(textSize * 30.6)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo { width: ${textSize * 7}px }`],
                headline: {
                    tag: 'xsmall',
                    replace: [['months.', 'months']],
                    br: ['months']
                },
                logo: Logo.SINGLE_LINE_NO_PP.COLOR
            })
        ],
        [
            'logo.type:none',
            {
                logo: false,
                headline: {
                    tag: 'xsmall',
                    replace: [['months.', 'months']],
                    br: ['months']
                }
            }
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    textWrap(textSize * 28, textSize, 'US')
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR,
                headline: {
                    replace: [['months', 'months.']],
                    br: ['months.']
                }
            })
        ],
        [
            'logo.type:alternative && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    altContentMediaQuery(textSize * 30.6),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    `@media screen and (max-width: ${
                        textSize * 30.52
                    }px) { .locale--US .message__logo > img { top:2.3px; }}`,
                    textWrap(textSize * 28, textSize, 'US')
                ]
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo-container { width: ${textSize * 5}px }`]
            })
        ],
        [
            'text.color:white',
            ({ textSize }) => ({
                styles: [...whiteStyles, `.message__logo-container { width: ${textSize * 9}px }`]
            })
        ],
        [
            'logo.type:alternative && text.color:white',
            ({ textSize }) => ({
                styles: [
                    ...whiteStyles,
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    textWrap(textSize * 28, textSize, 'US')
                ]
            })
        ],
        [
            'logo.type:inline && text.color:white',
            ({ textSize }) => ({
                styles: [...whiteStyles, `.message__logo { width: ${textSize * 7}px }`]
            })
        ],
        [
            'logo.type:primary && logo.position:left && text.color:white',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        width: { smallLogo: textSize * 5, largeLogo: textSize * 9 },
                        whiteSpaceBP: textSize * 27
                    }),
                    '.message__messaging span.br { white-space: nowrap; }',
                    ...whiteStyles
                ]
            })
        ],
        [
            'logo.type:none && text.color:monochrome',
            () => ({
                styles: [...defaultTextStyles, `.tag--small { color: black; }`]
            })
        ],
        [
            'logo.type:none && text.color:grayscale',
            () => ({
                styles: [...defaultTextStyles, `.tag--small { color: #2c2e2f; }`]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.STACKED.WHITE,
                headline: { tag: 'xsmall', br: ['months'] },
                disclaimer: ['xsmall.2', 'xsmall']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['over', 'months'] }
            }
        ],
        ...flexLogoMutations
    ]
};
