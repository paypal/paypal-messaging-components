import Logo from '../logos';
import { altLogoMediaQuery } from './mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            {
                logo: Logo.PRIMARY.COLOR,
                headline: 'default',
                disclaimer: 'default'
            }
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 12}px }`],
                messageWidth: [textSize * 20, 1000],
                logo: Logo.ALTERNATIVE.COLOR,
                headline: {
                    tag: 'default',
                    replace: [['Jahreszins', 'Jahreszins.']]
                }
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                logo: Logo.ALT_NO_PP.COLOR,
                messageWidth: [textSize * 25, 1000],
                styles: [`.message__logo { width: ${textSize * 13}px }`]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                logo: false,
                messageWidth: [textSize * 23, 1000]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    altLogoMediaQuery(textSize * 55.8, textSize),
                    `.message__logo-container { width: ${textSize * 10}px }`,
                    `.message__content { display: inline-block; }`,
                    `.message__messaging, .message__headline span:only-child { white-space: normal }`
                ],
                logo: Logo.ALTERNATIVE.COLOR,
                messageWidth: [textSize * 20, 1000],
                headline: {
                    tag: 'default',
                    replace: [['Jahreszins', 'Jahreszins.']]
                }
            })
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
                headline: 'small',
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x1',
            {
                logo: [Logo.PRIMARY.WHITE, Logo.ALTERNATIVE.WHITE]
            }
        ],
        [
            'ratio:20x1',
            {
                headline: ['xsmall', 'small']
            }
        ],
        [
            'ratio:8x1',
            {
                headline: ['xsmall', 'small'],
                styles: [
                    `@media (min-aspect-ratio: 80/11) and (min-width: 500px) {
                        .message__headline { font-size: 2.3vw; display: block; }
                        .message__disclaimer { margin-top: .5rem; }
                        .message__logo-container { margin-bottom: 1vw }
                        .message__headline { margin-bottom: 1vw }
                    }`
                ]
            }
        ],
        ['ratio:1x4', { logo: Logo.STACKED.WHITE }],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['ratio:1x4 && color:gray', { logo: Logo.STACKED.COLOR }],
        ['ratio:1x4 && color:white', { logo: Logo.STACKED.COLOR }],
        [
            'ratio:1x1 && color:gray',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white-no-border',
            {
                logo: [Logo.PRIMARY.COLOR, Logo.ALTERNATIVE.COLOR]
            }
        ]
    ]
};
