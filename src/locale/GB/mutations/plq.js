import Logo from '../logos';
import {
    gbPLContentMediaQuery,
    fallbackMediaQuery,
    gbPLAltContentMediaQuery,
    whiteTextMediaQuery
} from './mediaQueries';
import { messageDisclaimerMediaQuery } from '../../US/mutations/mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 25 + 20),
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']]
                    }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 25 + 20),
                    `.message__logo-container { width: ${textSize * 6}px }`,
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']]
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 27),
                    gbPLContentMediaQuery(textSize * 38 + 10),
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
                    fallbackMediaQuery(textSize * 27),
                    `.message__logo-container { width: ${textSize * 6}px }`,
                    `.message__logo { width: ${textSize * 4}px }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    messageDisclaimerMediaQuery(textSize * 34 + 10),
                    fallbackMediaQuery(textSize * 30),
                    gbPLAltContentMediaQuery(textSize * 17 + 8, textSize * 30),
                    `.message__logo-container { width: ${textSize * 2}px; }`,
                    `.message__logo { width: ${textSize * 4}px; }`,
                    `.message__logo:first-child { width: ${textSize * 1.25}px; }`
                ],
                logo: Logo.PRIMARY.COLOR[0],
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']]
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 29 + 15)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']]
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [fallbackMediaQuery(textSize * 29 + 15)],
                logo: false,
                headline: [
                    {
                        tag: 'medium',
                        replace: [['month.', 'month']]
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        [
            'text.color:white && logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    fallbackMediaQuery(textSize * 29 + 15),
                    whiteTextMediaQuery(textSize * 29 + 15),
                    '.locale--GB .message__headline .pp-text-logo::before { color: white; }',
                    '.locale--GB .message__headline .pp-text-logo::after { color: white; }',
                    '.locale--GB .message__headline > span:last-child > span:last-child { color: white; }',
                    '.locale--GB .message__headline > span:last-child > span:last-child::after { color: white; }'
                ],
                logo: false
            })
        ],
        ['text.color:white && logo.type:alternative', { logo: Logo.PRIMARY.WHITE[0] }]
    ]
};
