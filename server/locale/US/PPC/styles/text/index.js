import base from './base.css';
import textMonochrome from './text--monochrome.css';
import textGrayscale from './text--grayscale.css';
import logoInline from './logo--inline.css';
import textRight from './text--right.css';
import textCenter from './text--center.css';
import textCenterLogoRight from './text--center-logo--right.css';
import logoTop from './logo--top.css';

export default [
    ['default', base],
    ['text.color:monochrome', textMonochrome],
    ['text.color:grayscale', textGrayscale],
    ['logo.type:inline', logoInline],
    ['logo.position:top', logoTop],

    ['text.alignment:right', textRight],
    ['text.alignment:center && logo.position:right && logo.type:primary', textCenterLogoRight],
    ['text.alignment:center && logo.position:top', textCenterLogoRight],
    ['text.alignment:center', textCenter]
];
