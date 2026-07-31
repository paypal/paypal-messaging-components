import render from 'server/v2/render';
import validateStyle from 'server/v2/validateStyle';
import { FLEX_DEFAULTS } from 'server/v2/constants';

jest.mock('server/message/logos', () => {
    const makeVariant = (name, mw, mh, ww, wh) => [
        { src: `data:local/${name}-monogram`, dimensions: [mw, mh] },
        { src: `data:local/${name}-wordmark`, dimensions: [ww, wh] }
    ];
    const PP_PAYPAL = {
        COLOR: makeVariant('color', 24, 32, 100, 32),
        WHITE: makeVariant('white', 24, 32, 100, 32),
        GRAYSCALE: makeVariant('grayscale', 24, 32, 100, 32),
        MONOCHROME: makeVariant('monochrome', 24, 32, 100, 32)
    };
    return {
        PP_PAYPAL,
        NO_PP_MONOGRAM: {
            COLOR: { src: 'data:local/inline-color', dimensions: [100, 32] },
            WHITE: { src: 'data:local/inline-white', dimensions: [100, 32] },
            GRAYSCALE: { src: 'data:local/inline-grayscale', dimensions: [100, 32] },
            MONOCHROME: { src: 'data:local/inline-monochrome', dimensions: [100, 32] }
        }
    };
});

jest.mock('server/v2/venmoLogos', () => {
    const makeSingle = name => ({ src: `data:local/${name}`, dimensions: [101, 32] });
    return {
        VENMO: {
            COLOR: makeSingle('venmo-color'),
            WHITE: makeSingle('venmo-white'),
            GRAYSCALE: makeSingle('venmo-grayscale'),
            MONOCHROME: makeSingle('venmo-monochrome')
        }
    };
});

jest.mock('server/locale/US/PAYPAL_CREDIT/logos', () => {
    const makeSingle = name => ({ src: `data:local/${name}`, dimensions: [100, 32] });
    const makeVariant = prefix => ({
        COLOR: makeSingle(`${prefix}-color`),
        WHITE: makeSingle(`${prefix}-white`),
        GRAYSCALE: makeSingle(`${prefix}-grayscale`),
        BLACK: makeSingle(`${prefix}-black`)
    });
    return {
        STACKED: makeVariant('ppc-stacked'),
        SINGLE_LINE: makeVariant('ppc-single'),
        SINGLE_LINE_NO_PAYPAL: makeVariant('ppc-no-paypal'),
        SINGLE_LINE_NO_PP: makeVariant('ppc-no-pp'),
        PRIMARY: makeVariant('ppc-stacked'),
        ALTERNATIVE: makeVariant('ppc-single')
    };
});

const mockLog = jest.fn();

const baseOptions = {
    style: {
        layout: 'text',
        logo: { type: 'primary', position: 'left' },
        text: { color: 'black', size: 12 }
    }
};

const baseV2Content = {
    main_items: [{ type: 'TEXT', text: 'Pay Later' }],
    action_items: [{ type: 'LINK', text: 'Learn more', click_url: 'https://example.com/lander', embeddable: true }],
    disclaimer_items: [{ type: 'TEXT', text: 'Subject to approval.' }]
};

