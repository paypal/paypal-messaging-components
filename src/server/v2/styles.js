import { buildFontRules } from '../message/font';

// Matches v5's default (src/server/message/styles/common.css `html { ... }`) so v2 doesn't
// render merchant messages in a noticeably different typeface/weight than v5 by default.
const DEFAULT_FONT_FAMILY = 'Helvetica, Arial, sans-serif';
const FONT_FALLBACKS = 'Helvetica, Arial, sans-serif';

const getButtonAlignmentStyles = textAlign => {
    if (textAlign === 'center') {
        return `button { text-align: center; margin: 0 auto; }`;
    }

    if (textAlign === 'right') {
        return `button { text-align: right; margin-left: auto; }`;
    }

    return '';
};

export default ({ fontFamily, fontSource, fontSize = 14, textAlign = 'left' } = {}) => {
    const { fontFaceRules, effectiveFontFamily } = buildFontRules({
        fontSource,
        fontFamily,
        fallbackStack: FONT_FALLBACKS,
        defaultFontFamily: DEFAULT_FONT_FAMILY,
        fontNamePrefix: 'PP Merchant Font'
    });
    const buttonAlignmentStyles = getButtonAlignmentStyles(textAlign);

    return `${fontFaceRules ? `${fontFaceRules}\n` : ''}
body {
    margin: 0;
    padding: 0;
}

.pp-message {
    display: block;
    width: 100%;
    cursor: pointer;
    font-family: ${effectiveFontFamily};
    font-weight: 400;
    font-size: ${fontSize}px;
    line-height: 1.3;
    text-align: ${textAlign};
}${buttonAlignmentStyles ? `\n\n${buttonAlignmentStyles}` : ''}

.pp-message .main.black { color: #000; }
.pp-message .main.monochrome { color: #000; }
.pp-message .main.grayscale { color: #000; }
.pp-message .main.white { color: #fff; }

.pp-message .action [data-iframe-url] {
  color: #0070ba;
  text-decoration: underline;
  text-decoration-color: currentColor;
  white-space: nowrap;
}
.pp-message .action.monochrome > [data-iframe-url] { color: #000; }
.pp-message .action.grayscale > [data-iframe-url] { color: #000; }
.pp-message .action.white > [data-iframe-url] { color: #fff; text-decoration-color: #fff; }

button:focus .pp-message .main,
button:active .pp-message .main {
  text-decoration: underline;
}

.pp-message .logo {
  display: inline-block;
  line-height: 1.3;
  vertical-align: top;
}
.pp-message .logo.top {
  display: block;
}
.pp-message .logo.paypal-credit {
  vertical-align: middle;
}
.pp-message .logo.inline {
  display: inline;
}
.pp-message .logo.inline.paypal-credit {
  vertical-align: middle;
}

.pp-message img {
  max-height: 1.25em;
  height: 1.25em;
  width: auto;
  margin-right: 0.3125em;
}

.pp-message .logo.right img {
  margin-right: 0;
  margin-left: 0.3125em;
}
.pp-message .logo.top img:last-child {
  margin-right: 0;
}
.pp-message .logo.inline img {
  display: inline-block;
  margin-right: 0;
}

.pp-message .logo.inline.paypal-credit img {
  vertical-align: text-top;
  max-height: 1em;
  height: 1em;
}
`;
};
