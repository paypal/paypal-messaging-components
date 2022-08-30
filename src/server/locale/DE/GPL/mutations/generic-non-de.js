import Logo from '../../../../message/logos';
import {
    textWrap,
    messageLogoWidth,
    altNoWrap,
    setLogoTop,
    xSmallNoWrap,
    primaryWrap
} from '../../../../message/mediaQueries';
import { crossBorderDisclaimerWrap, crossBorderLogoNoneWrap } from './mediaQueries';
import { flexLogoMutations, textLogoMutations } from '../../../../message/logoMutations';

const headlineBreaks = [
    {
        sizes: ['xsmall'],
        breaks: ['kaufen,']
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
                }
            ],
            disclaimer: ['extra', 'default']
        }
    ],
    [
        'ratio:8x1',
        {
            headline: [...headlineBreaks],
            styles: [`@media (min-aspect-ratio: 60/11) {.message__headline span.tag--xsmall {display: inline}};`]
        }
    ],
    [
        'ratio:1x1',
        {
            headline: [...headlineBreaks]
        }
    ],
    [
        'ratio:1x4',
        {
            headline: [...headlineBreaks],
            styles: [`.message__headline .tag--xsmall { display: inline;}`]
        }
    ],
    [
        'ratio:20x1',
        {
            headline: [...headlineBreaks],
            styles: [`@media (min-aspect-ratio: 60/11) {.message__headline span.tag--xsmall {display: inline}};`]
        }
    ],
    ...flexLogoMutations
];
export default {
    'layout:flex': flex,
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 39, textSize, 'DE'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25),
                    setLogoTop(textSize * 20),
                    xSmallNoWrap(textSize * 7.7),
                    primaryWrap(textSize * 12.4),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15)
                ],
                logo: Logo.PP_PAYPAL.COLOR,
                headline: [{ tag: 'xsmall', br: [','] }],
                disclaimer: ['extra', 'default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    setLogoTop(textSize * 39),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
                    `@media screen and 
                    (max-width: ${textSize * 29}px) {
                        .message__headline > .tag--medium > span > span.br:nth-child(2) {white-space: nowrap;}
                    }`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25),
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
                    `@media screen and 
                    (max-width: ${textSize * 29}px) {
                        .message__headline > .tag--medium > span > span.br:nth-child(2) {white-space: nowrap;}
                    }`
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    crossBorderDisclaimerWrap(textSize * 21.4, textSize * 30.4, textSize * 21.4, textSize * 15),
                    textWrap(textSize * 39, textSize, 'DE'),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25),
                    xSmallNoWrap(textSize * 8),
                    altNoWrap(textSize * 15.5)
                ],
                headline: [{ tag: 'xsmall', br: ['später'] }],
                logo: Logo.PP_PAYPAL.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    crossBorderLogoNoneWrap(textSize * 14),
                    `.message__disclaimer > span.multi:first-of-type { white-space: normal;}`,
                    `.message__headline .tag--xsmall > span { white-space: nowrap }`,
                    `margin-top: 0px;`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['bezahlen.', 'bezahlen']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo-container::after { content: '.'; }`,
                    `.message__disclaimer { white-space: normal; }`,
                    `.message__headline .tag--xsmall > span { white-space: nowrap }`
                ],
                logo: Logo.NO_PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['bezahlen.', 'bezahlen']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ]
};
