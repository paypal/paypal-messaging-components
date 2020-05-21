import Logo from '../logos';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; margin-right: 5px; }`
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'default'
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; margin-right: 5px; }`
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'default'
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:none',
            () => ({
                logo: false,
                headline: [
                    {
                        tag: 'default',
                        replace: [['purchases.', 'purchases']]
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [{ tag: 'default', replace: [['purchases.', 'purchases']] }],
                disclaimer: ['default']
            })
        ]
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
                logo: [Logo.PRIMARY.WHITE]
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
                headline: ['xsmall', 'small']
                // styles: [
                //     `@media (min-aspect-ratio: 80/11) and (min-width: 500px) {
                //         .message__headline { font-size: 2.3vw; display: block; }
                //         .message__disclaimer { margin-top: .5rem; }
                //         .message__logo-container { margin-bottom: 1vw }
                //         .message__headline { margin-bottom: 1vw }
                //     }`
                // ]
            }
        ],

        [
            'color:gray',
            {
                logo: Logo.PRIMARY.COLOR,

                styles: [
                    `.message__background {
                        background: #EBECEE;
                    }`
                ]
            }
        ],
        [
            'color:white',
            {
                logo: Logo.PRIMARY.COLOR,
                styles: [
                    `.message__background {
                        background: #FFFFFF;
                    }`
                ]
            }
        ],
        [
            'color:black',
            {
                logo: Logo.PRIMARY.WHITE,
                styles: [
                    `.message__background {
                        background: #000000;
                    }`
                ]
            }
        ],

        [
            'ratio:1x1 && color:gray',
            {
                logo: [Logo.PRIMARY.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:white',
            {
                logo: [Logo.PRIMARY.COLOR]
            }
        ],
        [
            'ratio:1x1 && color:black',
            {
                logo: [Logo.PRIMARY.WHITE]
            }
        ]
    ]
};