describe('v2 render', () => {
    test('returns an HTML string', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    test('renders pp-message root element', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).toContain('class="pp-message"');
    });

    test('includes inline style tag', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).toContain('<style');
        expect(result).toContain('pp-message');
    });

    test('renders main_items text in .main span', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).toContain('Pay Later');
        expect(result).toMatch(/class="main[^"]*"/);
    });

    test('main span has aria-label', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).toMatch(/aria-label="[^"]+"/);
    });

    test('renders action_items in .action span', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).toContain('Learn more');
        expect(result).toMatch(/class="action[^"]*"/);
    });

    test('separates main content and action with breakable whitespace', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).toContain('</span> <span aria-label="Learn more" class="action');
        expect(result).not.toContain('.pp-message .action {\n    margin-left:');
    });

    test('renders disclaimer_items appended to main content', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).toContain('Subject to approval.');
    });

    test('omits action span when action_items is empty', () => {
        const content = { ...baseV2Content, action_items: [] };
        const result = render(baseOptions, content, mockLog);
        expect(result).not.toMatch(/class="action[^"]*"/);
    });

    test('renders IMAGE item as img in .logo span', () => {
        const content = {
            ...baseV2Content,
            main_items: [
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/logo.svg',
                    alternative_text: 'PayPal',
                    name: 'paypal_logo'
                },
                { type: 'TEXT', text: 'Pay Later' }
            ]
        };
        const result = render(baseOptions, content, mockLog);
        // Known paypal_logo resolves from local assets, not CPS source_url
        expect(result).not.toContain('https://example.com/logo.svg');
        expect(result).toContain('data:local/color-monogram');
        expect(result).toMatch(/class="logo[^"]*"/);
        expect(result).toContain('role="img"');
    });

    test('positions logo on left by default', () => {
        const content = {
            ...baseV2Content,
            main_items: [
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/logo.svg',
                    alternative_text: 'PayPal',
                    name: 'paypal_logo'
                },
                { type: 'TEXT', text: 'Pay Later' }
            ]
        };
        const result = render(baseOptions, content, mockLog);
        expect(result).toMatch(/class="logo[^"]*left[^"]*"/);
    });

    test('positions logo on right when position is right', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'primary', position: 'right' } } };
        const content = {
            ...baseV2Content,
            main_items: [
                { type: 'TEXT', text: 'Pay Later' },
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/logo.svg',
                    alternative_text: 'PayPal',
                    name: 'paypal_logo'
                }
            ]
        };
        const result = render(options, content, mockLog);
        expect(result).toMatch(/class="logo[^"]*right[^"]*"/);
    });

    test('positions logo on top when position is top', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'primary', position: 'top' } } };
        const content = {
            ...baseV2Content,
            main_items: [
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/logo.svg',
                    alternative_text: 'PayPal',
                    name: 'paypal_logo'
                },
                { type: 'TEXT', text: 'Pay Later' }
            ]
        };
        const result = render(options, content, mockLog);
        expect(result).toMatch(/class="logo[^"]*top[^"]*"/);
    });

    test('inline logo type renders logo amid plain main text', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
        const content = {
            ...baseV2Content,
            main_items: [
                { type: 'TEXT', text: 'Pay Later' },
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/logo.svg',
                    alternative_text: 'PayPal',
                    name: 'paypal_logo'
                },
                { type: 'TEXT', text: '.' }
            ]
        };
        const result = render(options, content, mockLog);
        expect(result).toMatch(/class="logo[^"]*inline[^"]*"/);
        expect(result).toMatch(/class="main[^"]*inline-content"/);
        const beforeLogoIdx = result.indexOf('>Pay Later</span>');
        const logoIdx = result.indexOf('class="logo');
        const afterLogoIdx = result.indexOf('.</span>', logoIdx);
        expect(logoIdx).toBeGreaterThan(beforeLogoIdx);
        expect(afterLogoIdx).toBeGreaterThan(logoIdx);
    });

    test('inline logo is nested in the inline main span', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
        const content = {
            ...baseV2Content,
            main_items: [
                { type: 'TEXT', text: 'Pay Later' },
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/logo.svg',
                    alternative_text: 'PayPal',
                    name: 'paypal_logo'
                }
            ]
        };
        const result = render(options, content, mockLog);
        expect(result).toMatch(/class="main[^"]*inline-content"[^>]*>Pay Later<span role="img"[^>]*class="logo/);
    });

    test('logo type none replaces the graphic with accessible brand text', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'none', position: 'left' } } };
        const content = {
            ...baseV2Content,
            main_items: [
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/logo.svg',
                    alternative_text: 'PayPal',
                    name: 'paypal_logo'
                },
                { type: 'TEXT', text: 'Pay Later' }
            ]
        };
        const result = render(options, content, mockLog);
        expect(result).not.toMatch(/role="img"/);
        expect(result).toContain('<strong>PayPal </strong>Pay Later');
    });

    test('logo type none keeps brand text attached to following punctuation', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'none', position: 'left' } } };
        const content = {
            ...baseV2Content,
            main_items: [
                { type: 'TEXT', text: 'Pay later with ' },
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/logo.svg',
                    alternative_text: 'PayPal',
                    name: 'paypal_logo'
                },
                { type: 'TEXT', text: '.' }
            ]
        };
        const result = render(options, content, mockLog);
        expect(result).toMatch(/class="main[^>]*>Pay later with <strong>PayPal<\/strong>\./);
    });

    describe('logo local asset resolution', () => {
        const logoBlock = {
            type: 'IMAGE',
            source_url: 'https://example.com/logo.svg',
            alternative_text: 'PayPal',
            name: 'paypal_logo'
        };
        const contentWithKnownLogo = {
            ...baseV2Content,
            main_items: [logoBlock, { type: 'TEXT', text: 'Pay Later' }]
        };
        const contentWithUnknownLogo = {
            ...baseV2Content,
            main_items: [
                { ...logoBlock, name: 'custom_image' },
                { type: 'TEXT', text: 'Pay Later' }
            ]
        };

        test('unknown image block falls back to source_url', () => {
            const result = render(baseOptions, contentWithUnknownLogo, mockLog);
            expect(result).toContain('https://example.com/logo.svg');
            expect(result).not.toContain('data:local/');
        });

        test('primary renders both monogram and wordmark local images', () => {
            const result = render(baseOptions, contentWithKnownLogo, mockLog);
            expect(result).toContain('data:local/color-monogram');
            expect(result).toContain('data:local/color-wordmark');
            expect(result).not.toContain('https://example.com/logo.svg');
        });

        test('alternative renders only monogram local image', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'alternative', position: 'left' } } };
            const result = render(options, contentWithKnownLogo, mockLog);
            expect(result).toContain('data:local/color-monogram');
            expect(result).not.toContain('data:local/color-wordmark');
            expect(result).not.toContain('https://example.com/logo.svg');
        });

        test('inline renders only wordmark (NO_PP_MONOGRAM) local image', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
            const result = render(options, contentWithKnownLogo, mockLog);
            expect(result).toContain('data:local/inline-color');
            expect(result).not.toContain('data:local/color-monogram');
            expect(result).not.toContain('https://example.com/logo.svg');
        });

        test.each([
            ['white', 'white-monogram', 'white-wordmark'],
            ['grayscale', 'grayscale-monogram', 'grayscale-wordmark'],
            ['monochrome', 'monochrome-monogram', 'monochrome-wordmark']
        ])('text.color %s resolves matching local variant', (color, expectedMonogram, expectedWordmark) => {
            const options = {
                style: {
                    ...baseOptions.style,
                    logo: { type: 'primary', position: 'left' },
                    text: { color, size: 12 }
                }
            };
            const result = render(options, contentWithKnownLogo, mockLog);
            expect(result).toContain(`data:local/${expectedMonogram}`);
            expect(result).toContain(`data:local/${expectedWordmark}`);
            expect(result).not.toContain('https://example.com/logo.svg');
        });
    });

    test('renders LINK item as an action__link span without click metadata', () => {
        const content = {
            ...baseV2Content,
            main_items: [
                { type: 'LINK', text: 'Terms apply', click_url: 'https://example.com/terms', embeddable: true }
            ]
        };
        const result = render(baseOptions, content, mockLog);
        expect(result).toContain('Terms apply');
        expect(result).toContain('class="action__link"');
        expect(result).not.toContain('data-iframe-url');
        expect(result).not.toContain('data-embeddable');
        expect(result).not.toContain('<a');
    });

    test('merges non-LINK action items into main content after disclaimers', () => {
        const content = {
            ...baseV2Content,
            action_items: [
                { type: 'TEXT', text: 'Offer details.' },
                { type: 'LINK', text: 'Learn more', click_url: 'https://example.com/lander' }
            ]
        };
        const result = render(baseOptions, content, mockLog);
        expect(result).toContain('aria-label="Pay Later Subject to approval. Offer details." class="main');
        expect(result).toMatch(/class="main[^>]*">Pay Later Subject to approval\. Offer details\.<\/span> <span/);
        expect(result).toContain('aria-label="Learn more" class="action');
        expect(result).toContain('class="action__link">Learn more</span>');
    });

    test('applies text color class to main span', () => {
        const options = { style: { ...baseOptions.style, text: { color: 'white' } } };
        const result = render(options, baseV2Content, mockLog);
        expect(result).toMatch(/class="main[^"]*white[^"]*"/);
    });

    test('greyscale alias normalizes to grayscale class after validation', () => {
        const raw = {
            layout: 'text',
            logo: { type: 'primary', position: 'left' },
            text: { color: 'greyscale', size: 12 }
        };
        const validatedStyle = validateStyle(mockLog, raw);
        const result = render({ style: validatedStyle }, baseV2Content, mockLog);
        expect(result).toMatch(/class="main[^"]*grayscale[^"]*"/);
        expect(result).not.toContain('greyscale');
    });

    test('handles empty main_items gracefully', () => {
        const content = { ...baseV2Content, main_items: [] };
        const result = render(baseOptions, content, mockLog);
        expect(typeof result).toBe('string');
    });

    test('handles missing v2Content fields gracefully', () => {
        const result = render(baseOptions, {}, mockLog);
        expect(typeof result).toBe('string');
        expect(result).toContain('class="pp-message"');
    });

    test('does not use v5 cascade structure', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).not.toContain('message__container');
        expect(result).not.toContain('message__headline');
        expect(result).not.toContain('message__foreground');
    });

    test('maps validated v5 text style options to root data attributes', () => {
        const options = {
            style: {
                layout: 'text',
                logo: { type: 'primary', position: 'top' },
                text: { align: 'center', color: 'white', size: 16 }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).toContain('data-pp-style-layout="text"');
        expect(result).toContain('data-pp-style-logo-position="top"');
        expect(result).toContain('data-pp-style-logo-type="primary"');
        expect(result).toContain('data-pp-style-text-align="center"');
        expect(result).toContain('data-pp-style-text-color="white"');
        expect(result).toContain('data-pp-style-text-size="16"');
    });

    test.each(['center', 'right'])('aligns %s text on the root and button', align => {
        const options = {
            style: {
                ...baseOptions.style,
                text: { color: 'black', size: 12, align }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).toContain(`text-align: ${align};`);
        expect(result).toContain(align === 'center' ? 'margin: 0 auto;' : 'margin-left: auto;');
    });
});

