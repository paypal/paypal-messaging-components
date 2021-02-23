import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery, textWrap, zeroAprMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.SINGLE_LINE.COLOR,
                messageWidth: [textSize * 11, textSize * 18],
                headline: {
                    tag: 'small',
                    br: ['/mo.']
                },
                disclaimer: 'small'
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
                    }
                    `
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 9}px }`, zeroAprMediaQuery(textSize * 16)]
            })
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
                    zeroAprMediaQuery(textSize * 16),
                    altContentMediaQuery(textSize * 34.3)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    zeroAprMediaQuery(textSize * 16),
                    `
                    @media (max-width: ${textSize * 16}px) {
                        .message__logo-container { display: block; }
                    }
                    .message__logo { width: ${textSize * 7}px }`
                ],
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                messageWidth: [textSize * 19, 1000],
                headline: {
                    replace: [['APR.', 'APR']],
                    br: ['APR']
                }
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    zeroAprMediaQuery(textSize * 16),
                    `
                    @media (max-width: ${textSize * 15}px) {
                        .message__disclaimer { display: block; }
                    }
                    `
                ],
                logo: false,
                messageWidth: [textSize * 17, 1000],
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
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    zeroAprMediaQuery(textSize * 16),
                    textWrap(textSize * 27, textSize, 'US')
                ],
                messageWidth: false,
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 5}px }`, zeroAprMediaQuery(textSize * 16)]
            })
        ],
        [
            'logo.type:alternative && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    altContentMediaQuery(textSize * 29.1),
                    zeroAprMediaQuery(textSize * 16),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    textWrap(textSize * 27, textSize, 'US')
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
                headline: { tag: 'medium', br: ['low as', 'at'] },
                disclaimer: 'small'
            }
        ],
        ...flexLogoMutations
    ]
};
