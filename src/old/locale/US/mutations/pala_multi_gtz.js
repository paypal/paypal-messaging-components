import Logo from '../logos';
import { altContentMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.PRIMARY.COLOR,
                messageWidth: [textSize * 11, textSize * 12],
                headline: { tag: 'xsmall' },
                disclaimer: 'xsmall'
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
                messageWidth: false,
                headline: {
                    br: ['/mo']
                }
            })
        ],
        [
            'logo.type:none',
            {
                logo: false,
                messageWidth: false,
                headline: {
                    br: ['/mo']
                }
            }
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    altContentMediaQuery(textSize * 23.8),
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
                headline: { tag: 'small', br: ['low as'] },
                disclaimer: 'xsmall'
            }
        ],
        ...flexLogoMutations
    ]
};
