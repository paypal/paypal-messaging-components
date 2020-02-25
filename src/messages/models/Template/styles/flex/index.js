import common from '../common.scss';
import base from './base.scss';
import ratio1x1 from './ratio--1x1.scss';
import ratio1x4 from './ratio--1x4.scss';
import ratio6x1 from './ratio--6x1.scss';
import ratio8x1 from './ratio--8x1.scss';
import ratio20x1 from './ratio--20x1.scss';
import colorBlue from './color--blue.scss';
import colorGray from './color--gray.scss';
import colorBlueRatio1x4 from './color--blue&&ratio--1x4.scss';
import colorBlack from './color--black.scss';
import colorWhite from './color--white.scss';
import colorWhiteNoBorder from './color--white-no-border.scss';

export default [
    ['default', [common._getCss(), base._getCss()].join('\n')],

    ['ratio:1x1', ratio1x1._getCss()],
    ['ratio:1x4', ratio1x4._getCss()],
    ['ratio:8x1', [ratio6x1._getCss(), ratio8x1._getCss()].join('\n')],
    ['ratio:20x1', [ratio6x1._getCss(), ratio20x1._getCss()].join('\n')],

    ['color:blue', colorBlue._getCss()],
    ['color:gray', colorGray._getCss()],
    ['color:black', colorBlack._getCss()],
    ['color:white', colorWhite._getCss()],
    ['color:white-no-border', colorWhiteNoBorder._getCss()],

    ['color:blue && ratio:1x4', colorBlueRatio1x4._getCss()]
];
