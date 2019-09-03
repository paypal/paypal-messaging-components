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
        ['logo.type:primary', { messageWidth: [195, 1000] }],
        [
            'logo.type:inline',
            {
                messageWidth: [250, 1000],
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
                styles: [
                    '.message__content { display: inline-block; }',
                    '.message__messaging, .message__headline span:only-child { white-space: normal }'
                ],
                messageWidth: [195, 1000],
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
            'ratio:20x1',
            {
                styles: [
                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.7rem; } }'
                ]
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ]
};
