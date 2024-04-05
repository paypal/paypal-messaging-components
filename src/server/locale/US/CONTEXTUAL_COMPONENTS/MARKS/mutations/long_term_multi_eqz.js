import { xSmallFallback, hideDisclaimer } from '../../../../../message/mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--xsmall > span:first-child { white-space: normal; } `,
                    xSmallFallback(textSize * 12.5),
                    hideDisclaimer(textSize * 12.5)
                ],
                headline: [
                    {
                        tag: 'medium'
                    },
                    {
                        tag: 'xsmall',
                        br: ['or', ',']
                    }
                ],
                disclaimer: ['default']
            })
        ]
    ]
};
