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
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ]
};
