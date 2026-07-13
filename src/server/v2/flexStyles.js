import { buildFontRules } from './font';

const DEFAULT_FONT_FAMILY = '"PayPal Pro", Helvetica, Arial, "Liberation Sans", sans-serif';
const FONT_FALLBACKS = 'Helvetica, Arial, "Liberation Sans", sans-serif';

const FLEX_THEMES = [
    { name: 'blue', background: '#023188', contentColor: '#fff', logoFilter: 'brightness(0) invert(1)' },
    { name: 'black', background: '#000', contentColor: '#fff', logoFilter: 'brightness(0) invert(1)' },
    { name: 'white', background: '#fff', contentColor: '#023187', border: '1px solid #009cde' },
    { name: 'white-no-border', background: '#fff', contentColor: '#023187' },
    { name: 'gray', background: '#eaeced', contentColor: '#023187' },
    {
        name: 'monochrome',
        background: '#fff',
        contentColor: '#000',
        border: '1px solid #000',
        logoFilter: 'grayscale(100%) brightness(0)'
    },
    { name: 'grayscale', background: '#fff', border: '1px solid #b7bcbf', logoFilter: 'grayscale(100%)' }
];

const PORTRAIT_RATIOS = [
    {
        name: '1x1',
        padding: '7%',
        logoWidth: '50%',
        logoMarginBottom: '7%',
        mainFontSize: '10vw',
        mainLineHeight: '1.1em',
        disclaimerFontSize: '9.5px'
    },
    {
        name: '1x4',
        padding: '8%',
        logoWidth: '70%',
        logoMarginBottom: '12%',
        mainFontSize: '1.6rem',
        mainLineHeight: '1.3em',
        disclaimerFontSize: '0.75rem'
    }
];

const LANDSCAPE_RATIOS = ['8x1', '20x1'];

// Joins landscape selectors with an optional indent on continuation lines (for use inside @media blocks).
const lscpSel = (sub, indent = '') =>
    LANDSCAPE_RATIOS.map(r => `.pp-message.pp-flex.r-${r} ${sub}`).join(`,\n${indent}`);

function buildThemeRules() {
    const bgAndContentRules = FLEX_THEMES.flatMap(({ name, background, contentColor, border }) => {
        const decls = [contentColor && `color: ${contentColor}`, border && `border: ${border}`]
            .filter(Boolean)
            .join('; ');
        return [
            `.pp-message.pp-flex.${name} .pp-flex__background { background: ${background}; }`,
            `.pp-message.pp-flex.${name} .pp-flex__content { ${decls}; }`
        ];
    }).join('\n');

    // Group themes sharing the same logo filter to produce grouped selectors.
    const filterGroups = new Map();
    FLEX_THEMES.filter(({ logoFilter }) => logoFilter).forEach(({ name, logoFilter }) => {
        if (!filterGroups.has(logoFilter)) filterGroups.set(logoFilter, []);
        filterGroups.get(logoFilter).push(name);
    });
    const logoFilterRules = Array.from(filterGroups.entries())
        .map(([filter, names]) => {
            const sels = names.map(n => `.pp-message.pp-flex.${n} .pp-flex__logo img`).join(',\n');
            return `${sels} { filter: ${filter}; }`;
        })
        .join('\n');

    return `${bgAndContentRules}\n\n${logoFilterRules}`;
}

function buildPortraitRatioRules() {
    const contentSels = PORTRAIT_RATIOS.map(({ name }) => `.pp-message.pp-flex.r-${name} .pp-flex__content`).join(
        ',\n'
    );
    const messagingSels = PORTRAIT_RATIOS.map(({ name }) => `.pp-message.pp-flex.r-${name} .pp-flex__messaging`).join(
        ',\n'
    );

    const sharedColumnLayout = `${contentSels} {\n    display: flex;\n    flex-direction: column;\n}`;

    const contentPadding = PORTRAIT_RATIOS.map(
        ({ name, padding }) => `.pp-message.pp-flex.r-${name} .pp-flex__content { padding: ${padding}; }`
    ).join('\n');

    const logoContainers = PORTRAIT_RATIOS.map(
        ({ name, logoWidth, logoMarginBottom }) =>
            `.pp-message.pp-flex.r-${name} .pp-flex__logo-container { width: ${logoWidth}; margin-bottom: ${logoMarginBottom}; }`
    ).join('\n');

    const perRatioBase = [contentPadding, logoContainers].join('\n');

    const sharedMessaging = `${messagingSels} { flex: 1; }`;

    const mainBlocks = PORTRAIT_RATIOS.map(
        ({ name, mainFontSize, mainLineHeight }) =>
            `.pp-message.pp-flex.r-${name} .pp-flex__main {\n    font-size: ${mainFontSize};\n    line-height: ${mainLineHeight};\n    font-weight: 400;\n}`
    ).join('\n');

    const disclaimerRules = PORTRAIT_RATIOS.map(
        ({ name, disclaimerFontSize }) =>
            `.pp-message.pp-flex.r-${name} .pp-flex__disclaimer { font-size: ${disclaimerFontSize}; line-height: 1.1; }`
    ).join('\n');

    return [
        sharedColumnLayout,
        [perRatioBase, sharedMessaging].join('\n'),
        [mainBlocks, disclaimerRules].join('\n')
    ].join('\n\n');
}

