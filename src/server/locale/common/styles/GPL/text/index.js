import base from './base.css';
import logoPrimary from './logo--primary.css';
import logoAlternative from './logo--alternative.css';
import logoInline from './logo--inline.css';
import logoNone from './logo--none.css';
import logoTop from './logo--top.css';
import logoRight from './logo--right.css';
import textCenter from './text--center.css';
import textCenterLogoPrimary from './text--center-logo--primary.css';
import textCenterLogoRightPrimary from './text--center-logo--right-primary.css';
import textCenterLogoAlternative from './text--center-logo--alternative.css';
import textRight from './text--right.css';
import textRightLogoRight from './text--right-logo--right.css';
import textRightLogoPrimary from './text--right-logo--primary.css';
import textRightLogoAlternative from './text--right-logo--alternative.css';
import textRightLogoInline from './text--right-logo--inline.css';
import logoPrimaryPositionTop from './logo--primary-position--top.css';

export default [
    ['default', base],
    ['logo.type:primary', logoPrimary],
    ['logo.position:top', logoTop],
    ['logo.position:right', logoRight],

    ['logo.type:alternative', logoAlternative],
    ['logo.type:primary && logo.position:top', logoPrimaryPositionTop],

    ['logo.type:inline', logoInline],
    ['logo.type:none', logoNone],

    ['text.align:right', textRight],
    ['text.align:right && logo.position:right', textRightLogoRight],
    ['text.align:right && logo.type:primary', textRightLogoPrimary],
    ['text.align:right && logo.type:alternative', textRightLogoAlternative],
    ['text.align:right && logo.type:inline', textRightLogoInline],

    ['text.align:center', textCenter],
    ['text.align:center && logo.type:primary', textCenterLogoPrimary],
    ['text.align:center && logo.position:right && logo.type:primary', textCenterLogoRightPrimary],
    ['text.align:center && logo.type:alternative', textCenterLogoAlternative]
];