describe('v2 render logo presentation adapter', () => {
    const logoBlock = {
        type: 'IMAGE',
        source_url: 'https://example.com/logo.svg',
        alternative_text: 'PayPal',
        name: 'paypal_logo'
    };

    test('inline type overrides position:left — logo renders in main content order', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
        const content = { ...baseV2Content, main_items: [{ type: 'TEXT', text: 'Pay Later' }, logoBlock] };
        const result = render(options, content, mockLog);
        const mainIdx = result.indexOf('class="main');
        const logoIdx = result.indexOf('class="logo');
        expect(logoIdx).toBeGreaterThan(mainIdx);
    });

    test('alternative + position:right resolves to monogram left (monogram forces left)', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'alternative', position: 'right' } } };
        const content = { ...baseV2Content, main_items: [logoBlock, { type: 'TEXT', text: 'Pay Later' }] };
        const result = render(options, content, mockLog);
        expect(result).toMatch(/class="logo[^"]*left[^"]*"/);
        expect(result).not.toMatch(/class="logo[^"]*right[^"]*"/);
    });

    test('inline content ordering: TEXT IMAGE TEXT preserves CPS order', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
        const content = {
            ...baseV2Content,
            main_items: [{ type: 'TEXT', text: 'Buy now,' }, logoBlock, { type: 'TEXT', text: 'pay later' }],
            disclaimer_items: []
        };
        const result = render(options, content, mockLog);
        // the trailing word before the logo ("now,") is regrouped with it (see the
        // inline-logo-phrase tests below), so check overall order via the aria-label
        // (computed from the original, ungrouped CPS content) rather than raw markup order
        expect(result).toContain('aria-label="Buy now, PayPal pay later"');
        // and the leading remainder of the text block still renders ahead of the logo
        const buyIdx = result.indexOf('>Buy ');
        const logoIdx = result.indexOf('class="logo');
        expect(buyIdx).toBeGreaterThan(-1);
        expect(logoIdx).toBeGreaterThan(buyIdx);
    });

    describe('inline logo main layout', () => {
        test('renders trailing CPS text directly after the logo', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
            const content = {
                ...baseV2Content,
                main_items: [{ type: 'TEXT', text: 'Pay in 4 with ' }, logoBlock, { type: 'TEXT', text: '.' }],
                disclaimer_items: []
            };
            const result = render(options, content, mockLog);
            expect(result).toMatch(/class="logo[^"]*"[\s\S]*?<\/span>\.<\/span>/);
        });

        test('keeps the complete CPS label on the inline content wrapper', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
            const content = {
                ...baseV2Content,
                main_items: [{ type: 'TEXT', text: 'As low as $23.84/mo with ' }, logoBlock],
                disclaimer_items: []
            };
            const result = render(options, content, mockLog);
            expect(result).toMatch(/class="main[^"]*inline-content" aria-label="As low as \$23\.84\/mo with PayPal"/);
        });
    });

    test('inline IMAGE accessible label uses alternative_text', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
        const content = {
            ...baseV2Content,
            main_items: [
                { type: 'TEXT', text: 'Pay Later' },
                { ...logoBlock, alternative_text: 'PayPal Logo' }
            ]
        };
        const result = render(options, content, mockLog);
        expect(result).toContain('aria-label="PayPal Logo"');
    });

    describe('PayPal Credit logo resolution', () => {
        const ppcLogoBlock = {
            type: 'IMAGE',
            source_url: 'https://example.com/ppc-logo.svg',
            alternative_text: 'PayPal Credit',
            name: 'paypal_credit_logo'
        };
        const contentWithPPCLogo = {
            ...baseV2Content,
            main_items: [ppcLogoBlock, { type: 'TEXT', text: 'Pay Later' }]
        };

        test('primary left renders a single PayPal Credit image (single-line only)', () => {
            const result = render(baseOptions, contentWithPPCLogo, mockLog);
            expect(result).toContain('data:local/ppc-single-color');
            expect(result).not.toContain('data:local/ppc-no-paypal-color');
            expect(result).not.toContain('https://example.com/ppc-logo.svg');
        });

        test('inline renders SINGLE_LINE_NO_PP PayPal Credit image', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
            const result = render(options, contentWithPPCLogo, mockLog);
            expect(result).toContain('data:local/ppc-no-pp-color');
            expect(result).not.toContain('data:local/ppc-single-color');
            expect(result).not.toContain('https://example.com/ppc-logo.svg');
            expect(result).toContain('class="logo inline wordmark paypal-credit"');
            expect(result).toMatch(
                /\.pp-message \.logo\.inline\.paypal-credit img \{\s+vertical-align: text-top;\s+max-height: 1em;\s+height: 1em;\s+\}/
            );
        });

        test('uses text-top alignment for inline PayPal Credit', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
            const result = render(options, contentWithPPCLogo, mockLog);
            expect(result).toContain('vertical-align: text-top;');
        });

        test('uses the accessible brand label to size an unnamed PayPal Credit image', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
            const content = {
                ...baseV2Content,
                main_items: [
                    { ...ppcLogoBlock, name: undefined },
                    { type: 'TEXT', text: 'Pay Later' }
                ]
            };
            const result = render(options, content, mockLog);

            expect(result).toContain('https://example.com/ppc-logo.svg');
            expect(result).toContain('class="logo inline wordmark paypal-credit"');
            expect(result).toMatch(
                /\.pp-message \.logo\.inline\.paypal-credit img \{\s+vertical-align: text-top;\s+max-height: 1em;\s+height: 1em;\s+\}/
            );
        });

        test('does not apply PayPal Credit styling to an unknown image name', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
            const content = {
                ...baseV2Content,
                main_items: [
                    {
                        ...ppcLogoBlock,
                        name: 'custom_image',
                        alternative_text: 'Merchant logo'
                    },
                    { type: 'TEXT', text: 'Pay Later' }
                ]
            };
            const result = render(options, content, mockLog);

            expect(result).toContain('class="logo inline wordmark"');
            expect(result).not.toContain('class="logo inline wordmark paypal-credit"');
        });

        test('monochrome text color maps to BLACK key for PayPal Credit logo', () => {
            const options = {
                style: {
                    ...baseOptions.style,
                    logo: { type: 'primary', position: 'left' },
                    text: { color: 'monochrome', size: 12 }
                }
            };
            const result = render(options, contentWithPPCLogo, mockLog);
            expect(result).toContain('data:local/ppc-single-black');
            expect(result).not.toContain('https://example.com/ppc-logo.svg');
        });

        test('white text color maps to WHITE key for PayPal Credit logo', () => {
            const options = {
                style: {
                    ...baseOptions.style,
                    logo: { type: 'primary', position: 'left' },
                    text: { color: 'white', size: 12 }
                }
            };
            const result = render(options, contentWithPPCLogo, mockLog);
            expect(result).toContain('data:local/ppc-single-white');
            expect(result).not.toContain('https://example.com/ppc-logo.svg');
        });
    });

    describe('Venmo logo resolution', () => {
        const venmoLogoBlock = {
            type: 'IMAGE',
            source_url: 'https://example.com/venmo-logo.svg',
            alternative_text: 'Venmo',
            name: 'venmo_logo'
        };
        const contentWithVenmoLogo = {
            ...baseV2Content,
            main_items: [venmoLogoBlock, { type: 'TEXT', text: 'Pay with Venmo' }]
        };

        test('renders local Venmo asset instead of source_url', () => {
            const result = render(baseOptions, contentWithVenmoLogo, mockLog);
            expect(result).toContain('data:local/venmo-color');
            expect(result).not.toContain('https://example.com/venmo-logo.svg');
        });

        test('white text color maps to WHITE key for Venmo logo', () => {
            const options = {
                style: { ...baseOptions.style, text: { color: 'white', size: 12 } }
            };
            const result = render(options, contentWithVenmoLogo, mockLog);
            expect(result).toContain('data:local/venmo-white');
        });

        test('grayscale text color maps to GRAYSCALE key for Venmo logo', () => {
            const options = {
                style: { ...baseOptions.style, text: { color: 'grayscale', size: 12 } }
            };
            const result = render(options, contentWithVenmoLogo, mockLog);
            expect(result).toContain('data:local/venmo-grayscale');
        });

        test('alternative type still renders the single Venmo asset (no monogram variant)', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'alternative', position: 'left' } } };
            const result = render(options, contentWithVenmoLogo, mockLog);
            expect(result).toContain('data:local/venmo-color');
        });

        test('inline renders the same single Venmo asset in CPS order', () => {
            const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'left' } } };
            const content = {
                ...baseV2Content,
                main_items: [{ type: 'TEXT', text: 'Pay with' }, venmoLogoBlock, { type: 'TEXT', text: 'Venmo' }]
            };
            const result = render(options, content, mockLog);
            expect(result).toMatch(/Pay with[\s\S]*?<span[^>]*class="logo[\s\S]*?<\/span>[\s\S]*?Venmo/);
            expect(result).toContain('data:local/venmo-color');
        });
    });
});

