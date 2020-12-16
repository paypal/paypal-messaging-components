import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery, textWrap, zeroAprMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.SINGLE_LINE.COLOR,
                messageWidth: [textSize * 17, textSize * 21],
                headline: {
                    tag: 'small',
                    br: ['/mo.']
                },
                disclaimer: 'xsmall'
            })
        ],
        [
            'logo.type:primary && logo.position:left',
            ({ textSize }) => ({
                logo: [Logo.SINGLE_LINE_NO_PAYPAL.COLOR, Logo.SINGLE_LINE.COLOR],
                styles: [
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        width: { smallLogo: textSize * 5, largeLogo: textSize * 9 },
                        whiteSpaceBP: textSize * 27
                    }),
                    zeroAprMediaQuery(textSize * 16),
                    `
                    @media (max-width: ${textSize * 11}px) {
                        .message__messaging { display: block; }
                        .message__headline > .tag--small > .br:nth-child(2) { display: block; }
                    }
                    `
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    zeroAprMediaQuery(textSize * 16),
                    `
                    @media (max-width: ${textSize * 16}px) {
                        .message__headline > .tag--small > .br:nth-child(2) { display: block; }
                    }
                    .message__logo-container { width: ${textSize * 9}px }
                    `
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                messageWidth: [textSize * 10, 1000],
                styles: [
                    zeroAprMediaQuery(textSize * 16),
                    `
                    .message__logo-container { width: ${textSize * 9}px }
                    .message__content { display: inline-block; }
                    `,
                    altContentMediaQuery(textSize * 37)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [zeroAprMediaQuery(textSize * 16), `.message__logo { width: ${textSize * 7}px }`],
                messageWidth: false,
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                headline: {
                    replace: [['APR.', 'APR']],
                    br: ['APR']
                }
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [zeroAprMediaQuery(textSize * 16)],
                messageWidth: false,
                logo: false,
                headline: {
                    replace: [['APR.', 'APR']],
                    br: ['APR']
                }
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    zeroAprMediaQuery(textSize * 16),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    textWrap(textSize * 33, textSize, 'US')
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR,
                messageWidth: [textSize * 10, 1000]
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [zeroAprMediaQuery(textSize * 16), `.message__logo-container { width: ${textSize * 5}px }`]
            })
        ],
        [
            'logo.type:alternative && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    zeroAprMediaQuery(textSize * 16),
                    altContentMediaQuery(textSize * 34.3),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    textWrap(textSize * 33, textSize, 'US')
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR
            })
        ],
        ...textLogoMutations
    ],
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.STACKED.WHITE,
                headline: { tag: 'small', br: [' of', 'at'] },
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['payments', 'mo'] }
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [
                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.75rem; } }'
                ]
            }
        ],
        ...flexLogoMutations
    ]
};
