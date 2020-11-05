import Logo from '../logos';
import { altContentMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

const defaultTextStyles = [
    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
];

export default {
    'layout:text': [
        [
            'default',
            {
                styles: defaultTextStyles,
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'small',
                    br: ['APR']
                },
                disclaimer: 'xsmall.2'
            }
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                messageWidth: textSize * 16
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                logo: Logo.ALT_NO_PP.COLOR,
                styles: [...defaultTextStyles, `.message__logo { width: ${textSize * 7}px }`]
            })
        ],
        ['logo.type:none', { logo: false }],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    altContentMediaQuery(textSize * 35.8),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                messageWidth: [textSize * 15, 1000],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: {
                    replace: [['APR', 'APR.']],
                    br: ['APR.']
                }
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo-container { width: ${textSize * 9}px }`]
            })
        ],
        [
            'text.color:white',
            {
                styles: [
                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                ]
            }
        ],
        ...textLogoMutations
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'small', br: ['months', 'APR'] },
                disclaimer: ['xsmall.2', 'xsmall']
            }
        ],

        [
            'ratio:1x4',
            {
                headline: { br: ['over', 'at', 'APR'] }
            }
        ],

        [
            'ratio:20x1',
            {
                styles: [
                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.7rem; } }'
                ]
            }
        ],
        ...flexLogoMutations
    ]
};
