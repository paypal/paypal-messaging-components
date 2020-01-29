import base from './css/base.css';
import reverseLogo from './css/reverse-logo.css';
import vertical from './css/vertical.css';
import verticalReverseLogo from './css/vertical&&reverse-logo.css';
import termsIcon from './css/terms-icon.css';

import size168x374 from './css/size--168x374.css';
import size234x100 from './css/size--234x100.css';
import size310x100 from './css/size--310x100.css';
import size765x60 from './css/size--765x60.css';
import size1000x50 from './css/size--1000x50.css';

import size1000x36 from './css/size--1000x36.css';
import size340x60 from './css/size--340x60.css';
import size120x90 from './css/size--120x90.css';
import size234x60 from './css/size--234x60.css';
import size250x250 from './css/size--250x250.css';
import size300x50 from './css/size--300x50.css';
import size468x60 from './css/size--468x60.css';
import size728x90 from './css/size--728x90.css';
import size540x200 from './css/size--540x200.css';
import size170x100 from './css/size--170x100.css';

const styleMap = {
    x168x374: { styles: size168x374, vertical: true },
    x765x60: { styles: size765x60 },
    x1000x50: { styles: size1000x50, termsIcon: true },
    x234x100: { styles: size234x100, reverseLogo: true },
    x310x100: { styles: size310x100, reverseLogo: true },

    x1000x36: { styles: size1000x36, termsIcon: true },
    x120x90: { styles: size120x90, termsIcon: true },
    x234x60: { styles: size234x60, reverseLogo: true, termsIcon: true },
    x250x250: { styles: size250x250, reverseLogo: true, vertical: true, termsIcon: true },
    x300x50: { styles: size300x50, reverseLogo: true },
    x340x60: { styles: size340x60, reverseLogo: true },
    x468x60: { styles: size468x60, reverseLogo: true, termsIcon: true },
    x728x90: { styles: size728x90, reverseLogo: true },
    x540x200: { styles: size540x200, reverseLogo: true, termsIcon: true },
    x170x100: { styles: size170x100, termsIcon: true }
};

const dynamicStyles = Object.keys(styleMap).map(k => {
    const settings = styleMap[k];
    const size = k.slice(1);
    const [width, height] = size.split('x');

    let style = `
        .message {
            width: ${width}px;
            min-height: ${height}px;
        }

        .message__container {
            min-height: ${height}px;
        }
    `;

    if (settings.vertical) {
        style = `${style}${vertical}`;
    }

    if (settings.reverseLogo) {
        style = `${style}${reverseLogo}`;
    }

    if (settings.vertical && settings.reverseLogo) {
        style = `${style}${verticalReverseLogo}`;
    }

    if (settings.termsIcon) {
        style = `${style}${termsIcon}`;
    }

    return [`size:${size}`, style];
});

const sizeStyles = Object.keys(styleMap).map(k => [`size:${k.slice(1)}`, styleMap[k].styles]);

export default [['default', base], ...dynamicStyles, ...sizeStyles];