export default function flexStyles({ fontFamily, fontSource } = {}) {
    const { fontFaceRules, effectiveFontFamily } = buildFontRules({
        fontSource,
        fontFamily,
        fallbackStack: FONT_FALLBACKS,
        defaultFontFamily: DEFAULT_FONT_FAMILY,
        fontNamePrefix: 'PP Merchant Font'
    });
    const fontFaceBlock = fontFaceRules ? `${fontFaceRules}\n` : '';

    return `${fontFaceBlock}
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.pp-message.pp-flex {
    position: relative;
    width: 100%;
    height: 100%;
    font-family: ${effectiveFontFamily};
    font-weight: 300;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
}

.pp-message.pp-flex .pp-flex__background,
.pp-message.pp-flex .pp-flex__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
}

.pp-message.pp-flex .pp-flex__background {
    z-index: -1;
}

${buildThemeRules()}

${buildPortraitRatioRules()}

@media (min-width: 170px) {
    .pp-message.pp-flex.r-1x1 .pp-flex__main { font-size: 8vw; }
    .pp-message.pp-flex.r-1x1 .pp-flex__disclaimer { font-size: 5.5vw; }
}

@media (min-width: 220px) {
    .pp-message.pp-flex.r-1x1 .pp-flex__disclaimer { font-size: 4.5vw; }
}

${lscpSel('.pp-flex__content')} {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 1rem;
}

${lscpSel('.pp-flex__logo-container')} {
    flex: 0 0 33%;
    display: flex;
    justify-content: center;
    align-items: center;
}

${lscpSel('.pp-flex__logo img')} { width: 60%; }

${lscpSel('.pp-flex__messaging')} {
    flex: 1 1 100%;
    display: block;
}

${lscpSel('.pp-flex__main')} {
    font-size: 5vw;
    line-height: 1;
    margin-bottom: 0.2em;
    font-weight: 400;
}

${lscpSel('.pp-flex__disclaimer')} {
    font-size: 10px;
    line-height: 1.1;
    display: inline;
}

@media (max-aspect-ratio: 61/10) and (min-width: 400px) {
    ${lscpSel('.pp-flex__logo-container', '    ')} { flex: 0 0 25%; }
    ${lscpSel('.pp-flex__main', '    ')} { font-size: 4vw; margin-bottom: 0.5rem; }
}

@media (max-aspect-ratio: 61/10) and (min-width: 520px) {
    ${lscpSel('.pp-flex__disclaimer', '    ')} { font-size: 0.85rem; }
}

@media (max-aspect-ratio: 61/10) and (min-width: 640px) {
    ${lscpSel('.pp-flex__main', '    ')} { font-size: 1.7rem; }
}

@media (min-aspect-ratio: 200/11) {
    ${lscpSel('.pp-flex__logo-container', '    ')} { flex: 1 0 20%; }
    ${lscpSel('.pp-flex__logo img', '    ')} { width: 50%; }
    ${lscpSel('.pp-flex__messaging', '    ')} {
        flex: 1 1 85%;
        display: flex;
        align-items: center;
    }
    ${lscpSel('.pp-flex__main', '    ')} { flex: 1 1 60%; font-size: 0.7rem; line-height: 1; }
    ${lscpSel('.pp-flex__disclaimer', '    ')} { flex: 0 0 auto; font-size: 8px; line-height: 1.1; }
}

@media (min-aspect-ratio: 200/11) and (min-width: 400px) {
    ${lscpSel('.pp-flex__main', '    ')} { font-size: 1rem; }
}

@media (min-aspect-ratio: 200/11) and (min-width: 600px) {
    ${lscpSel('.pp-flex__logo-container', '    ')} { flex: 1 0 10%; }
    ${lscpSel('.pp-flex__logo img', '    ')} { width: 60%; }
    ${lscpSel('.pp-flex__main', '    ')} { font-size: 1.8vw; }
    ${lscpSel('.pp-flex__disclaimer', '    ')} { font-size: 0.75rem; }
}

@media (min-aspect-ratio: 200/11) and (min-width: 1000px) {
    ${lscpSel('.pp-flex__disclaimer', '    ')} { font-size: 0.9rem; }
}
`;
}
