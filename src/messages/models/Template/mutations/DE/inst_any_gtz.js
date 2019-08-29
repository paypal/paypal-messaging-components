import Logo from './logos';

export default {
    'layout:text': [
        [
            'default',
            {
                styles: ['.message__content { display: inline-block; }'],
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
                styles: [".message__logo-container::before { content: 'mit ' }"],
                messageWidth: [175, 1000],
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
        [
            'text.color:white',
            {
                styles: [
                    '.message__headline > span:first-of-type { text-decoration: underline; color: white; font-weight: 600; }',
                    '.message__disclaimer > span { color: white; text-decoration: none; }'
                ]
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
                headline: { tag: 'small', br: ['months', 'APR'] },
                disclaimer: ['xsmall.2', 'xsmall']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['over', 'at', 'APR'] },
                subHeadline: 'small'
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
