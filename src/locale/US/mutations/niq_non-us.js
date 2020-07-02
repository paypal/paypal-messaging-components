import Logo from '../logos';
import { basicMediaQuery, altContentMediaQuery } from './mediaQueries';
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
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['months.'], replace: [['months', 'months.']] }
                ],
                disclaimer: ['extra', 'xsmall']
            })
        ],
        [
            'logo.type:primary',
            ({ textSize }) => ({
                messageWidth: [textSize * 13, textSize * 27]
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
                logo: Logo.ALT_NO_PP.COLOR,
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
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR,
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
                    `.message__logo-container { width: ${textSize * 8}px }`
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
                    basicMediaQuery(textSize * 18)
                ]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': flex,
    'layout:legacy': legacyNI
};
