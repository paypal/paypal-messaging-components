/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import Message from 'server/message';
import { getMutations, getLocaleStyles } from 'server/locale';

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

jest.mock('server/message/styles/fonts.css', () => ({
    default: 'fonts',
    __esModule: true
}));

jest.mock('server/message/styles', () => ({
    default: {
        'layout:text': [['default', '']]
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

    test('renders message content', () => {
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

        const { getByText, getByAltText, container } = render(
            <Message locale="US" addLog={mockLogger} options={options} markup={defaultMarkup()} />
        );

        expect(getByText(headline)).toBeInTheDocument();
        expect(getByText(subHeadline)).toBeInTheDocument();
        expect(getByText(disclaimer)).toBeInTheDocument();

        expect(getByAltText('PayPal Credit logo')).toHaveAttribute('src', logoSrc);

        const customFontStylesContent = container.querySelector('.styles__customFont')?.textContent;

        expect(customFontStylesContent).toMatch(/\.message__messaging[^{]+\{[^}]+font-size: 12px;[^}]+\}/);
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

        expect(miscStyles.textContent).toContain('.message__messaging { width: 12px }');
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
