import Logo from '../logos';
import { basicMediaQuery, altContentMediaQuery, messageDisclaimerMediaQuery } from './mediaQueries';
import { legacyNI } from './ni';
import { textLogoMutations, flexLogoMutations } from './common';

export const flex = [
    [
        'default',
        {
            logo: Logo.PRIMARY.WHITE,
            headline: ['xsmall', { tag: 'medium', br: ['months'] }],
            disclaimer: ['extra.2', 'small']
        }
    ],
    [
        'ratio:1x1',
        {
            headline: ['xsmall', 'medium'],
            styles: ['@media (min-width: 150px) { .message__headline { font-size: 8vw } }']
        }
    ],
    [
        'ratio:1x4',
        {
            headline: { tag: 'medium', br: ['months'] },
            styles: [
                '.message__logo-container { margin-bottom: 30%; }',
                '.message__disclaimer span.multi:nth-of-type(1) { display: none; }',
                '@media (max-aspect-ratio: 11/40) { .message__disclaimer span.multi:nth-of-type(1) { display: block; } }',
                '.message__headline { font-size: 1.1rem }'
            ],
            disclaimer: ['xlarge', 'extra.2', 'small']
        }
    ],
    ...flexLogoMutations
];
export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => {
                const breakpointCalc = textSize * 22 + 70;
                return {
                    styles: [messageDisclaimerMediaQuery(breakpointCalc - 1), basicMediaQuery(breakpointCalc)],
                    logo: Logo.PRIMARY.COLOR,
                    headline: [
                        { tag: 'xsmall', br: ['time.'] },
                        { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }
                    ],
                    disclaimer: ['extra', 'xsmall']
                };
            }
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                messageWidth: [textSize * 13, textSize * 27]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [basicMediaQuery(textSize * 23), `.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                    { tag: 'medium', br: ['purchases'] }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [basicMediaQuery(textSize * 21)],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        br: ['purchases']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => {
                const breakpointCalc = textSize * 20;
                return {
                    styles: [
                        messageDisclaimerMediaQuery(breakpointCalc - 1),
                        basicMediaQuery(breakpointCalc),
                        altContentMediaQuery(textSize * 45),
                        `.message__logo-container { width: ${textSize * 9}px }`
                    ],
                    logo: Logo.ALTERNATIVE.COLOR,
                    headline: [
                        'xsmall',
                        {
                            tag: 'medium',
                            br: ['months'],
                            replace: [['99+', '99+.']]
                        }
                    ]
                };
            }
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [basicMediaQuery(textSize * 20), `.message__logo-container { width: ${textSize * 8}px }`],
                headline: [
                    'xsmall',
                    {
                        tag: 'medium',
                        br: ['months']
                    }
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => {
                const breakpointCalc = textSize * 21;
                return { styles: [messageDisclaimerMediaQuery(breakpointCalc - 1), basicMediaQuery(breakpointCalc)] };
            }
        ],
        ...textLogoMutations
    ],

    'layout:flex': flex,
    'layout:legacy': legacyNI
};
