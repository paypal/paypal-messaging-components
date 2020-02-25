import base from './base.scss';
import reverseLogo from './reverse-logo.scss';
import vertical from './vertical.scss';
import verticalReverseLogo from './vertical&&reverse-logo.scss';
import termsIcon from './terms-icon.scss';

import size168x374 from './size--168x374.scss';
import size234x100 from './size--234x100.scss';
import size310x100 from './size--310x100.scss';
import size765x60 from './size--765x60.scss';
import size1000x50 from './size--1000x50.scss';

import size1000x36 from './size--1000x36.scss';
import size340x60 from './size--340x60.scss';
import size120x90 from './size--120x90.scss';
import size234x60 from './size--234x60.scss';
import size250x250 from './size--250x250.scss';
import size300x50 from './size--300x50.scss';
import size468x60 from './size--468x60.scss';
import size728x90 from './size--728x90.scss';
import size540x200 from './size--540x200.scss';
import size170x100 from './size--170x100.scss';

const styleMap = {
    x168x374: { styles: size168x374._getCss(), vertical: true },
    x765x60: { styles: size765x60._getCss() },
    x1000x50: { styles: size1000x50._getCss(), termsIcon: true },
    x234x100: { styles: size234x100._getCss(), reverseLogo: true },
    x310x100: { styles: size310x100._getCss(), reverseLogo: true },

    x1000x36: { styles: size1000x36._getCss(), termsIcon: true },
    x120x90: { styles: size120x90._getCss(), termsIcon: true },
    x234x60: { styles: size234x60._getCss(), reverseLogo: true, termsIcon: true },
    x250x250: { styles: size250x250._getCss(), reverseLogo: true, vertical: true, termsIcon: true },
    x300x50: { styles: size300x50._getCss(), reverseLogo: true },
    x340x60: { styles: size340x60._getCss(), reverseLogo: true },
    x468x60: { styles: size468x60._getCss(), reverseLogo: true, termsIcon: true },
    x728x90: { styles: size728x90._getCss(), reverseLogo: true },
    x540x200: { styles: size540x200._getCss(), reverseLogo: true, termsIcon: true },
    x170x100: { styles: size170x100._getCss(), termsIcon: true }
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

export default [['default', base._getCss()], ...dynamicStyles, ...sizeStyles];
