import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.SINGLE_LINE.COLOR,
                messageWidth: [textSize * 13, textSize * 18],
                headline: { tag: 'small', br: ['/mo.'] },
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
                        logoAltWidth: textSize * 5,
                        logoWidth: textSize * 9,
                        whiteSpaceBP: textSize * 27
                    })
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 9}px }`]
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
                messageWidth: [textSize * 19, 1000]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                logo: false,
                messageWidth: [textSize * 17, 1000]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    altContentMediaQuery(textSize * 29.3),
                    `.message__logo-container { width: ${textSize * 5}px }`
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
        ...textLogoMutations
    ],
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.STACKED.WHITE,
                headline: { tag: 'small', br: ['of'] },
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['payments'] }
            }
        ],
        ...flexLogoMutations
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.STACKED.WHITE,
                headline: 'legacy-xsmall',
                subHeadline: 'legacy-large',
                disclaimer: 'legacy-medium'
            }
        ],
        ['size:1000x36', { logo: Logo.STACKED.COLOR }],
        ['size:120x90', { logo: false }],
        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
        ['size:170x100', { logo: false, headline: 'legacy-xsmall' }]
    ]
};
