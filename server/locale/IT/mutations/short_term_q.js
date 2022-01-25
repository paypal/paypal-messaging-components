import { flexLogoMutations } from '../../../message/logoMutations';
import Logo from '../../../message/logos';
import { logo20x1 } from '../../../message/mediaQueries';

const headlineBreaks = [
    {
        sizes: ['xsmall']
    },
    {
        sizes: ['medium'],
        breaks: ['da']
    }
].reduce((acc, item) => {
    const { sizes, breaks } = item;
    sizes.forEach(size => {
        acc.push({
            tag: size,
            br: breaks
        });
    });
    return acc;
}, []);

const flex = [
    [
        'default',
        {
            logo: Logo.PP_PAYPAL.WHITE,
            headline: [
                {
                    tag: 'xsmall'
                },
                {
                    tag: 'medium'
                }
            ],
            disclaimer: ['default'],
            styles: []
        }
    ],
    [
        'ratio:20x1',
        {
            headline: [...headlineBreaks],
            styles: [logo20x1()]
        }
    ],
    [
        'ratio:8x1',
        {
            headline: [...headlineBreaks]
        }
    ],
    ...flexLogoMutations
];
export default {
    'layout:flex': flex
};