describe('v2 render logo compatibility warnings', () => {
    test('alternative + explicit non-left position warns and normalizes to left', () => {
        const localLog = jest.fn();
        const options = { style: { ...baseOptions.style, logo: { type: 'alternative', position: 'top' } } };
        render(options, baseV2Content, localLog);
        expect(localLog).toHaveBeenCalledWith(expect.stringContaining('style.logo.position'));
        expect(localLog).toHaveBeenCalledWith(expect.stringContaining('"top"'));
    });

    test('inline type + explicit non-left position warns that inline overrides it', () => {
        const localLog = jest.fn();
        const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'right' } } };
        render(options, baseV2Content, localLog);
        expect(localLog).toHaveBeenCalledWith(expect.stringContaining('"inline"'));
        expect(localLog).toHaveBeenCalledWith(expect.stringContaining('"right"'));
    });

    test('none type + explicit non-left position warns that the brand renders as text', () => {
        const localLog = jest.fn();
        const options = { style: { ...baseOptions.style, logo: { type: 'none', position: 'right' } } };
        render(options, baseV2Content, localLog);
        expect(localLog).toHaveBeenCalledWith(expect.stringContaining('brand renders as text'));
    });

    test('primary + left (defaults) does not warn', () => {
        const localLog = jest.fn();
        render(baseOptions, baseV2Content, localLog);
        expect(localLog).not.toHaveBeenCalled();
    });

    test('alternative + default (unset) position does not warn', () => {
        const localLog = jest.fn();
        const options = { style: { ...baseOptions.style, logo: { type: 'alternative' } } };
        render(options, baseV2Content, localLog);
        expect(localLog).not.toHaveBeenCalled();
    });

    test('render works without a log callback', () => {
        const options = { style: { ...baseOptions.style, logo: { type: 'inline', position: 'right' } } };
        expect(() => render(options, baseV2Content)).not.toThrow();
    });
});

describe('v2 render deferred block types', () => {
    test('unknown block type renders as empty text, not broken markup', () => {
        const content = {
            ...baseV2Content,
            main_items: [
                { type: 'TEXT', text: 'Buy now,' },
                { type: 'TEXT_VARIABLE', name: 'installment_amount' },
                { type: 'TEXT', text: 'pay later' }
            ]
        };
        const result = render(baseOptions, content, mockLog);
        expect(result).toContain('Buy now,');
        expect(result).toContain('pay later');
        expect(result).not.toContain('undefined');
        expect(result).not.toContain('[object Object]');
    });
});

describe('v2 render fontSource', () => {
    test('generates @font-face rule for a single fontSource URL', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: { color: 'black', size: 12, fontSource: ['https://example.com/font.woff2'] }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).toContain('@font-face');
        expect(result).toContain("url('https://example.com/font.woff2')");
        expect(result).toContain("font-family: 'PP Merchant Font 1'");
    });

    test('prepends custom font name to font-family stack', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: { color: 'black', size: 12, fontSource: ['https://example.com/font.woff2'] }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).toMatch(/font-family:\s*'PP Merchant Font 1',/);
        expect(result).not.toContain('"PayPal Pro"');
    });

    test('generates one @font-face rule per fontSource URL', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: {
                    color: 'black',
                    size: 12,
                    fontSource: ['https://example.com/font1.woff2', 'https://example.com/font2.woff2']
                }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).toContain("url('https://example.com/font1.woff2')");
        expect(result).toContain("url('https://example.com/font2.woff2')");
        expect(result).toContain("'PP Merchant Font 1'");
        expect(result).toContain("'PP Merchant Font 2'");
    });

    test('includes explicit fontFamily after fontSource names in font-family stack', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: {
                    color: 'black',
                    size: 12,
                    fontSource: ['https://example.com/font.woff2'],
                    fontFamily: ['MyFont']
                }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).toMatch(/'PP Merchant Font 1',\s*'MyFont',/);
    });

    test('includes explicit fontFamily without fontSource', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: { color: 'black', size: 12, fontFamily: ['Impact', 'sans-serif'] }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).toContain("font-family: 'Impact', sans-serif, Helvetica");
    });

    test('uses v5-matching default font-family when fontSource is not provided', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).not.toContain('@font-face');
        expect(result).toContain('font-family: Helvetica, Arial, sans-serif;');
    });

    test('uses v5-matching default font-family when fontSource is empty array', () => {
        const options = {
            style: { ...baseOptions.style, text: { color: 'black', size: 12, fontSource: [] } }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).not.toContain('@font-face');
        expect(result).toContain('font-family: Helvetica, Arial, sans-serif;');
    });

    test('ignores unsafe fontSource URLs', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: { color: 'black', size: 12, fontSource: ['./font.woff2'] }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).not.toContain('@font-face');
        expect(result).not.toContain('./font.woff2');
    });

    test('ignores unsafe fontFamily values', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: { color: 'black', size: 12, fontFamily: ["</style><script>alert('x')</script>"] }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).not.toContain('<script>');
        expect(result).toContain('font-family: Helvetica, Arial, sans-serif;');
    });

    test('fontSource with </style> tag injection is rejected', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: {
                    color: 'black',
                    size: 12,
                    fontSource: ['https://evil.com/f.woff2</style><script>alert(1)</script>']
                }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).not.toContain('@font-face');
        expect(result).not.toContain('<script>');
    });

    test('fontSource with CSS escape characters is rejected', () => {
        const options = {
            style: {
                ...baseOptions.style,
                text: {
                    color: 'black',
                    size: 12,
                    fontSource: ['https://evil.com/f.woff2) } body { color: red; } a {']
                }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).not.toContain('@font-face');
    });

    test('fontSource with javascript: scheme is rejected', () => {
        // eslint-disable-next-line no-script-url -- asserting this scheme is rejected, not executing it
        const maliciousSource = 'javascript:alert(1)';
        const options = {
            style: {
                ...baseOptions.style,
                text: { color: 'black', size: 12, fontSource: [maliciousSource] }
            }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).not.toContain('@font-face');
        // eslint-disable-next-line no-script-url -- asserting this scheme is rejected, not executing it
        expect(result).not.toContain('javascript:');
    });
});

