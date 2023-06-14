import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery, textWrap } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.SINGLE_LINE.COLOR,
                messageWidth: [textSize * 12, 1000],
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
                    `
                    @media (max-width: ${textSize * 12}px) {
                        .message__messaging { display: block; }
                    }
                    `
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `
                    .message__logo-container { width: ${textSize * 9}px }
                    `
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
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
                styles: [`.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                headline: {
                    replace: [['APR.', 'APR']],
                    br: ['APR']
                }
            })
        ],
        [
            'logo.type:none',
            {
                logo: false,
                headline: {
                    replace: [['APR.', 'APR']],
                    br: ['APR']
                }
            }
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    textWrap(textSize * 33, textSize, 'US')
                ],
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
                    altContentMediaQuery(textSize * 34.3),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    `@media screen and (max-width: ${
                        textSize * 34.25
                    }px) { .locale--US .message__logo > img { top:2.3px; }}`,
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
                headline: { br: ['payments', 'mo.'] }
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
