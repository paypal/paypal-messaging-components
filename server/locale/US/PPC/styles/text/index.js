import base from './base.css';
import textMonochrome from './text--monochrome.css';
import textGrayscale from './text--grayscale.css';
import logoInline from './logo--inline.css';
import logoPrimaryPostionRight from './logo--primary-position--right.css';

export default [
    ['default', base],
    ['text.color:monochrome', textMonochrome],
    ['text.color:grayscale', textGrayscale],
    ['logo.type:inline', logoInline],
    ['logo.type:primary && logo.position:right', logoPrimaryPostionRight]
];