describe('v2 render snapshots', () => {
    const contentWithLogo = {
        main_items: [
            {
                type: 'IMAGE',
                source_url: 'https://example.com/logo.svg',
                alternative_text: 'PayPal',
                name: 'paypal_logo'
            },
            { type: 'TEXT', text: 'Pay Later.' }
        ],
        action_items: [{ type: 'LINK', text: 'Learn more', click_url: 'https://example.com/lander', embeddable: true }],
        disclaimer_items: [{ type: 'TEXT', text: 'Subject to approval.' }]
    };

    const baseStyleOptions = {
        style: {
            layout: 'text',
            logo: { type: 'primary', position: 'left' },
            text: { color: 'black', size: 12, align: 'left' }
        }
    };

    test('full render snapshot for representative case', () => {
        expect(render(baseStyleOptions, contentWithLogo)).toMatchSnapshot();
    });

    test('renders the v2 stylesheet once', () => {
        const result = render(baseStyleOptions, contentWithLogo);
        expect(result.match(/<style>[\s\S]*?<\/style>/)[0]).toMatchSnapshot();
    });

    test.each([['primary'], ['alternative'], ['inline'], ['none']])('maps logo type: %s', logoType => {
        const options = {
            style: {
                layout: 'text',
                logo: { type: logoType, position: 'left' },
                text: { color: 'black', size: 12, align: 'left' }
            }
        };
        const result = render(options, contentWithLogo);
        expect(result).toContain(`data-pp-style-logo-type="${logoType}"`);
    });

    test.each([['left'], ['right'], ['top']])('maps logo position: %s', position => {
        const options = {
            style: {
                layout: 'text',
                logo: { type: 'primary', position },
                text: { color: 'black', size: 12, align: 'left' }
            }
        };
        const result = render(options, contentWithLogo);
        expect(result).toContain(`data-pp-style-logo-position="${position}"`);
    });

    test.each([['black'], ['white'], ['monochrome'], ['grayscale']])('applies text color class and CSS: %s', color => {
        const options = {
            style: {
                layout: 'text',
                logo: { type: 'primary', position: 'left' },
                text: { color, size: 12, align: 'left' }
            }
        };
        const result = render(options, baseV2Content);
        expect(result).toMatch(new RegExp(`class="main[^"]*${color}`));
        expect(result).toContain(`.pp-message .main.${color}`);
    });

    test('inline logo with white text color resolves white local asset (no CSS filter)', () => {
        const result = render(
            {
                style: {
                    layout: 'text',
                    logo: { type: 'inline', position: 'left' },
                    text: { color: 'white', size: 12, align: 'left' }
                }
            },
            contentWithLogo
        );

        // Local white asset is used; CSS color filters are not relied upon
        expect(result).toContain('data:local/inline-white');
        expect(result).not.toContain('.pp-message .logo.white img');
        expect(result).not.toContain('https://example.com/logo.svg');
    });

    test.each([[10], [11], [12], [13], [14], [15], [16]])('maps text size: %spx', size => {
        const options = {
            style: {
                layout: 'text',
                logo: { type: 'primary', position: 'left' },
                text: { color: 'black', size, align: 'left' }
            }
        };
        const result = render(options, baseV2Content);
        expect(result).toContain(`data-pp-style-text-size="${size}"`);
    });

    test.each([['left'], ['center'], ['right']])('maps text align: %s', align => {
        const options = {
            style: {
                layout: 'text',
                logo: { type: 'primary', position: 'left' },
                text: { color: 'black', size: 12, align }
            }
        };
        const result = render(options, baseV2Content);
        expect(result).toContain(`data-pp-style-text-align="${align}"`);
    });
});

