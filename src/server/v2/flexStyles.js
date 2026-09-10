import { buildFontRules } from '../message/font';

const DEFAULT_FONT_FAMILY = 'Helvetica, Arial, sans-serif';
const FONT_FALLBACKS = 'Helvetica, Arial, sans-serif';

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

// Build ratio-scoped selectors for flex layout CSS (e.g. rs('8x1', '.pp-flex__main')).
const rs = (ratio, sub) => `.pp-message.pp-flex.r-${ratio} ${sub}`;

// Same as rs, with leading indent for rules nested inside @media blocks.
const rsMedia = (ratio, sub, indent = '    ') => `${indent}${rs(ratio, sub)}`;

// Comma-join multiple ratio-scoped selectors that share the same declarations.
const rsPair = (ratio, ...subs) => subs.map(sub => rs(ratio, sub)).join(',\n');

// Single-piece lockups (PPC/Venmo/fallback). Include :nth-of-type(1) so brand
// selectors beat dual-PayPal monogram rules; :only-child covers unnamed fallbacks.
const LOCKUP_LOGO_SUBS = [
    '.pp-flex__logo.paypal-credit:nth-of-type(1)',
    '.pp-flex__logo.venmo:nth-of-type(1)',
    '.pp-flex__logo:only-child'
];

const rsLockup = (ratio, indent = '') => LOCKUP_LOGO_SUBS.map(sub => `${indent}${rs(ratio, sub)}`).join(',\n');

const rsMediaLockup = (ratio, indent = '    ') => rsLockup(ratio, indent);

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

function buildBaseRules() {
    return `
* {
    box-sizing: border-box;
}

.pp-flex__logo img {
    display: block;
    width: 100%;
    height: auto;
}

.pp-flex__logo--fallback {
    width: 100%;
}

button:focus .pp-message.pp-flex .pp-flex__content,
button:focus .pp-message.pp-flex .pp-flex__content span.br {
    text-decoration: underline;
}

.pp-flex__disclaimer span,
.pp-flex__action span {
    text-decoration: underline;
    font-weight: 300;
}

.pp-flex__action span {
    white-space: nowrap;
}

.pp-flex__disclaimer {
    white-space: normal;
}

.pp-flex__logo-container {
    display: flex;
    align-items: center;
}`;
}

function buildPortrait1x1Rules() {
    return `
${rs('1x1', '.pp-flex__content')} {
    padding: 7%;
}

${rs('1x1', '.pp-flex__logo-container')} {
    width: 100%;
    margin-bottom: 12%;
}

${rs('1x1', '.pp-flex__logo:nth-of-type(1)')} {
    width: 29px;
    max-width: 15%;
}

${rs('1x1', '.pp-flex__logo:nth-of-type(2)')} {
    width: 91px;
    max-width: 45%;
    margin-left: 3%;
}

${rsLockup('1x1')} {
    width: 50%;
    max-width: 50%;
}

${rs('1x1', '.pp-flex__main')} {
    font-size: 10vw;
    line-height: 1.55em;
    font-weight: 400;
}

${rsPair('1x1', '.pp-flex__disclaimer', '.pp-flex__action')} {
    position: static;
    width: 80%;
    font-size: 9.5px;
    white-space: normal;
}

${rs('1x1', '.pp-flex__main + .pp-flex__disclaimer')},
${rs('1x1', '.pp-flex__main + .pp-flex__action')} {
    margin-top: 3%;
}

@media (min-width: 140px) {
    ${rsMedia('1x1', '.pp-flex__main')} { font-size: 8.4vw; }
}

@media (min-width: 170px) {
    ${rsMedia('1x1', '.pp-flex__main')} { font-size: 8vw; }
    ${rsMedia('1x1', '.pp-flex__disclaimer')},
    ${rsMedia('1x1', '.pp-flex__action')} { font-size: 5.5vw; }
}

@media (min-width: 220px) {
    ${rsMedia('1x1', '.pp-flex__disclaimer')},
    ${rsMedia('1x1', '.pp-flex__action')} { font-size: 0.9rem; }
}`;
}

