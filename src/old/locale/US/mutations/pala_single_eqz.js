import Logo from '../logos';
import { altContentMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.PRIMARY.COLOR,
                messageWidth: [textSize * 17, textSize * 21],
                headline: {
                    tag: 'small',
                    br: ['/mo']
                },
                disclaimer: 'xsmall'
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 7}px }`],
                messageWidth: false,
                logo: Logo.ALT_NO_PP.COLOR,
                headline: {
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
                    br: ['APR']
                }
            }
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    altContentMediaQuery(textSize * 34.3),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR,
                messageWidth: [textSize * 10, 1000]
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
