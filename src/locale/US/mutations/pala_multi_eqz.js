import Logo from '../logos';
import { flexLogoMutations } from './common';

export default {
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'medium', br: ['low as', 'at'] },
                disclaimer: 'small'
            }
        ],
        ...flexLogoMutations
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: 'legacy-medium',
                subHeadline: 'legacy-large',
                disclaimer: 'legacy-small'
            }
        ],
        ['size:1000x36', { logo: Logo.PRIMARY.COLOR, disclaimer: 'legacy-medium' }],
        ['size:120x90', { logo: false, headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:234x60', { headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:300x50', { disclaimer: 'legacy-medium' }],
        ['size:468x60', { disclaimer: 'legacy-medium' }],
        [
            'size:250x250',
            {
                headline: 'legacy-large'
            }
        ],
        ['size:728x90', { headline: 'legacy-small', disclaimer: 'legacy-medium' }],
        ['size:540x200', { disclaimer: 'legacy-medium' }],
        ['size:170x100', { logo: false, headline: 'legacy-small', disclaimer: 'legacy-medium' }]
    ]
};
