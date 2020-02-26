import base from './base.scss';
import logoInline from './logo--inline.scss';
import textWhite from './text--white.scss';

export default [
    ['default', base._getCss()],
    ['logo.type:inline', logoInline._getCss()],
    ['text.color:white', textWhite._getCss()]
];
