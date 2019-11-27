import Logo from '../logos';
import { basicMediaQuery, legacyNI } from './ni';

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
                headline: ['xsmall', { tag: 'medium' }],
                disclaimer: 'xsmall'
            }
        ],
        ['logo.type:primary', { messageWidth: [130, 320] }],
        [
            'logo.type:inline',
            {
                messageWidth: [200, 1000],
                styles: [basicMediaQuery(210)],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']] },
                    { tag: 'medium', replace: [['months.', 'months']] }
                ]
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [180, 1000],
                styles: [basicMediaQuery(210)],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        replace: [['months.', 'months']]
                    }
                ]
            }
        ],
        [
            'logo.type:alternative',
            {
                styles: [basicMediaQuery(520)],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: ['xsmall', { tag: 'medium' }]
            }
        ],
        ['logo.type:primary && logo.position:top', { styles: [basicMediaQuery(210)] }],
        ['logo.type:primary && logo.position:right', { styles: [basicMediaQuery(230)] }],
        ['logo.type:primary && logo.position:left', { styles: [basicMediaQuery(230)] }],
        ['logo.type:alternative && logo.position:top', { styles: [basicMediaQuery(200)] }],
        ['logo.type:alternative && logo.position:right', { styles: [basicMediaQuery(400)] }],
        ['logo.type:alternative && logo.position:left', { styles: [basicMediaQuery(400)] }],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: ['xsmall', { tag: 'medium.2' }],
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x1',
            {
                headline: ['xsmall', 'medium.2'],
                styles: ['@media (min-width: 150px) { .message__headline { font-size: 8vw } }']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { tag: 'medium.2' },
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
