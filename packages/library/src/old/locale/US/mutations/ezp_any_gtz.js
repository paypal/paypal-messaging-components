import Logo from '../logos';
import { altContentMediaQuery } from './mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

const defaultTextStyles = [
    '.message__headline > span:not(:nth-of-type(2)) { text-decoration: underline; color: #0076ff; font-weight: 600; }',
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
                    tag: 'xsmall',
                    br: ['months']
                },
                disclaimer: 'xsmall.2'
            }
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                messageWidth: textSize * 11
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.ALT_NO_PP.COLOR
            })
        ],
        ['logo.type:none', { logo: false }],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    altContentMediaQuery(textSize * 30.6),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: {
                    replace: [['months', 'months.']],
                    br: ['months.']
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
                headline: { tag: 'xsmall', br: ['months'] },
                disclaimer: ['xsmall.2', 'xsmall']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['over', 'months'] }
            }
        ],
        ...flexLogoMutations
    ]
};
