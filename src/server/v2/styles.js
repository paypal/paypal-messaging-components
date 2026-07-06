import { buildFontRules } from '../message/font';

const DEFAULT_FONT_FAMILY = '"PayPal Pro", Helvetica, Arial, "Liberation Sans", sans-serif';
const FONT_FALLBACKS = 'Helvetica, Arial, "Liberation Sans", sans-serif';

export default ({ fontFamily, fontSource, fontSize = 12, textAlign = 'left' } = {}) => {
    const { fontFaceRules, effectiveFontFamily } = buildFontRules({
        fontSource,
        fontFamily,
        fallbackStack: FONT_FALLBACKS,
        defaultFontFamily: DEFAULT_FONT_FAMILY,
        fontNamePrefix: 'PP Merchant Font'
    });

    return `${fontFaceRules ? `${fontFaceRules}\n` : ''}
body {
    margin: 0;
    padding: 0;
}

.pp-message {
    display: block;
    width: 100%;
    font-family: ${effectiveFontFamily};
    font-weight: 450;
    font-size: ${fontSize}px;
    text-align: ${textAlign};
}

.pp-message .main { vertical-align: middle; }
.pp-message .main.black { color: #000; }
.pp-message .main.monochrome { color: #000; }
.pp-message .main.grayscale { color: #000; }
.pp-message .main.white { color: #fff; }

.pp-message .action [data-iframe-url] {
    color: #0070ba;
    white-space: nowrap;
}
.pp-message .action {
    margin-left: 0.25em;
    vertical-align: middle;
}
.pp-message .action.monochrome > [data-iframe-url] { color: #000; }
.pp-message .action.grayscale > [data-iframe-url] { color: #000; }
.pp-message .action.white > [data-iframe-url] { color: #fff; }

.pp-message .logo { display: inline-block; vertical-align: middle; }
.pp-message .logo.top { display: block; vertical-align: initial; }
.pp-message .logo.inline { display: inline; vertical-align: middle; }

.pp-message img {
    max-height: 1.25em;
    height: 1.25em;
    width: auto;
    vertical-align: middle;
    margin-right: 0.3125em;
}
.pp-message .logo.right img {
    margin-right: 0;
    margin-left: 0.3125em;
}
.pp-message .logo.top img {
    margin-right: 0;
    margin-bottom: 0.3125em;
}
.pp-message .logo.inline img {
    margin-right: 0;
}
`;
};
