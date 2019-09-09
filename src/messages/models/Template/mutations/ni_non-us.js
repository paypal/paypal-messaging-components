import Logo from '../logos';
import { basicMediaQuery, legacyNI } from './ni';

export default {
    'layout:text': [
        [
            'default',
            {
                styles: [basicMediaQuery(320)],
                logo: Logo.PRIMARY.COLOR,
                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }],
                disclaimer: ['extra', 'xsmall']
            }
        ],
        ['logo.type:primary', { messageWidth: [130, 320] }],
        [
            'logo.type:inline',
            {
                messageWidth: [240, 1000],
                styles: [basicMediaQuery(290)],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                    { tag: 'medium', br: ['purchases'] }
                ]
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [220, 1000],
                styles: [basicMediaQuery(290)],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        br: ['purchases']
                    }
                ]
            }
        ],
        [
            'logo.type:alternative',
            {
                styles: [basicMediaQuery(570)],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }]
            }
        ],
        [
            'logo.type:alternative && logo.position:top',
            {
                styles: [basicMediaQuery(230)],
                messageWidth: [150, 320],
                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
            }
        ],
        ['logo.type:primary && logo.position:top', { styles: [basicMediaQuery(235)] }],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                disclaimer: ['extra.2', 'small']
            }
        ],
        [
            'ratio:1x1',
            {
                headline: ['xsmall', 'medium']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { tag: 'medium', br: ['months'] },
                styles: [
                    '.message__logo-container { margin-bottom: 30%; }',
                    '.message__disclaimer span.multi:nth-of-type(1) { display: none; }',
                    '.message__headline { font-size: 1.1rem }'
                ],
                disclaimer: ['xlarge', 'extra.2', 'small']
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ],

    'layout:legacy': legacyNI
};
