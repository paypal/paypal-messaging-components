import Logo from '../logos';

export default {
    'layout:text': [
        [
            'default',
            {
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'small',
                    br: ['/mo']
                },
                disclaimer: 'xsmall'
            }
        ],
        ['logo.type:primary', { messageWidth: [190, 240] }],
        [
            'logo.type:inline',
            {
                messageWidth: [260, 1000],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: {
                    br: ['APR']
                }
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [260, 1000],
                logo: false,
                headline: {
                    br: ['APR']
                }
            }
        ],
        ['logo.type:alternative', { logo: Logo.ALTERNATIVE.COLOR }],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'small', br: [' of', 'at'] },
                subHeadline: 'small',
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['payments', 'mo'] },
                subHeadline: { tag: 'small', br: ['money'] }
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [
                    '@media (min-aspect-ratio: 200/11) and (max-width: 475px) { .message__headline { font-size: 0.75rem; } }'
                ]
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: 'legacy-small',
                subHeadline: 'legacy-xlarge',
                disclaimer: 'legacy-medium'
            }
        ],
        ['size:1000x36', { logo: Logo.PRIMARY.COLOR }],
        ['size:120x90', { logo: false, headline: 'legacy-xsmall' }],
        ['size:234x60', { headline: 'legacy-xsmall', disclaimer: 'legacy-medium.2' }],
        ['size:250x250', { headline: 'legacy-small.2', disclaimer: 'legacy-medium.2' }],
        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
        ['size:728x90', { headline: 'legacy-xsmall' }],
        ['size:170x100', { logo: false, headline: 'legacy-xsmall' }]
    ]
};
