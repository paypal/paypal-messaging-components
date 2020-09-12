import Logo from '../logos';
import { flexLogoMutations } from './common';

export default {
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'small', br: [' of', 'at'] },
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['payments', 'mo'] }
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
        ...flexLogoMutations
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
