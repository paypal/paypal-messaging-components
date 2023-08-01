import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery, textWrap } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.SINGLE_LINE.COLOR,
                messageWidth: [textSize * 11, textSize * 12],
                headline: { tag: 'xsmall' },
                disclaimer: 'xsmall'
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 9}px }`]
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
                    })
                ]
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
                    altContentMediaQuery(textSize * 34.3)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                messageWidth: false,
                headline: {
                    br: ['/mo.']
                }
            })
        ],
        [
            'logo.type:none',
            {
                logo: false,
                messageWidth: false,
                headline: {
                    br: ['/mo.']
                }
            }
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    textWrap(textSize * 22, textSize, 'US'),
                    `.message__headline span:only-child { white-space: normal; }`
                ],
                messageWidth: false,
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 5}px }`]
            })
        ],
        [
            'logo.type:alternative && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    altContentMediaQuery(textSize * 23.8),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    `@media screen and (max-width: ${
                        textSize * 23.74
                    }px) { .locale--US .message__logo > img { top:2.3px; }}`,
                    textWrap(textSize * 22, textSize, 'US'),
                    `.message__headline span:only-child { white-space: normal; }`
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
                headline: { tag: 'small', br: ['low as'] },
                disclaimer: 'xsmall'
            }
        ],
        ...flexLogoMutations
    ]
};
