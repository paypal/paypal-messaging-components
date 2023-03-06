/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import Message from 'server/message';
import { getMutations, getLocaleStyles } from 'server/locale';
import { objectSet } from 'src/utils';

const mockLogger = jest.fn();

jest.mock('@paypal/sdk-logos/src', () => {
    const mock = () => ({
        render: () => 'src="data:image&#x2F;svg+xml;base64,svg"'
    });

    return {
        PayPalLogo: mock,
        PPLogo: mock,
        PPMonochrome: mock,
        LOGO_COLOR: {
            DEFAULT: '',
            WHITE: '',
            BLACK: '',
            MONOCHROME: ''
        }
    };
});

jest.mock('server/locale', () => ({
    getMutations: jest.fn(),
    getLocaleClass: () => 'locale--US',
    getLocaleStyles: jest.fn(),
    getLocaleProductName: () => ['with', 'PayPal Credit'],
    getLogos: () => ({})
}));

jest.mock('server/message/styles', () => ({
    default: {
        'layout:text': [['default', '']],
        'layout:flex': [['default', '']],
        'layout:custom': [['default', '']]
    },
    __esModule: true
}));

describe('SSR message', () => {
    const headline = 'headline';
    const subHeadline = 'subheadline';
    const disclaimer = 'disclaimer';

    const options = {
        style: {
            layout: 'text',
            logo: {
                type: 'primary',
                position: 'left'
            },
            text: {
                size: 12
            }
        }
    };

    const defaultMarkup = () => ({
        meta: {
            offerType: 'NI'
        },
        headline: [[headline, ['default']]],
        subHeadline: [[subHeadline, ['default']]],
        disclaimer: [[disclaimer, ['default']]]
    });

    const defaultMutations = (extra = {}) => [
        [
            'default',
            {
                headline: 'default',
                ...extra
            }
        ]
    ];

    const style1 = '.message { style1 }';
    const style2 = '.message .test { style2 }';

    beforeEach(() => {
        getMutations.mockReturnValue(defaultMutations());

        getLocaleStyles.mockReturnValue([]);
    });
    describe('renders message', () => {
        const renderOptions = {
            style: {
                layout: 'text',
                logo: {
                    type: 'primary',
                    position: 'left'
                },
                text: {
                    size: 12
                }
            }
        };
        test('content', () => {
            const logoSrc = 'logoSrc';

            getMutations.mockReturnValue(
                defaultMutations({
                    subHeadline: 'default',
                    disclaimer: 'default',
                    logo: {
                        src: logoSrc,
                        dimensions: [10, 10]
                    }
                })
            );
            const { getByText, getByAltText } = render(
                <Message locale="US" addLog={mockLogger} options={renderOptions} markup={defaultMarkup()} />
            );
            expect(getByText(headline)).toBeInTheDocument();
            expect(getByText(subHeadline)).toBeInTheDocument();
            expect(getByText(disclaimer)).toBeInTheDocument();

            expect(getByAltText('PayPal')).toHaveAttribute('src', logoSrc);
        });
        const getMatchPattern = (cssSelector, cssValue) => {
            // convert plain string css into an array if RegExps
            const matchCssValue =
                cssValue
                    ?.replace(/\s*\{\s*/, '[^\\{]*{[^\\}]*')
                    .replace(/;\s*\}\s*/, ';[^\\}]*}')
                    .replace(/\(/g, '\\(')
                    .replace(/\)/g, '\\)')
                    .replace(/ /, '\\s*') || '';
            const matchCssRules = cssSelector
                .split(',')
                .map(selectorPattern =>
                    RegExp(
                        selectorPattern
                            .trim()
                            .replace(/\./g, '\\.')
                            .replace(/\(/g, '\\(')
                            .replace(/\)/g, '\\)')
                            .replace(/ +/g, '[^,\\{]') + matchCssValue || ''
                    )
                )
                .filter(Boolean);
            return matchCssRules;
        };
        const getRenderStyles = (logger, opts, markup, layout, prop, value) => {
            // get the css rules used when rendered with the specified options
            if (typeof value !== 'undefined') {
                objectSet(opts, 'style.layout', layout);
                objectSet(opts, prop, value);
            }
            const { container } = render(<Message locale="US" addLog={logger} options={opts} markup={markup} />);
            // const style = Array.from(container.querySelectorAll('style'))
            //     .map(e => e.textContent)
            //     .join('\n');
            const style = container.querySelector('.styles__customFont')?.textContent;
            return style || '';
        };
        const scenarios = {
            DEFAULT: 'default value',
            VALID: 'valid value',
            INVALID: 'invalid value',
            MALICIOUS: 'malicious value'
        };
        const flexSelector = `
            .message__messaging .message__headline span,
            .message__messaging .message__sub-headline span,
            .message__messaging .message__disclaimer span`;
        const textSelector = `.message__messaging`;
        const fontFaceSelector = '@font-face';
        const fontFamilyData = {
            'default value': [undefined, null],
            'valid value': ['Impact', "{ font-family: 'Impact', Helvetica, Arial, sans-serif; }"],
            'invalid value': [' ', null],
            'malicious value': ["</script><script>alert('XSS Message!')</script>", null]
        };
        const fontSourceData = {
            'default value': [undefined, null],
            'valid value': [
                ['https://fonts.com/plRP.woff', 'https://fonts.com/plRP.woff2'],
                "{ src: url('https://fonts.com/plRP.woff') format('woff'), url('https://fonts.com/plRP.woff2') format('woff2'); }"
            ],
            // 'valid value': [
            //     'https://fonts.com/plRP.woff',
            //     "{ src: url('https://fonts.com/plRP.woff') format('woff'); }"
            // ],
            'invalid value': ['https://fonts.com/plRP', null],
            'malicious value': ["</script><script>alert('XSS Message!')</script>", null]
        };
        describe.each([
            [
                'text',
                'text.size',
                textSelector,
                {
                    'default value': [undefined, '{ font-size: 12px; }'],
                    'valid value': [14, '{ font-size: 14px; }']
                    // 'invalid value': [48, '{ font-size: 12px; }']
                }
            ],
            [
                'flex',
                'text.size',
                flexSelector,
                {
                    'invalid value': [14, null]
                }
            ],
            ['text', 'text.fontFamily', `.message__messaging`, fontFamilyData],
            ['flex', 'text.fontFamily', flexSelector, fontFamilyData],
            ['text', 'text.fontSource', fontFaceSelector, fontSourceData],
            ['flex', 'text.fontSource', fontFaceSelector, fontSourceData]
        ])('css rule %s.%s', (layout, propString, selector, testValues) => {
            beforeEach(() => {
                getLocaleStyles.mockReturnValue([]);
                getMutations.mockReturnValue([]);

                renderOptions.style = {
                    layout: 'text',
                    logo: {
                        type: 'primary',
                        position: 'left'
                    },
                    text: {
                        size: 12
                    }
                };
            });
            const markup = defaultMarkup();
            const propPath = `style.${propString}`;
            Array.from(Object.values(scenarios)).map(scenario => {
                const values = testValues?.[scenario];
                if (typeof values !== 'undefined') {
                    return test(scenario, () => {
                        const [valueIn, valueOut] = values;
                        const matchPatterns = getMatchPattern(selector, valueOut ?? 'placeholderValue');
                        const styleRules = getRenderStyles(
                            mockLogger,
                            renderOptions,
                            markup,
                            layout,
                            propPath,
                            valueIn
                        );
                        // expect(objectGet(renderOptions, propPath)).toBe(valueIn);
                        expect(typeof styleRules).toBe('string');
                        matchPatterns.map(pattern => {
                            expect(typeof pattern?.source).toBe('string');
                            if (valueOut) {
                                return expect(styleRules).toMatch(pattern);
                            }
                            return expect(styleRules).not.toMatch(pattern);
                        });
                    });
                }
                return test.todo(scenario);
            });
        });
    });

    test('applies cascade mutations', () => {
        const xsmallHeadline = 'xsmallHeadline';
        const xsmallSubHeadline = 'xsmallSubHeadline';

        getMutations.mockReturnValue([
            [
                'default',
                {
                    headline: 'default',
                    subHeadline: 'default',
                    disclaimer: 'default'
                }
            ],
            [
                'logo.type:primary',
                {
                    headline: 'xsmall'
                }
            ],
            [
                'logo.type:primary && logo.position:left',
                {
                    subHeadline: 'xsmall'
                }
            ]
        ]);

        const markup = defaultMarkup();

        markup.headline = [
            [headline, ['default']],
            [xsmallHeadline, ['xsmall']]
        ];

        markup.subHeadline = [
            [subHeadline, ['default']],
            [xsmallSubHeadline, ['xsmall']]
        ];

        const { getByText, queryByText } = render(
            <Message locale="US" addLog={mockLogger} options={options} markup={markup} />
        );

        expect(queryByText(headline)).toBeNull();
        expect(queryByText(subHeadline)).toBeNull();

        expect(getByText(xsmallHeadline)).toBeInTheDocument();
        expect(getByText(xsmallSubHeadline)).toBeInTheDocument();
        expect(getByText(disclaimer)).toBeInTheDocument();
    });

    test('handles a function for mutations', () => {
        getMutations.mockReturnValue([
            [
                'default',
                ({ textSize }) => ({
                    headline: 'default',
                    messageWidth: textSize
                })
            ]
        ]);

        const { container } = render(
            <Message locale="US" addLog={mockLogger} options={options} markup={defaultMarkup()} />
        );

        const miscStyles = Array.from(container.querySelectorAll('style')).find(el => el.className === 'styles__misc');

        expect(miscStyles.textContent).toContain('.message__messaging { width: 11.796px }');
    });

    test('handles message width range', () => {
        getMutations.mockReturnValue(
            defaultMutations({
                messageWidth: [0, 100]
            })
        );

        const { container } = render(
            <Message locale="US" addLog={mockLogger} options={options} markup={defaultMarkup()} />
        );

        const miscStyles = Array.from(container.querySelectorAll('style')).find(el => el.className === 'styles__misc');

        expect(miscStyles.textContent).toContain('.message__messaging { min-width: 0px; max-width: 100px }');
    });

    test('handles locale styles', () => {
        getLocaleStyles.mockReturnValue([
            ['default', style1],
            ['logo.type:primary', style2]
        ]);

        const { container } = render(
            <Message locale="US" addLog={mockLogger} options={options} markup={defaultMarkup()} />
        );

        const localeStyles = Array.from(container.querySelectorAll('style')).find(
            el => el.className === 'styles__locale'
        );

        expect(localeStyles.textContent).toContain(`.locale--US ${style1}`);
        expect(localeStyles.textContent).toContain(`.locale--US ${style2}`);
    });

    test('handles mutation styles', () => {
        getMutations.mockReturnValue(
            defaultMutations({
                styles: [style1, style2]
            })
        );

        const { container } = render(
            <Message locale="US" addLog={mockLogger} options={options} markup={defaultMarkup()} />
        );

        const mutationStyles = Array.from(container.querySelectorAll('style')).find(
            el => el.className === 'styles__mutations'
        );

        expect(mutationStyles.textContent).toContain(style1);
        expect(mutationStyles.textContent).toContain(style2);
    });
});
