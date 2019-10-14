import Logo from '../logos';

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

export default {
    'layout:text': [
        [
            'default',
            {
                styles: [
                    basicMediaQuery(290),
                    '.message__messaging { flex: 1 1 auto; }',
                    '@media (max-width: 289px) { .message__disclaimer { display: block; } }'
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                disclaimer: 'xsmall'
            }
        ],
        ['logo.type:primary', { messageWidth: [130, 320] }],
        [
            'logo.type:inline',
            {
                messageWidth: [200, 1000],
                styles: [basicMediaQuery(280)],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']] },
                    { tag: 'medium', br: ['purchases'], replace: [['99+.', '99+']] }
                ]
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [180, 1000],
                styles: [basicMediaQuery(280)],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        br: ['purchases'],
                        replace: [['99+.', '99+']]
                    }
                ]
            }
        ],
        [
            'logo.type:alternative',
            {
                styles: [basicMediaQuery(520)],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
            }
        ],
        ['logo.type:primary && logo.position:top', { styles: [basicMediaQuery(210)] }],
        ['logo.type:alternative && logo.position:top', { styles: [basicMediaQuery(210)] }],
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
