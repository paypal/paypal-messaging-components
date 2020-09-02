import Logo from '../logos';
import { altContentMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.PRIMARY.COLOR,
                messageWidth: [textSize * 11, textSize * 18],
                headline: {
                    tag: 'small',
                    br: ['/mo']
                },
                disclaimer: 'small'
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
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
                    altContentMediaQuery(textSize * 29.1),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                messageWidth: false,
                logo: Logo.ALTERNATIVE.COLOR
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 9}px }`]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'medium', br: ['low as', 'at'] },
                disclaimer: 'small'
            }
        ],
        ...flexLogoMutations
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: 'legacy-medium',
                subHeadline: 'legacy-large',
                disclaimer: 'legacy-small'
            }
        ],
        ['size:1000x36', { logo: Logo.PRIMARY.COLOR, disclaimer: 'legacy-medium' }],
        ['size:120x90', { logo: false, headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:234x60', { headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:300x50', { disclaimer: 'legacy-medium' }],
        ['size:468x60', { disclaimer: 'legacy-medium' }],
        [
            'size:250x250',
            {
                headline: 'legacy-large'
            }
        ],
        ['size:728x90', { headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:540x200', { disclaimer: 'legacy-medium' }],
        ['size:170x100', { logo: false, headline: 'legacy-small', disclaimer: 'legacy-medium' }]
    ]
};