describe('v2 render flex layout', () => {
    const baseFlexOptions = {
        style: {
            layout: 'flex',
            color: 'blue',
            ratio: '8x1'
        }
    };

    const flexContentWithLogo = {
        main_items: [
            {
                type: 'IMAGE',
                source_url: 'https://example.com/logo.svg',
                alternative_text: 'PayPal',
                name: 'paypal_logo'
            },
            { type: 'TEXT', text: 'Pay Later.' }
        ],
        action_items: [{ type: 'LINK', text: 'Learn more', click_url: 'https://example.com/lander', embeddable: true }],
        disclaimer_items: [{ type: 'TEXT', text: 'Subject to approval.' }]
    };

    test('renders pp-message.pp-flex root element', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('class="pp-message pp-flex');
    });

    test('does not use v5 cascade structure', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).not.toContain('message__container');
        expect(result).not.toContain('message__headline');
        expect(result).not.toContain('message__foreground');
        expect(result).not.toContain('message__content');
        expect(result).not.toContain('message__background');
    });

    test('renders pp-flex__background and pp-flex__content layers', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('class="pp-flex__background"');
        expect(result).toContain('class="pp-flex__content"');
    });

    test('renders logo in pp-flex__logo-container when IMAGE item is present', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('class="pp-flex__logo-container"');
        expect(result).toContain('class="pp-flex__logo paypal"');
        expect(result).toContain('data:local/white-monogram');
        expect(result).toContain('data:local/white-wordmark');
        expect(result).not.toContain('https://example.com/logo.svg');
        expect(result).toContain('aria-hidden="true"');
        expect(result.match(/class="pp-flex__logo paypal"/g)).toHaveLength(2);
    });

    test('renders single PayPal Credit lockup with brand class', () => {
        const content = {
            ...flexContentWithLogo,
            main_items: [
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/ppc.svg',
                    alternative_text: 'PayPal Credit',
                    name: 'paypal_credit_logo'
                },
                { type: 'TEXT', text: 'Pay Later.' }
            ]
        };
        const result = render(baseFlexOptions, content, mockLog);
        expect(result).toContain('class="pp-flex__logo paypal-credit"');
        expect(result).toContain('data:local/ppc-single-white');
        expect(result).not.toContain('data:local/white-monogram');
        expect(result).not.toContain('https://example.com/ppc.svg');
        expect(result.match(/class="pp-flex__logo paypal-credit"/g)).toHaveLength(1);
    });

    test('renders single Venmo lockup with brand class', () => {
        const content = {
            ...flexContentWithLogo,
            main_items: [
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/venmo.svg',
                    alternative_text: 'Venmo',
                    name: 'venmo_logo'
                },
                { type: 'TEXT', text: 'Pay Later.' }
            ]
        };
        const result = render(baseFlexOptions, content, mockLog);
        expect(result).toContain('class="pp-flex__logo venmo"');
        expect(result).toContain('data:local/venmo-white');
        expect(result).not.toContain('https://example.com/venmo.svg');
        expect(result.match(/class="pp-flex__logo venmo"/g)).toHaveLength(1);
    });

    test('renders unknown IMAGE as fallback lockup span', () => {
        const content = {
            ...flexContentWithLogo,
            main_items: [
                {
                    type: 'IMAGE',
                    source_url: 'https://example.com/unknown.svg',
                    alternative_text: 'Unknown Brand'
                },
                { type: 'TEXT', text: 'Pay Later.' }
            ]
        };
        const result = render(baseFlexOptions, content, mockLog);
        expect(result).toContain('class="pp-flex__logo pp-flex__logo--fallback"');
        expect(result).toContain('https://example.com/unknown.svg');
        expect(result.match(/class="pp-flex__logo pp-flex__logo--fallback"/g)).toHaveLength(1);
    });

    test('flex stylesheet sizes single-piece lockups larger than PayPal monograms', () => {
        const result1x1 = render(
            { style: { layout: 'flex', color: 'blue', ratio: '1x1' } },
            flexContentWithLogo,
            mockLog
        );
        const css1x1 = result1x1.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css1x1).toMatch(/\.pp-flex__logo\.paypal-credit:nth-of-type\(1\)[\s\S]*width:\s*50%/);
        expect(css1x1).toMatch(/\.pp-flex__logo\.venmo:nth-of-type\(1\)[\s\S]*width:\s*50%/);
        expect(css1x1).toMatch(/\.pp-flex__logo:only-child[\s\S]*width:\s*50%/);
        expect(css1x1).toMatch(/\.pp-message\.pp-flex\.r-1x1 \.pp-flex__logo:nth-of-type\(1\)[\s\S]*width:\s*29px/);

        const result1x4 = render(
            { style: { layout: 'flex', color: 'blue', ratio: '1x4' } },
            flexContentWithLogo,
            mockLog
        );
        const css1x4 = result1x4.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css1x4).toMatch(/\.pp-flex__logo\.paypal-credit:nth-of-type\(1\)[\s\S]*width:\s*70%/);
        expect(css1x4).toMatch(/\.pp-message\.pp-flex\.r-1x4 \.pp-flex__logo:nth-of-type\(1\)[\s\S]*width:\s*27px/);

        const result8x1 = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css8x1 = result8x1.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css8x1).toMatch(
            /@media \(max-aspect-ratio: 61\/10\) and \(min-width: 324px\)[\s\S]*\.pp-flex__logo\.paypal-credit:nth-of-type\(1\)[\s\S]*width:\s*60%/
        );
    });

    test('omits logo-container when no IMAGE item in main_items', () => {
        const content = { ...flexContentWithLogo, main_items: [{ type: 'TEXT', text: 'Pay Later.' }] };
        const result = render(baseFlexOptions, content, mockLog);
        expect(result).not.toContain('class="pp-flex__logo-container"');
        expect(result).not.toContain('class="pp-flex__logo"');
    });

    test('renders main text in pp-flex__main', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('class="pp-flex__main"');
        expect(result).toContain('Pay Later.');
    });

    test('renders action items in pp-flex__action without click_url iframe attrs', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('class="pp-flex__action"');
        expect(result).toContain('Learn more');
        expect(result).not.toContain('data-iframe-url');
        expect(result).not.toContain('data-embeddable');
        expect(result).not.toContain('https://example.com/lander');
    });

    test('omits pp-flex__action when action_items is empty', () => {
        const content = { ...flexContentWithLogo, action_items: [] };
        const result = render(baseFlexOptions, content, mockLog);
        expect(result).not.toContain('class="pp-flex__action"');
    });

    test('renders disclaimer in pp-flex__disclaimer', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('class="pp-flex__disclaimer"');
        expect(result).toContain('Subject to approval.');
    });

    test('omits pp-flex__disclaimer when disclaimer_items is empty', () => {
        const content = { ...flexContentWithLogo, disclaimer_items: [] };
        const result = render(baseFlexOptions, content, mockLog);
        expect(result).not.toContain('class="pp-flex__disclaimer"');
    });

    test('keeps non-LINK action copy in pp-flex__action (GB Credit option pattern)', () => {
        const content = {
            ...flexContentWithLogo,
            disclaimer_items: [],
            action_items: [
                { type: 'TEXT', text: 'Credit option. ' },
                { type: 'LINK', text: 'Learn more', click_url: 'https://example.com/lander', embeddable: true }
            ]
        };
        const result = render(baseFlexOptions, content, mockLog);
        expect(result).not.toContain('class="pp-flex__disclaimer"');
        const actionMatch = result.match(/class="pp-flex__action"[^>]*>([\s\S]*?)<\/div>/);
        expect(actionMatch).not.toBeNull();
        expect(actionMatch[1]).toContain('Credit option.');
        expect(actionMatch[1]).toContain('Learn more');
    });

    test('IMAGE item does not appear in pp-flex__main (logo is extracted)', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const mainMatch = result.match(/class="pp-flex__main"[^<]*([\s\S]*?)<\/div>/);
        expect(mainMatch).not.toBeNull();
        const mainContent = mainMatch[0];
        expect(mainContent).not.toContain('src="https://example.com/logo.svg"');
    });

    test.each([['blue'], ['black'], ['white'], ['white-no-border'], ['gray'], ['monochrome'], ['grayscale']])(
        'maps color %s to class on root element',
        color => {
            const options = { style: { layout: 'flex', color, ratio: '8x1' } };
            const result = render(options, flexContentWithLogo, mockLog);
            expect(result).toContain(`class="pp-message pp-flex ${color}`);
            expect(result).toContain(`data-pp-style-color="${color}"`);
        }
    );

    test.each([['1x1'], ['1x4'], ['8x1'], ['20x1']])('maps ratio %s to class on root element', ratio => {
        const options = { style: { layout: 'flex', color: 'blue', ratio } };
        const result = render(options, flexContentWithLogo, mockLog);
        expect(result).toContain(`r-${ratio}`);
        expect(result).toContain(`data-pp-style-ratio="${ratio}"`);
    });

    test('emits data-pp-style-layout="flex"', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('data-pp-style-layout="flex"');
    });

    test('flex stylesheet includes color background rule', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('.pp-message.pp-flex.blue .pp-flex__background');
        expect(result).toContain('#023188');
    });

    test('flex stylesheet includes all 7 color themes', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('.pp-message.pp-flex.blue');
        expect(result).toContain('.pp-message.pp-flex.black');
        expect(result).toContain('.pp-message.pp-flex.white');
        expect(result).toContain('.pp-message.pp-flex.white-no-border');
        expect(result).toContain('.pp-message.pp-flex.gray');
        expect(result).toContain('.pp-message.pp-flex.monochrome');
        expect(result).toContain('.pp-message.pp-flex.grayscale');
    });

    test('flex stylesheet emits ratio-specific layout rules', () => {
        const result8x1 = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css8x1 = result8x1.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css8x1).toContain('.pp-message.pp-flex.r-8x1 .pp-flex__content');
        expect(css8x1).not.toContain('transform: translateY(-80px)');
        expect(css8x1).not.toContain('.pp-message.pp-flex.r-20x1 .pp-flex__content');

        const result1x1 = render(
            { style: { layout: 'flex', color: 'blue', ratio: '1x1' } },
            flexContentWithLogo,
            mockLog
        );
        const css1x1 = result1x1.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css1x1).toMatch(/\.pp-message\.pp-flex\.r-1x1 \.pp-flex__logo-container[\s\S]*width:\s*100%/);
        expect(css1x1).not.toContain('.pp-message.pp-flex.r-8x1 .pp-flex__content');
        expect(css1x1).not.toContain('@media (min-aspect-ratio: 200/11)');

        const result1x4 = render(
            { style: { layout: 'flex', color: 'blue', ratio: '1x4' } },
            flexContentWithLogo,
            mockLog
        );
        const css1x4 = result1x4.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css1x4).toContain('transform: translateY(-80px)');
        expect(css1x4).not.toContain('.pp-message.pp-flex.r-8x1 .pp-flex__content');
    });

    test('flex stylesheet does not include text-layout selectors', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).not.toContain('.pp-message .main');
        expect(css).not.toContain('.pp-message .action');
        expect(css).not.toContain('.pp-message .logo');
    });

    test('flex stylesheet sizes html, body, and button to fill iframe', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(/html,\s*body,\s*button\s*\{[^}]*height:\s*100%/);
        expect(css).toContain('button {');
        expect(css).toContain('width: 100%');
    });

    test('flex stylesheet underlines action and disclaimer links', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toContain('.pp-flex__action span');
        expect(css).toContain('.pp-flex__disclaimer span');
        expect(css).toMatch(/\.pp-flex__action span[\s\S]*text-decoration:\s*underline/);
        expect(css).not.toContain('[data-iframe-url]');
    });

    test('flex portrait pairs action and disclaimer font sizing', () => {
        const result = render({ style: { layout: 'flex', color: 'blue', ratio: '1x4' } }, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(
            /\.pp-message\.pp-flex\.r-1x4 \.pp-flex__disclaimer,\s*\n\.pp-message\.pp-flex\.r-1x4 \.pp-flex__action[\s\S]*font-size:\s*0\.9rem/
        );
        expect(result).toContain('Learn more');
    });

    test('flex action links inherit theme color rather than text-layout blue', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).not.toContain('#0070ba');
    });

    test('flex white theme uses color logo assets', () => {
        const options = { style: { layout: 'flex', color: 'white', ratio: '8x1' } };
        const result = render(options, flexContentWithLogo, mockLog);
        expect(result).toContain('data:local/color-monogram');
        expect(result).toContain('data:local/color-wordmark');
        expect(result).not.toContain('https://example.com/logo.svg');
    });

    test('flex stylesheet applies theme logo filters for dark backgrounds', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(
            /\.pp-message\.pp-flex\.blue \.pp-flex__logo img[\s\S]*filter:\s*brightness\(0\) invert\(1\)/
        );
        expect(css).toMatch(/\.pp-message\.pp-flex\.monochrome \.pp-flex__logo img[\s\S]*filter:\s*grayscale\(100%\)/);
    });

    test('flex stylesheet includes img display rules for renderV2 logo markup', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toContain('.pp-flex__logo img {');
        expect(css).toMatch(/\.pp-flex__logo img[\s\S]*display:\s*block/);
    });

    test('flex landscape uses row flex layout for 8x1 and 20x1', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(
            /\.pp-message\.pp-flex\.r-8x1 \.pp-flex__content[\s\S]*display:\s*flex[\s\S]*flex-direction:\s*row/
        );
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-8x1 \.pp-flex__logo[\s\S]*width:\s*60%/);
        expect(css).toMatch(/\.pp-flex__logo img[\s\S]*width:\s*100%/);
    });

    test('flex landscape narrow path shares locale-A logo rules for 8x1 and 20x1', () => {
        ['8x1', '20x1'].forEach(ratio => {
            const result = render({ style: { layout: 'flex', color: 'blue', ratio } }, flexContentWithLogo, mockLog);
            const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
            expect(css).toMatch(
                new RegExp(
                    `\\.pp-message\\.pp-flex\\.r-${ratio} \\.pp-flex__logo:nth-of-type\\(2\\)[\\s\\S]*display:\\s*none`
                )
            );
            expect(css).toMatch(
                new RegExp(
                    `@media \\(max-aspect-ratio: 61/10\\)[\\s\\S]*\\.pp-message\\.pp-flex\\.r-${ratio} \\.pp-flex__logo-container[\\s\\S]*flex-basis:\\s*12%`
                )
            );
            expect(css).toMatch(
                new RegExp(
                    `@media \\(max-aspect-ratio: 61/10\\)[\\s\\S]*\\.pp-message\\.pp-flex\\.r-${ratio} \\.pp-flex__logo-container[\\s\\S]*margin-bottom:\\s*-6px`
                )
            );
            expect(css).toContain(`@media (max-aspect-ratio: 61/10) and (min-width: 324px)`);
            expect(css).toContain(`@media (max-aspect-ratio: 61/10) and (max-width: 323px)`);
        });
    });

    test('flex 1x4 centers messaging vertically and uses full-width logo container', () => {
        const options = { style: { layout: 'flex', color: 'blue', ratio: '1x4' } };
        const result = render(options, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-1x4 \.pp-flex__logo-container[\s\S]*width:\s*100%/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-1x4 \.pp-flex__messaging[\s\S]*justify-content:\s*center/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-1x4 \.pp-flex__messaging[\s\S]*transform:\s*translateY\(-80px\)/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-1x4 \.pp-flex__logo:nth-of-type\(1\)[\s\S]*width:\s*27px/);
        expect(css).not.toMatch(/\.pp-message\.pp-flex\.r-1x4 \.pp-flex__logo:nth-of-type\(1\)[\s\S]*max-width:\s*15%/);
    });

    test('flex 1x1 uses US locale logo container and headline sizing', () => {
        const options = { style: { layout: 'flex', color: 'blue', ratio: '1x1' } };
        const result = render(options, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-1x1 \.pp-flex__logo-container[\s\S]*width:\s*100%/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-1x1 \.pp-flex__main[\s\S]*line-height:\s*1\.55em/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-1x1 \.pp-flex__content\s*\{[^}]*padding:\s*7%/);
        expect(css).not.toMatch(/\.pp-message\.pp-flex\.r-1x1 \.pp-flex__content\s*\{[^}]*display:\s*flex/);
        expect(css).toContain('@media (min-width: 140px)');
        expect(result).toContain('Pay Later.');
    });

    test('flex 20x1 centers logo and messaging on one line', () => {
        const options = { style: { layout: 'flex', color: 'blue', ratio: '20x1' } };
        const result = render(options, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(
            /@media \(min-aspect-ratio: 200\/11\)[\s\S]*\.pp-message\.pp-flex\.r-20x1 \.pp-flex__content[\s\S]*align-items:\s*center/
        );
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-20x1 \.pp-flex__content[\s\S]*justify-content:\s*center/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-20x1 \.pp-flex__logo-container[\s\S]*padding-top:\s*2\.5px/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-20x1 \.pp-flex__logo-container[\s\S]*align-self:\s*center/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-20x1 \.pp-flex__logo img[\s\S]*width:\s*100%/);
        expect(css).toMatch(
            /\.pp-message\.pp-flex\.r-20x1 \.pp-flex__messaging[\s\S]*display:\s*flex[\s\S]*flex-direction:\s*row/
        );
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-20x1 \.pp-flex__messaging[\s\S]*align-items:\s*center/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-20x1 \.pp-flex__messaging[\s\S]*align-self:\s*center/);
        expect(css).not.toMatch(/\.pp-message\.pp-flex\.r-20x1 \.pp-flex__main[\s\S]*vertical-align:\s*bottom/);
    });

    test('flex 8x1 keeps disclaimer under main (v5 block flow parity)', () => {
        const options = { style: { layout: 'flex', color: 'blue', ratio: '8x1' } };
        const result = render(options, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-8x1 \.pp-flex__main[\s\S]*display:\s*block/);
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-8x1 \.pp-flex__disclaimer[\s\S]*display:\s*inline/);
        expect(css).toMatch(
            /@media \(min-aspect-ratio: 80\/11\)[\s\S]*\.pp-message\.pp-flex\.r-8x1 \.pp-flex__main[\s\S]*display:\s*block/
        );
    });

    test('flex 8x1 includes dedicated landscape breakpoint rules', () => {
        const options = { style: { layout: 'flex', color: 'blue', ratio: '8x1' } };
        const result = render(options, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toMatch(/\.pp-message\.pp-flex\.r-8x1 \.pp-flex__logo-container[\s\S]*padding-bottom:\s*2\.5px/);
        expect(css).toContain('@media (min-aspect-ratio: 80/11) and (min-width: 500px)');
    });

    test('flex stylesheet includes button focus underline parity with v5 flex base', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).toContain('button:focus .pp-message.pp-flex .pp-flex__content');
    });

    test('grey alias normalizes to gray class', () => {
        const options = { style: { layout: 'flex', color: 'grey', ratio: '8x1' } };
        const validatedStyle = validateStyle(mockLog, options.style);
        const result = render({ style: validatedStyle }, flexContentWithLogo, mockLog);
        expect(result).toContain('class="pp-message pp-flex gray');
        expect(result).not.toContain('class="pp-message pp-flex grey');
    });

    test('handles empty main_items gracefully', () => {
        const content = { ...flexContentWithLogo, main_items: [] };
        const result = render(baseFlexOptions, content, mockLog);
        expect(typeof result).toBe('string');
        expect(result).toContain('class="pp-message pp-flex');
    });

    test('handles missing v2Content fields gracefully', () => {
        const result = render(baseFlexOptions, {}, mockLog);
        expect(typeof result).toBe('string');
        expect(result).toContain('class="pp-message pp-flex');
    });

    test('bare render({ style: { layout: "flex" } }) defaults match validateStyle defaults', () => {
        const validatedStyle = validateStyle(mockLog, { layout: 'flex' });
        const directResult = render({ style: { layout: 'flex' } }, flexContentWithLogo, mockLog);
        const validatedResult = render({ style: validatedStyle }, flexContentWithLogo, mockLog);
        expect(directResult).toContain(`class="pp-message pp-flex ${FLEX_DEFAULTS.color} r-${FLEX_DEFAULTS.ratio}"`);
        expect(directResult).toBe(validatedResult);
    });
});

