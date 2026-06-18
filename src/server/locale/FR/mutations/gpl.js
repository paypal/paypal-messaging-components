import Logo from '../../../message/logos';
import { textWrap, messageLogoWidth, altNoWrap, setLogoTop, logo20x1 } from '../../../message/mediaQueries';
import { textLogoMutations, flexLogoMutations } from '../../../message/logoMutations';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 43, textSize, 'FR'),
                    messageLogoWidth(false, textSize * 5.1),
                    setLogoTop(textSize * 20),
                    `@media screen and (min-width: ${textSize * 11.5}px) {
                        .message__messaging span.br {
                            white-space: normal;
                        }
                    }`
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'default',
                        br: ['achats']
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 43, textSize, 'FR'),
                    setLogoTop(textSize * 40),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    `@media screen and (min-width: ${textSize * 11.5}px) {
                        .message__messaging span.br {
                            white-space: normal;
                        }
                    }`
                ],
                headline: [
                    {
                        tag: 'default',
                        br: ['frais']
                    }
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    // textWrap(textSize * 43, textSize, 'FR'),
                    messageLogoWidth(textSize * 6, textSize * 5.1),
                    `@media screen and (min-width: ${textSize * 11.5}px) {
                        .message__messaging span.br {
                            white-space: normal;
                        }
                    }`
                ],
                headline: [
                    {
                        tag: 'default',
                        br: ['frais']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    textWrap(textSize * 39, textSize, 'FR'),
                    altNoWrap(textSize * 10.6),
                    messageLogoWidth(textSize * 1.75, textSize * 1.35)
                ],
                logo: Logo.PP_MONOGRAM.COLOR,
                headline: [
                    {
                        tag: 'default',
                        br: ['€']
                    }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    `@media screen and (min-width: ${textSize * 11.5}px) {
                        .message__messaging span.br {
                            white-space: normal;
                        }
                    }`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'default',
                        br: ['frais', 'achats', '€'],
                        replace: [
                            ['€.', '€'],
                            ['éligibles.', 'éligibles']
                        ]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    `.message__logo { width: ${textSize * 3.5}px }`,
                    `@media screen and (min-width: ${textSize * 11.5}px) {
                    .message__messaging span.br {
                        white-space: normal;
                    }
                }`
                ],
                logo: Logo.WORDMARK.BLACK,
                headline: [
                    {
                        tag: 'default',
                        br: ['pour'],
                        replace: [
                            ['€.', '€'],
                            ['éligibles.', 'éligibles']
                        ]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ],
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.WORDMARK.WHITE,
                headline: [
                    {
                        tag: 'xsmall'
                    },
                    {
                        tag: 'default'
                    }
                ],
                disclaimer: ['default']
            }
        ],
        [
            'ratio:1x1',
            {
                subHeadline: [{ tag: 'small', br: ['achats'] }]
            }
        ],
        [
            'ratio:1x4',
            {
                headline: [{ tag: 'small', br: ['pour'] }],
                subHeadline: [{ tag: 'small', br: ['avec', 'et', 'paiement en'] }]
            }
        ],
        [
            'ratio:6x1',
            {
                subHeadline: [{ tag: 'small', br: ['les'] }]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: [{ tag: 'small', br: ['les'] }]
            }
        ],
        [
            'ratio:20x1',
            {
                headline: [{ tag: 'small', br: ['les'] }],
                styles: [logo20x1()]
            }
        ],
        ...flexLogoMutations
    ]
};
