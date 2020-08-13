import fonts from './fonts.scss';
import common from './common.scss';
import modalFrame from './modal-frame.scss';
import header from './header.scss';

export default [fonts._getCss(), common._getCss(), modalFrame._getCss(), header._getCss()].join('\n');
