import Logo from '../logos';
import { basicMediaQuery, altContentMediaQuery, messageDisclaimerMediaQuery } from './mediaQueries';

export const legacyNI = [
    [
        'default',
        {
            logo: Logo.PRIMARY.COLOR,
            headline: 'medium',
            subHeadline: 'small',
            disclaimer: 'legacy-medium'
        }
    ],
    [
        'size:1000x36',
        {
            styles: ['.message__sub-headline { color: #009cde }', '.message__headline { display: block }']
        }
    ],
    ['size:234x100', { logo: Logo.PRIMARY.WHITE }],
    ['size:310x100', { logo: Logo.PRIMARY.WHITE }],
    [
        'size:340x60',
        {
            logo: Logo.PRIMARY.WHITE,
            styles: ['.message { max-width: 100% }']
        }
    ]
];

export const flex = [
    [
        'default',
        {
            logo: Logo.PRIMARY.WHITE,
            headline: ['xsmall', { tag: 'medium', br: ['months'] }],
            disclaimer: 'xsmall'
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
            disclaimer: ['xlarge', 'xsmall']
        }
    ],
    ['color:gray', { logo: Logo.PRIMARY.COLOR }],
    ['color:white', { logo: Logo.PRIMARY.COLOR }],
    ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
];

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => {
                const breakpointCalc = textSize * 19 + 70;
                return {
                    styles: [messageDisclaimerMediaQuery(breakpointCalc - 1), [basicMediaQuery(breakpointCalc)]],
                    logo: Logo.PRIMARY.COLOR,
                    headline: [
                        { tag: 'xsmall', br: ['time.'] },
                        { tag: 'medium', br: ['months'] }
                    ],
                    disclaimer: 'xsmall'
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
                styles: [basicMediaQuery(textSize * 15 + 80), `.message__logo { width: ${textSize * 7}px }`],
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
                styles: [basicMediaQuery(textSize * 20)],
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
            ({ textSize }) => ({
                styles: [
                    basicMediaQuery(textSize * 18),
                    altContentMediaQuery(textSize * 42),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => {
                const breakpointCalc = textSize * 19;
                return { styles: [messageDisclaimerMediaQuery(breakpointCalc - 1), basicMediaQuery(breakpointCalc)] };
            }
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [basicMediaQuery(textSize * 18.5), `.message__logo-container { width: ${textSize * 8}px }`]
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],

    'layout:flex': flex,
    'layout:legacy': legacyNI
};