describe('v2 render flex snapshots', () => {
    const flexContentWithLogo = {
        main_items: [
            {
                type: 'IMAGE',
                source_url: 'https://example.com/logo.svg',
                alternative_text: 'PayPal',
                name: 'paypal_logo'
            },
            { type: 'TEXT', text: 'Pay Later.' }
        ],
        action_items: [{ type: 'LINK', text: 'Learn more', click_url: 'https://example.com/lander', embeddable: true }],
        disclaimer_items: [{ type: 'TEXT', text: 'Subject to approval.' }]
    };

    test('full render snapshot for representative case (blue/8x1)', () => {
        const options = { style: { layout: 'flex', color: 'blue', ratio: '8x1' } };
        expect(render(options, flexContentWithLogo)).toMatchSnapshot();
    });

    test('renders flex stylesheet once', () => {
        const options = { style: { layout: 'flex', color: 'blue', ratio: '8x1' } };
        const result = render(options, flexContentWithLogo);
        expect(result.match(/<style>[\s\S]*?<\/style>/)[0]).toMatchSnapshot();
    });

    test('no-custom-font snapshot uses v5 Helvetica/Arial default stack', () => {
        const options = { style: { layout: 'flex', color: 'blue', ratio: '8x1' } };
        const result = render(options, flexContentWithLogo);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];

        expect(css).not.toContain('@font-face');
        expect(css).not.toContain('PayPal Pro');
        expect(css).toContain('font-family: Helvetica, Arial, sans-serif;');
        expect(css).toMatchSnapshot();
    });

    test('custom fontSource still prepends merchant font before v5 fallbacks', () => {
        const options = {
            style: {
                layout: 'flex',
                color: 'blue',
                ratio: '8x1',
                text: { fontSource: ['https://example.com/font.woff2'] }
            }
        };
        const result = render(options, flexContentWithLogo);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];

        expect(css).toContain('@font-face');
        expect(css).toMatch(/font-family:\s*'PP Merchant Font 1',\s*Helvetica, Arial, sans-serif/);
        expect(css).not.toContain('PayPal Pro');
    });

    test.each([
        ['black', '8x1'],
        ['white', '1x1'],
        ['gray', '1x4'],
        ['monochrome', '20x1']
    ])('flex color=%s ratio=%s renders expected root class and data attributes', (color, ratio) => {
        const options = { style: { layout: 'flex', color, ratio } };
        const result = render(options, flexContentWithLogo);
        expect(result).toContain(`class="pp-message pp-flex ${color} r-${ratio}"`);
        expect(result).toContain(`data-pp-style-color="${color}"`);
        expect(result).toContain(`data-pp-style-ratio="${ratio}"`);
        expect(result).toContain('class="pp-flex__background"');
        expect(result).toContain('class="pp-flex__content"');
    });
});

