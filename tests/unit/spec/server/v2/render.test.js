import render from 'server/v2/render';
import validateStyle from 'server/v2/validateStyle';
import { FLEX_DEFAULTS } from 'server/v2/constants';

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
        expect(result).toContain('https://example.com/logo.svg');
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

    test('inline logo type renders logo inside main span via logo-aware path', () => {
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
        // logo is wrapped in .logo.inline span for color-filter CSS to apply
        expect(result).toMatch(/class="logo[^"]*inline[^"]*"/);
        // logo span is nested inside the main span, not a standalone sibling
        const mainIdx = result.indexOf('class="main');
        const logoIdx = result.indexOf('class="logo');
        expect(logoIdx).toBeGreaterThan(mainIdx);
    });

    test('logo type none suppresses logo span even when IMAGE item is present', () => {
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
    });

    test('renders LINK item as a span with data attributes (not an anchor)', () => {
        const content = {
            ...baseV2Content,
            main_items: [
                { type: 'LINK', text: 'Terms apply', click_url: 'https://example.com/terms', embeddable: true }
            ]
        };
        const result = render(baseOptions, content, mockLog);
        expect(result).toContain('Terms apply');
        expect(result).toContain('data-iframe-url="https://example.com/terms"');
        expect(result).toContain('data-embeddable="true"');
        expect(result).not.toContain('<a');
    });

    test('omits data-embeddable when embeddable is not present on LINK item', () => {
        const content = {
            ...baseV2Content,
            main_items: [{ type: 'LINK', text: 'Terms apply', click_url: 'https://example.com/terms' }],
            action_items: []
        };
        const result = render(baseOptions, content, mockLog);
        expect(result).not.toContain('data-embeddable');
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

    test('uses PayPal Pro default font-family when fontSource is not provided', () => {
        const result = render(baseOptions, baseV2Content, mockLog);
        expect(result).not.toContain('@font-face');
        expect(result).toContain('"PayPal Pro"');
    });

    test('uses PayPal Pro default font-family when fontSource is empty array', () => {
        const options = {
            style: { ...baseOptions.style, text: { color: 'black', size: 12, fontSource: [] } }
        };
        const result = render(options, baseV2Content, mockLog);
        expect(result).not.toContain('@font-face');
        expect(result).toContain('"PayPal Pro"');
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
        expect(result).toContain('"PayPal Pro"');
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

    test('applies white logo color filter when logo type is inline', () => {
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

        expect(result).toMatch(/class="logo[^"]*white[^"]*inline/);
        expect(result).toContain('.pp-message .logo.white img');
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
        expect(result).toContain('class="pp-flex__logo"');
        expect(result).toContain('https://example.com/logo.svg');
        expect(result).toContain('role="img"');
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

    test('renders action items in pp-flex__action', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('class="pp-flex__action"');
        expect(result).toContain('Learn more');
        expect(result).toContain('data-iframe-url="https://example.com/lander"');
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

    test('flex stylesheet includes ratio layout rules', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        expect(result).toContain('.pp-message.pp-flex.r-8x1');
        expect(result).toContain('.pp-message.pp-flex.r-20x1');
        expect(result).toContain('.pp-message.pp-flex.r-1x1');
        expect(result).toContain('.pp-message.pp-flex.r-1x4');
    });

    test('flex stylesheet does not include text-layout selectors', () => {
        const result = render(baseFlexOptions, flexContentWithLogo, mockLog);
        const css = result.match(/<style>([\s\S]*?)<\/style>/)[1];
        expect(css).not.toContain('.pp-message .main');
        expect(css).not.toContain('.pp-message .action');
        expect(css).not.toContain('.pp-message .logo');
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
        expect(selectorLines.every(l => l.startsWith('.pp-message') || l.startsWith('body'))).toBe(true);
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
        expect(selectorLines.every(l => l.startsWith('.pp-message') || l.startsWith('body'))).toBe(true);
    });
});
