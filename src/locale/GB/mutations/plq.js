import Logo from '../logos';
import { gbPLContentMediaQuery } from './mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'default',
                        replace: [['month.', 'month']],
                        br: ['with']
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [
                    `.message__logo-container { width: ${textSize * 6}px }`,
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'default',
                        replace: [['month.', 'month']],
                        br: ['with']
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    gbPLContentMediaQuery(textSize * 36.3),
                    `.message__logo-container { width: ${textSize * 6}px }`,
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `.message__logo-container { width: ${textSize * 6}px }`,
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ]
            })
        ],
        [
            'logo.type:none',
            () => ({
                logo: false,
                headline: [
                    {
                        tag: 'default',
                        replace: [['month.', 'month']],
                        br: ['with']
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
                headline: [
                    {
                        tag: 'default',
                        replace: [['month.', 'month']],
                        br: ['with']
                    }
                ],
                disclaimer: ['default']
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ]
};
