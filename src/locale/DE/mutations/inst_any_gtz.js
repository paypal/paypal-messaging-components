import Logo from '../logos';

export default {
    'layout:text': [
        [
            'default',
            {
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'default'
                },
                disclaimer: 'default'
            }
        ],
        ['logo.type:primary', { messageWidth: [205, 1000] }],
        [
            'logo.type:inline',
            {
                messageWidth: [210, 1000],
                logo: Logo.ALT_NO_PP.COLOR
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [185, 1000],
                logo: false
            }
        ],
        [
            'logo.type:alternative',
            {
                styles: [
                    '.message__content { display: inline-block; }',
                    '.message__messaging, .message__headline span:only-child { white-space: normal }'
                ],
                messageWidth: [205, 1000],
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
            'ratio:8x1',
            {
                styles: [
                    '@media (max-aspect-ratio: 61/10) { .locale--DE .message__logo-container { margin-bottom: 2.5vw } }'
                ]
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [
                    '@media (max-aspect-ratio: 61/10) { .locale--DE .message__logo-container { margin-bottom: 2.5vw } }'
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
