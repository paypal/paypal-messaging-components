import Logo from '../logos';

export default {
    'layout:text': [
        [
            'default',
            {
                styles: [
                    '.message__headline > span:not(:nth-of-type(2)) { text-decoration: underline; color: #0076ff; font-weight: 600; }',
                    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'xsmall',
                    br: ['months']
                },
                disclaimer: 'xsmall.2'
            }
        ],
        ['logo.type:primary', { messageWidth: 130 }],
        [
            'logo.type:inline',
            {
                messageWidth: [250, 1000],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: {
                    br: ['months']
                }
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [235, 1000],
                logo: false,
                headline: {
                    br: ['months']
                }
            }
        ],
        [
            'logo.type:alternative',
            {
                logo: Logo.ALTERNATIVE.COLOR,
                headline: {
                    replace: [['months', 'months.']],
                    br: ['months.']
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
                headline: { tag: 'small', br: ['over'] },
                subHeadline: 'small',
                disclaimer: ['xsmall.2', 'xsmall']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['over', 'months'] },
                subHeadline: { tag: 'xsmall', br: ['money'] }
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
                disclaimer: 'legacy-medium'
            }
        ],
        ['size:1000x36', { logo: Logo.PRIMARY.COLOR }],
        [
            'size:120x90',
            {
                logo: false,
                styles: ['.message__disclaimer { line-height: 12px }', '.message__headline { font-size: 12px }']
            }
        ],
        [
            'size:234x60',
            {
                disclaimer: 'legacy-medium.2',
                styles: ['.message__disclaimer { font-size: 9px }', '.message__messaging { padding-top: 5px }']
            }
        ],
        [
            'size:250x250',
            {
                styles: ['.message__disclaimer { font-size: 10px }', '.message__headline { margin-bottom: 20px }'],
                disclaimer: 'legacy-medium.2'
            }
        ],
        [
            'size:300x50',
            { styles: ['.message__headline { font-size: 13px }', '.message__disclaimer { font-size: 11px }'] }
        ],
        [
            'size:340x60',
            {
                styles: ['.message__headline { font-size: 13px }', '.message__messaging { padding: 7px 0 }'],
                disclaimer: 'legacy-medium.2'
            }
        ],
        [
            'size:468x60',
            {
                styles: [
                    '.message__headline { font-size: 14px; margin-bottom: 5px }',
                    '.message__disclaimer { font-size: 10px }',
                    '.message__messaging { padding: 14px 0 }'
                ]
            }
        ],
        [
            'size:728x90',
            {
                styles: [
                    '.message__headline { font-size: 20px }',
                    '.message__disclaimer { font-size: 11px }',
                    '.message__messaging { padding: 23px 0 }'
                ]
            }
        ],
        [
            'size:540x200',
            {
                subHeadline: 'legacy-medium',
                disclaimer: 'legacy-medium.2',
                styles: ['.message__headline { padding-right: 40px; }']
            }
        ],
        [
            'size:170x100',
            {
                logo: false,
                styles: [
                    '.message__disclaimer { font-size: 9px; }',
                    '.message__headline { font-size: 15px; line-height: 1.2em; }'
                ]
            }
        ]
    ]
};
