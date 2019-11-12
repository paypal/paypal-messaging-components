import Logo from '../logos';
import { objectGet } from '../../../../utils';

export function basicMediaQuery(breakpoint) {
    return `
    .message__headline span.multi:nth-child(2) {
        display: none;
    }

    @media (min-width: ${breakpoint}px) {
        .message__headline span.multi:first-child {
            display: none;
        }

        .message__headline span.multi:nth-child(2) {
            display: inline;
        }
    }
`;
}

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

export const textSize = style => objectGet(style, 'text.size');

export default {
    'layout:text': [
        [
            'default',
            style => ({
                styles: [basicMediaQuery(textSize(style) * 18.5 + 70)],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['months'] }
                ],
                disclaimer: 'xsmall'
            })
        ],
        [
            'logo.type:inline',
            style => ({
                styles: [
                    basicMediaQuery(textSize(style) * 15 + 80),
                    `.message__logo { width: ${textSize(style) * 7}px }`
                ],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                    { tag: 'medium', br: ['purchases'] }
                ]
            })
        ],
        [
            'logo.type:none',
            style => ({
                styles: [basicMediaQuery(textSize(style) * 20)],
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
            style => ({
                styles: [
                    basicMediaQuery(textSize(style) * 34 + 130),
                    `.message__logo-container { width: ${textSize(style) * 8}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR
            })
        ],
        ['logo.type:primary && logo.position:top', style => ({ styles: [basicMediaQuery(textSize(style) * 18.5)] })],
        [
            'logo.type:alternative && logo.position:top',
            style => ({
                styles: [
                    basicMediaQuery(textSize(style) * 18.5),
                    `.message__logo-container { width: ${textSize(style) * 8}px }`
                ]
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],

    'layout:flex': [
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
                    '.message__headline { font-size: 1.1rem }'
                ],
                disclaimer: ['xlarge', 'xsmall']
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ],

    'layout:legacy': legacyNI
};
