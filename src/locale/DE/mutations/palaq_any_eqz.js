import Logo from '../logos';

const disclaimerStyles = [
    '.message__disclaimer > span { text-decoration: none; color: #2c2e2f }',
    '.message__disclaimer > .multi.tag--default:first-of-type { text-decoration: underline; color: #0076ff }',
    '.message__disclaimer > .multi.tag--extra { display: block; white-space: normal; margin-top: .5rem }'
];

export default {
    'layout:text': [
        [
            'default',
            {
                styles: [...disclaimerStyles],
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'default'
                },
                disclaimer: ['default', 'extra'],
                messageWidth: [265, 1000]
            }
        ],
        [
            'logo.type:inline',
            {
                logo: Logo.ALT_NO_PP.COLOR
            }
        ],
        [
            'logo.type:none',
            {
                logo: false
            }
        ],
        [
            'logo.type:alternative',
            {
                styles: [
                    '.message__messaging, .message__headline span:only-child { white-space: normal }',
                    ...disclaimerStyles
                ],
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
                disclaimer: ['extra', 'xsmall']
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ]
};
