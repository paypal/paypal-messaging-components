import Logo from '../logos';
import { basicMediaQuery, legacyNI, textSize } from './ni';

export default {
    'layout:text': [
        [
            'default',
            style => ({
                styles: [basicMediaQuery(textSize(style) * 20.5 + 70)],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }
                ],
                disclaimer: ['extra', 'xsmall']
            })
        ],
        [
            'logo.type:inline',
            style => ({
                styles: [basicMediaQuery(textSize(style) * 23)],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                    { tag: 'medium', br: ['purchases'] }
                ]
            })
        ],
        [
            'logo.type:none',
            style => ({
                styles: [basicMediaQuery(textSize(style) * 21)],
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
            })
        ],
        [
            'logo.type:alternative',
            style => ({
                styles: [
                    basicMediaQuery(textSize(style) * 36 + 130),
                    `.message__logo-container { width: ${Math.min(120, textSize(style) * 10)}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: ['xsmall', { tag: 'medium', br: ['months'], replace: [['99+', '99+.']] }]
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            style => ({
                styles: [
                    basicMediaQuery(textSize(style) * 20),
                    `.message__logo-container { width: ${Math.min(120, textSize(style) * 10)}px }`
                ],
                headline: ['xsmall', { tag: 'medium', br: ['months'] }]
            })
        ],
        ['logo.type:primary && logo.position:top', style => ({ styles: [basicMediaQuery(textSize(style) * 20)] })],
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
                headline: ['xsmall', 'medium'],
                styles: ['@media (min-width: 150px) { .message__headline { font-size: 8vw } }']
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
