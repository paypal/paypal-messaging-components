import Logo from '../logos';
import { flexLogoMutations } from './common';

export const legacyNI = [
    [
        'default',
        {
            logo: Logo.PRIMARY.COLOR,
            headline: 'medium',
            subHeadline: 'small',
            disclaimer: 'legacy-medium'
        }
    ],
    [
        'size:1000x36',
        {
            styles: ['.message__sub-headline { color: #009cde }', '.message__headline { display: block }']
        }
    ],
    ['size:234x100', { logo: Logo.PRIMARY.WHITE }],
    ['size:310x100', { logo: Logo.PRIMARY.WHITE }],
    [
        'size:340x60',
        {
            logo: Logo.PRIMARY.WHITE,
            styles: ['.message { max-width: 100% }']
        }
    ]
];

export const flex = [
    [
        'default',
        {
            logo: Logo.PRIMARY.WHITE,
            headline: ['xsmall', { tag: 'medium', br: ['months'] }],
            disclaimer: 'xsmall'
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
                '@media (max-aspect-ratio: 11/40) { .message__disclaimer span.multi:nth-of-type(1) { display: block; } }',
                '.message__headline { font-size: 1.1rem }'
            ],
            disclaimer: ['xlarge', 'xsmall']
        }
    ],
    ...flexLogoMutations
];

export default {
    'layout:flex': flex,
    'layout:legacy': legacyNI
};