function buildPortrait1x4Rules() {
    return `
${rs('1x4', '.pp-flex__content')} {
    padding: 8%;
}

${rs('1x4', '.pp-flex__logo-container')} {
    width: 100%;
    margin-top: 3%;
}

${rs('1x4', '.pp-flex__messaging')} {
    height: 100%;
    transform: translateY(-80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

${rs('1x4', '.pp-flex__main')} {
    font-size: 1.1rem;
    line-height: 1.3em;
    margin-bottom: 10%;
    font-weight: 400;
}

${rsPair('1x4', '.pp-flex__disclaimer', '.pp-flex__action')} {
    font-size: 0.9rem;
    line-height: 1.1;
}

${rs('1x4', '.pp-flex__logo:nth-of-type(1)')} {
    width: 27px;
    display: inline-block;
    margin-right: 10px;
}

${rs('1x4', '.pp-flex__logo:nth-of-type(2)')} {
    width: 89px;
    display: inline-block;
}

${rsLockup('1x4')} {
    width: 70%;
    max-width: none;
    margin-right: 0;
}

@media (min-height: 500px) {
    ${rsMedia('1x4', '.pp-flex__main')} { font-size: 1.7rem; }
}

@media (aspect-ratio: 1/2) {
    ${rsMedia('1x4', '.pp-flex__messaging')} { transform: translateY(-40px); }
}`;
}

function buildLandscapeMobileBase(ratio) {
    return `
${rs(ratio, '.pp-flex__content')} {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 1rem;
}

${rs(ratio, '.pp-flex__logo-container')} {
    flex: 0 0 33%;
    justify-content: center;
}

${rs(ratio, '.pp-flex__logo')} {
    width: 60%;
}

${rs(ratio, '.pp-flex__logo:nth-of-type(2)')} {
    display: none;
}

${rs(ratio, '.pp-flex__messaging')} {
    flex: 1 1 100%;
}

${rs(ratio, '.pp-flex__main')} {
    font-size: 5vw;
    line-height: 1;
    font-weight: 400;
    display: block;
}

${rs(ratio, '.pp-flex__disclaimer')},
${rs(ratio, '.pp-flex__action')} {
    font-size: 10px;
    line-height: 1.1;
    display: inline;
}

@media (max-aspect-ratio: 61/10) {
    ${rsMedia(ratio, '.pp-flex__logo-container')} {
        flex-basis: 12%;
        margin-bottom: -6px;
        justify-content: flex-start;
        margin-left: 5px;
    }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} {
        margin-left: 10px;
        margin-right: 0;
    }

    ${rsMediaLockup(ratio)} {
        margin-left: 0;
        margin-right: 0;
    }
}

@media (max-aspect-ratio: 61/10) and (min-width: 324px) {
    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} { width: 45%; }

    ${rsMediaLockup(ratio)} { width: 60%; }
}

@media (max-aspect-ratio: 61/10) and (max-width: 374px) {
    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} { width: 50%; }

    ${rsMediaLockup(ratio)} { width: 60%; }
}

@media (max-width: 374px) {
    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} { width: 55%; }
    ${rsMedia(ratio, '.pp-flex__logo-container')} { margin-right: 2.5%; }

    ${rsMediaLockup(ratio)} { width: 60%; }
}

@media (max-aspect-ratio: 61/10) and (max-width: 323px) {
    ${rsMedia(ratio, '.pp-flex__logo-container')} { margin-right: 7%; }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} {
        margin: 0 5px;
        width: 30%;
    }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(2)')} {
        display: inline;
    }

    ${rsMediaLockup(ratio)} {
        margin: 0;
        width: 60%;
    }
}

@media (max-aspect-ratio: 61/10) and (min-width: 400px) {
    ${rsMedia(ratio, '.pp-flex__main')} { font-size: 4vw; margin-bottom: 0.5rem; }
}

@media (max-aspect-ratio: 61/10) and (min-width: 520px) {
    ${rsMedia(ratio, '.pp-flex__disclaimer')},
    ${rsMedia(ratio, '.pp-flex__action')} { font-size: 0.85rem; }
}

@media (max-aspect-ratio: 61/10) and (min-width: 640px) {
    ${rsMedia(ratio, '.pp-flex__main')} { font-size: 1.7rem; }
}`;
}

