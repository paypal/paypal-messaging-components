import Logo from '../logos';
import { basicMediaQuery, altContentMediaQuery, primaryContentMediaQuery } from './mediaQueries';
import { legacyNI } from './ni';
import { flex } from './ni_non-us';
import { textLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }
                    .message__disclaimer {
                        display:block;
                    }`,
                    basicMediaQuery(textSize * 18.5 + 70)
                ],
                logo: Logo.SINGLE_LINE.COLOR,
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['months.'], replace: [['months', 'months.']] }
                ],
                disclaimer: ['extra', 'xsmall']
            })
        ],
        [
            'logo.type:primary && logo.position:left',
            ({ textSize }) => ({
                logo: [Logo.SINGLE_LINE_NO_PAYPAL.COLOR, Logo.SINGLE_LINE.COLOR],
                messageWidth: [textSize * 13, textSize * 27],
                styles: [
                    basicMediaQuery(textSize * 12),
                    `
                    .weak {
                        display:none;
                    }
                    `,
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        logoAltWidth: textSize * 5,
                        logoWidth: textSize * 9,
                        logoSvgBP: textSize * 41.75,
                        whiteSpaceBP: textSize * 27
                    }),
                    altContentMediaQuery(textSize * 41.75)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 18),
                    `.message__logo { width: ${textSize * 7}px }`
                ],
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                    { tag: 'medium', br: ['purchases'] }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 18)
                ],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        br: ['purchases']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 18),
                    altContentMediaQuery(textSize * 35),
                    `.message__logo-container { width: ${textSize * 5}px }`
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR,
                headline: [
                    'xsmall',
                    {
                        tag: 'medium',
                        br: ['months.'],
                        replace: [['months', 'months.']]
                    }
                ]
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 20),
                    `.message__logo-container { width: ${textSize * 5}px }`
                ],
                headline: [
                    'xsmall',
                    {
                        tag: 'medium',
                        br: ['months.'],
                        replace: [['months', 'months.']]
                    }
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }
                    .message__disclaimer {
                        display:block;
                    }`,
                    `.message__logo-container { width: ${textSize * 9}px }`,
                    basicMediaQuery(textSize * 18)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                messageWidth: [textSize * 10, 1000],
                styles: [
                    `
                    .weak { display: none; }
                    .message__logo-container { width: ${textSize * 9}px }
                    .message__content { display: inline-block; }
                    `,
                    basicMediaQuery(textSize * 18),
                    altContentMediaQuery(textSize * 37)
                ]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': flex,
    'layout:legacy': legacyNI
};
