export default {
    'layout:text': [
        [
            'default',
            () => ({
                styles: [
                    `.message__headline > .tag--xsmall > span:first-child { white-space: normal; } button { pointer-events: none; }`
                ],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        br: ['or']
                    }
                ]
            })
        ]
    ]
};