function buildLandscape8x1Rules() {
    const ratio = '8x1';

    return `${buildLandscapeMobileBase(ratio)}
${rs(ratio, '.pp-flex__logo-container')} {
    padding-bottom: 2.5px;
}

@media (min-aspect-ratio: 80/11) {
    ${rsMedia(ratio, '.pp-flex__main')} {
        display: block;
        line-height: 1.3em;
    }

    ${rsMedia(ratio, '.pp-flex__logo-container')} {
        flex-basis: 12%;
        margin-bottom: -6px;
        justify-content: flex-start;
        margin-left: 5px;
    }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} {
        width: 50%;
        margin-left: 10px;
    }

    ${rsMediaLockup(ratio)} {
        width: 60%;
        margin-left: 0;
    }
}

@media (min-aspect-ratio: 80/11) and (min-width: 500px) {
    ${rsMedia(ratio, '.pp-flex__main')} { font-size: 3vw; }

    ${rsMedia(ratio, '.pp-flex__logo-container')} { flex-basis: 22%; }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} {
        width: 18%;
        margin-right: 5%;
    }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(2)')} {
        display: inline-block;
        width: 55%;
    }

    ${rsMediaLockup(ratio)} {
        width: 60%;
        margin-right: 0;
    }

    ${rsMedia(ratio, '.pp-flex__disclaimer')},
    ${rsMedia(ratio, '.pp-flex__action')} {
        font-size: 0.9rem;
    }
}`;
}
function buildLandscape20x1Rules() {
    const ratio = '20x1';

    return `${buildLandscapeMobileBase(ratio)}
@media (min-aspect-ratio: 200/11) {
    ${rsMedia(ratio, '.pp-flex__content')} {
        justify-content: center;
        align-items: center;
    }

    ${rsMedia(ratio, '.pp-flex__logo-container')} {
        flex: none;
        width: auto;
        max-width: 18%;
        margin-right: 1.5vw;
        align-self: center;
        padding-top: 2.5px;
    }

    ${rsMedia(ratio, '.pp-flex__logo img')} {
        width: 100%;
    }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} {
        width: 20%;
        margin-right: 3%;
    }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(2)')} {
        display: inline-block;
        width: 60%;
    }

    ${rsMediaLockup(ratio)} {
        width: 60%;
        margin-right: 0;
    }

    ${rsMedia(ratio, '.pp-flex__messaging')} {
        flex: none;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        align-self: center;
        width: auto;
        max-width: 75%;
    }

    ${rsMedia(ratio, '.pp-flex__main')} {
        flex: 1 1 auto;
        display: block;
        margin-bottom: 0;
        margin-right: 0.5em;
        font-size: 0.7rem;
        line-height: 1;
        min-width: 0;
    }

    ${rsMedia(ratio, '.pp-flex__disclaimer')},
    ${rsMedia(ratio, '.pp-flex__action')} {
        flex: 0 0 auto;
        display: inline;
        margin-left: 0;
        font-size: 8px;
        line-height: 1.1;
        max-width: 12rem;
    }
}

@media (min-aspect-ratio: 200/11) and (min-width: 400px) {
    ${rsMedia(ratio, '.pp-flex__main')} { font-size: 1rem; }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(1)')} {
        width: 22%;
        margin-right: 5%;
    }

    ${rsMedia(ratio, '.pp-flex__logo:nth-of-type(2)')} {
        display: inline-block;
        width: 65%;
    }

    ${rsMediaLockup(ratio)} {
        width: 60%;
        margin-right: 0;
    }
}

@media (min-aspect-ratio: 200/11) and (min-width: 600px) {
    ${rsMedia(ratio, '.pp-flex__logo-container')} { max-width: 22%; }

    ${rsMedia(ratio, '.pp-flex__main')} { font-size: 1.8vw; }
    ${rsMedia(ratio, '.pp-flex__disclaimer')},
    ${rsMedia(ratio, '.pp-flex__action')} { font-size: 0.75rem; }
}

@media (min-aspect-ratio: 200/11) and (min-width: 1000px) {
    ${rsMedia(ratio, '.pp-flex__disclaimer')},
    ${rsMedia(ratio, '.pp-flex__action')} { font-size: 0.9rem; }
}`;
}

function buildRatioRules(ratio) {
    switch (ratio) {
        case '1x1':
            return buildPortrait1x1Rules();
        case '1x4':
            return buildPortrait1x4Rules();
        case '8x1':
            return buildLandscape8x1Rules();
        case '20x1':
            return buildLandscape20x1Rules();
        default:
            return '';
    }
}

export default function flexStyles({ fontFamily, fontSource, ratio } = {}) {
    const { fontFaceRules, effectiveFontFamily } = buildFontRules({
        fontSource,
        fontFamily,
        fallbackStack: FONT_FALLBACKS,
        defaultFontFamily: DEFAULT_FONT_FAMILY,
        fontNamePrefix: 'PP Merchant Font'
    });
    const fontFaceBlock = fontFaceRules ? `${fontFaceRules}\n` : '';

    return `${fontFaceBlock}
html,
body,
button {
    height: 100%;
}

body {
    margin: 0;
    padding: 0;
}

button {
    width: 100%;
    border: none;
    padding: 0;
}

html {
    font-size: 14px;
    overflow: hidden;
}

.pp-message.pp-flex {
    position: relative;
    width: 100%;
    height: 100vh;
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

${buildBaseRules()}

${buildThemeRules()}

${buildRatioRules(ratio)}
`;
}
