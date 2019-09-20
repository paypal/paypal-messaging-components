import Logo from '../logos';

export default {
    'layout:text': [
        [
            'default',
            {
                logo: Logo.PRIMARY.COLOR,
                headline: 'default',
                disclaimer: 'default'
            }
        ],
        [
            'logo.type:primary',
            {
                headline: {
                    tag: 'default',
                    replace: [['Jahreszins', 'Jahreszins.']]
                },
                messageWidth: [190, 1000]
            }
        ],
        [
            'logo.type:inline',
            {
                messageWidth: [290, 1000],
                logo: Logo.ALT_NO_PP.COLOR
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [265, 1000],
                logo: false
            }
        ],
        [
            'logo.type:alternative',
            {
                headline: {
                    tag: 'default',
                    replace: [['Jahreszins', 'Jahreszins.']]
                },
                styles: [
                    '.message__content { display: inline-block; }',
                    '.message__messaging, .message__headline span:only-child { white-space: normal }'
                ],
                messageWidth: [190, 1000],
                logo: Logo.ALTERNATIVE.COLOR
            }
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
                headline: 'small',
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x1',
            {
                logo: [Logo.PRIMARY.WHITE, Logo.ALTERNATIVE.WHITE]
            }
        ],
        [
            'ratio:20x1',
            {
                headline: ['xsmall', 'small']
            }
        ],
        [
            'ratio:8x1',
            {
                headline: ['xsmall', 'small'],
                styles: [
                    `@media (min-aspect-ratio: 80/11) and (min-width: 500px) { 
                        .message__headline { font-size: 2.3vw; display: block; }
                        .message__disclaimer { margin-top: .5rem; }
                        .message__logo-container { margin-bottom: 1vw }
                        .message__headline { margin-bottom: 1vw }
                    }`
                ]
            }
        ],
        [
            'ratio:1x4',
            {
                logo: Logo.ALTERNATIVE.WHITE
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }],
        [
            'ratio:1x1 && color:gray',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white-no-border',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ]
    ]
};