describe('v2 render stylesheet isolation', () => {
    test('stylesheet is embedded inline — no external CSS dependency', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).toMatch(/<style>[\s\S]*?<\/style>/);
        expect(result).not.toContain('<link');
    });

    test('all stylesheet selectors are scoped to .pp-message or body reset', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        const selectorLines = css
            .split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 0 && !l.startsWith('@') && !l.startsWith('}') && l.includes('{'));
        expect(
            selectorLines.every(l => l.startsWith('.pp-message') || l.startsWith('body') || l.startsWith('button:'))
        ).toBe(true);
    });

    test('preserves v5 message interaction styling', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];

        expect(css).toContain('cursor: pointer;');
        expect(css).toContain('text-decoration: underline;');
        expect(css).toContain('button:focus .pp-message');
    });

    test('flex stylesheet is embedded inline — no external CSS dependency', () => {
        const result = render({ style: { layout: 'flex', color: 'blue', ratio: '8x1' } }, baseV2Content, mockLog);
        expect(result).toMatch(/<style>[\s\S]*?<\/style>/);
        expect(result).not.toContain('<link');
    });

    test('all flex stylesheet selectors are scoped to .pp-message or body reset', () => {
        const result = render({ style: { layout: 'flex', color: 'blue', ratio: '8x1' } }, baseV2Content, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        const selectorLines = css
            .split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 0 && !l.startsWith('@') && !l.startsWith('}') && l.includes('{'));
        expect(
            selectorLines.every(
                l =>
                    l.startsWith('.pp-message') ||
                    l.startsWith('.pp-flex__') ||
                    l.startsWith('body') ||
                    l.startsWith('html') ||
                    l.startsWith('button') ||
                    l.startsWith('*')
            )
        ).toBe(true);
    });
});
