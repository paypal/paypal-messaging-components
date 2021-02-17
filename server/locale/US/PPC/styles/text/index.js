import base from './base.css';
import textMonochrome from './text--monochrome.css';
import textGrayscale from './text--grayscale.css';
import logoInline from './logo--inline.css';
import logoTop from './logo--top.css';
import logoPrimaryPostionRight from './logo--primary-position--right.css';
import textRight from './text--right.css';
import textRightLogoRight from './text--right-logo--right.css';
import textRightLogoRightAlternative from './text--right-logo--right-alternative.css';
import textRightLogoRightPrimary from './text--right-logo--right-primary.css';
import textCenter from './text--center.css';
import textCenterLogoRight from './text--center-logo--right.css';
import textCenterLogoRightPrimary from './text--center-logo--right-primary.css';
import textCenterLogoRightAlternative from './text--center-logo--right-alternative.css';
import textCenterLogoTop from './text--center-logo--top.css';

export default [
    ['default', base],
    ['text.color:monochrome', textMonochrome],
    ['text.color:grayscale', textGrayscale],
    ['logo.type:inline', logoInline],
    ['logo.type:primary && logo.position:right', logoPrimaryPostionRight],

    ['logo.position:top', logoTop],

    ['text.align:right', textRight],
    ['text.align:right && logo.position:right', textRightLogoRight],
    ['text.align:right && logo.position:right && logo.type:primary', textRightLogoRightPrimary],
    ['text.align:right && logo.position:right && logo.type:alternative', textRightLogoRightAlternative],

    ['text.align:center', textCenter],
    ['text.align:center && logo.position:top', textCenterLogoTop],
    ['text.align:center && logo.position:right', textCenterLogoRight],
    ['text.align:center && logo.position:right && logo.type:primary', textCenterLogoRightPrimary],
    ['text.align:center && logo.position:right && logo.type:alternative', textCenterLogoRightAlternative]
];
