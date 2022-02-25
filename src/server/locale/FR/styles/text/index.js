import logoPrimary from './logo--primary.css';
import logoAlternative from './logo--alternative.css';
import logoTop from './logo--top.css';
import logoInline from './logo--inline.css';
import logoNone from './logo--none.css';
import textMonochrome from './text--monochrome.css';
import textGrayscale from './text--grayscale.css';
import textCenter from './text--center.css';
import textCenterLogoPrimary from './text--center-logo--primary.css';
import textCenterLogoAlternative from './text--center-logo--alternative.css';
import textRight from './text--right.css';
import textRightLogoPrimary from './text--right-logo--primary.css';
import textRightLogoAlternative from './text--right-logo--alternative.css';
import textRightLogoInline from './text--right-logo--inline.css';

export default [
    ['logo.type:primary', logoPrimary],
    ['logo.position:top', logoTop],

    ['logo.type:alternative', logoAlternative],

    ['logo.type:inline', logoInline],

    ['logo.type:none', logoNone],

    ['text.color:monochrome', textMonochrome],
    ['text.color:grayscale', textGrayscale],

    ['text.align:right', textRight],
    ['text.align:right && logo.type:primary', textRightLogoPrimary],
    ['text.align:right && logo.type:alternative', textRightLogoAlternative],
    ['text.align:right && logo.type:inline', textRightLogoInline],

    ['text.align:center', textCenter],
    ['text.align:center && logo.type:primary', textCenterLogoPrimary],
    ['text.align:center && logo.type:alternative', textCenterLogoAlternative]
];
