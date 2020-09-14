import Logo from '../logos';
import { altContentMediaQuery, primaryContentMediaQuery } from './mediaQueries';
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
                    `
                    @media (max-width: ${textSize * 17}px) {
                        .message__messaging { display: block; }
                    }
                    `
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
                    `
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 7}px }`],
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
            {
                messageWidth: false,
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
                    altContentMediaQuery(textSize * 34.3),
                    `.message__logo-container { width: ${textSize * 5}px }`
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR,
                messageWidth: [textSize * 10, 1000]
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
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.STACKED.WHITE,
                headline: 'legacy-small',
                subHeadline: 'legacy-xlarge',
                disclaimer: 'legacy-medium'
            }
        ],
        ['size:1000x36', { logo: Logo.STACKED.COLOR }],
        ['size:120x90', { logo: false, headline: 'legacy-xsmall' }],
        ['size:234x60', { headline: 'legacy-xsmall', disclaimer: 'legacy-medium.2' }],
        ['size:250x250', { headline: 'legacy-small.2', disclaimer: 'legacy-medium.2' }],
        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
        ['size:728x90', { headline: 'legacy-xsmall' }],
        ['size:170x100', { logo: false, headline: 'legacy-xsmall' }]
    ]
};
