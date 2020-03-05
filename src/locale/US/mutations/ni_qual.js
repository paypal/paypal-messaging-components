// Mutation used when NI:QUALIFYING-true
import Logo from '../logos';
import { basicMediaQuery } from './ni';

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
                    }
                    @media(max-width:${textSize * 18.5 + 70}px){
                        .message__disclaimer {
                        display:inline;
                    }
                    }`,
                    [basicMediaQuery(textSize * 18.5 + 70)]
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['months'] }
                ],
                disclaimer: 'xsmall'
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
                }
                @media(max-width:${textSize * 15 + 80}px){
                    .message__disclaimer {
                        display:block;
                    }
                }`,
                    basicMediaQuery(textSize * 15 + 80),
                    `.message__logo { width: ${textSize * 7}px }`
                ],
                logo: Logo.ALT_NO_PP.COLOR,
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
                }
                    @media(max-width:${textSize * 20}px) {
                        .message__disclaimer{
                            display:block;
                        }
                    }`,
                    basicMediaQuery(textSize * 20)
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
                    basicMediaQuery(textSize * 24 + 130),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                logo: Logo.ALTERNATIVE.COLOR
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
                    }
                @media(max-width:${textSize * 18.5}px){
                        .message__disclaimer {
                        display:inline;
                        }
                }`,
                    basicMediaQuery(textSize * 18.5)
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
                    `.message__logo-container { width: ${textSize * 8}px }`
                ]
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
                headline: ['xsmall', { tag: 'medium', br: ['months'] }],
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x1',
            {
                headline: ['xsmall', 'medium'],
                styles: ['@media (min-width: 150px) { .message__headline { font-size: 8vw } }']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { tag: 'medium', br: ['months'] },
                styles: [
                    '.message__logo-container { margin-bottom: 30%; }',
                    '.message__disclaimer span.multi:nth-of-type(1) { display: none; }',
                    '@media (max-aspect-ratio: 11/40) { .message__disclaimer span.multi:nth-of-type(1) { display: block; } }',
                    '.message__headline { font-size: 1.1rem }'
                ],
                disclaimer: ['xlarge', 'xsmall']
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ]
};
