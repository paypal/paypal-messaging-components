import Logo from '../logos';
import { flex } from './ppc_ni_nq';
import { basicMediaQuery, altContentMediaQuery, primaryContentMediaQuery, textWrap } from './mediaQueries';
import { textLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `
                    .weak {
                        display:none;
                    }
                   `,
                    [basicMediaQuery(textSize * 18.5 + 70)]
                ],
                logo: Logo.SINGLE_LINE.COLOR,
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['months.'], replace: [['months', 'months.']] }
                ],
                disclaimer: 'xsmall'
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
                        width: { smallLogo: textSize * 5, largeLogo: textSize * 9 },
                        logoSvgBP: textSize * 41.75,
                        whiteSpaceBP: textSize * 27
                    })
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
                    basicMediaQuery(textSize * 12 + 80),
                    `.message__logo { width: ${textSize * 7}px }`
                ],
                logo: Logo.SINGLE_LINE_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                    { tag: 'medium', br: ['months'] }
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
                    basicMediaQuery(textSize * 17)
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
                        br: ['months']
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
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    textWrap(textSize * 30, textSize, 'US')
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `
                    .weak {
                        display:none;
                    }
                    .message__disclaimer {
                        display: block;
                    }
                    `,
                    `.message__logo-container { width: ${textSize * 9}px }`,
                    basicMediaQuery(textSize * 18.5)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `
                    .weak {
                        display:none;
                    }
                    .message__content {
                        display: inline-block;
                    }
                    `,
                    basicMediaQuery(textSize * 18.5),
                    altContentMediaQuery(textSize * 34),
                    `.message__logo-container { width: ${textSize * 9}px }`
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
                    basicMediaQuery(textSize * 18.5),
                    `.message__logo-container { width: ${textSize * 5}px }`
                ]
            })
        ],
        [
            'logo.type:alternative && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 18.5),
                    altContentMediaQuery(textSize * 42),
                    `.message__logo-container { width: ${textSize * 5}px }`,
                    `@media screen and (max-width: ${
                        textSize * 42
                    }px) { .locale--US .message__logo > img { top:2.3px; }}`,
                    textWrap(textSize * 40, textSize, 'US')
                ],
                logo: Logo.SINGLE_LINE_NO_PAYPAL.COLOR
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': flex
};
