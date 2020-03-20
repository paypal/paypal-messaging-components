import Logo from '../logos';
import { altContentMediaQuery } from './mediaQueries';

const defaultTextStyles = [
    '.message__headline > span:first-of-type { text-decoration: underline; color: #0076ff; font-weight: 600; }',
    '.message__disclaimer > span { color: #2c2e2f; text-decoration: none; }'
];

export default {
    'layout:text': [
        [
            'default',
            {
                styles: defaultTextStyles,
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'small',
                    br: ['APR']
                },
                disclaimer: 'xsmall.2'
            }
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                messageWidth: textSize * 16
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                logo: Logo.ALT_NO_PP.COLOR,
                styles: [...defaultTextStyles, `.message__logo { width: ${textSize * 7}px }`]
            })
        ],
        ['logo.type:none', { logo: false }],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    ...defaultTextStyles,
                    altContentMediaQuery(textSize * 35.8),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                messageWidth: [textSize * 15, 1000],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: {
                    replace: [['APR', 'APR.']],
                    br: ['APR.']
                }
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [...defaultTextStyles, `.message__logo-container { width: ${textSize * 9}px }`]
            })
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
                headline: { br: ['over', 'at', 'APR'] }
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
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: 'legacy-small',
                disclaimer: 'legacy-large'
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
                disclaimer: 'legacy-medium',
                styles: ['.message__disclaimer { font-size: 9px }', '.message__messaging { padding-top: 5px }']
            }
        ],
        [
            'size:250x250',
            {
                disclaimer: 'legacy-medium',
                styles: ['.message__disclaimer { font-size: 10px }', '.message__headline { margin-bottom: 20px }']
            }
        ],
        [
            'size:300x50',
            { styles: ['.message__headline { font-size: 13px }', '.message__disclaimer { font-size: 11px }'] }
        ],
        [
            'size:340x60',
            {
                disclaimer: 'legacy-medium',
                styles: ['.message__headline { font-size: 13px }', '.message__messaging { padding: 7px 0 }']
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
