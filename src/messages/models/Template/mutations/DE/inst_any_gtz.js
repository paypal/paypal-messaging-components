import Logo from '../../logos';

export default {
    'layout:text': [
        [
            'default',
            {
                styles: [
                    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'small',
                    br: ['months', 'APR']
                },
                disclaimer: 'xsmall.2'
            }
        ],
        ['logo.type:primary', { messageWidth: 190 }],
        [
            'logo.type:inline',
            {
                messageWidth: [255, 1000],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: {
                    br: ['APR']
                }
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [240, 1000],
                logo: false,
                headline: {
                    br: ['APR']
                }
            }
        ],
        [
            'logo.type:alternative',
            {
                logo: Logo.ALTERNATIVE.COLOR,
                headline: {
                    replace: [['APR', 'APR.']],
                    br: ['APR.']
                }
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
