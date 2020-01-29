import common from '../common.css';
import base from './css/base.css';
import ratio1x1 from './css/ratio--1x1.css';
import ratio1x4 from './css/ratio--1x4.css';
import ratio6x1 from './css/ratio--6x1.css';
import ratio8x1 from './css/ratio--8x1.css';
import ratio20x1 from './css/ratio--20x1.css';
import colorBlue from './css/color--blue.css';
import colorGray from './css/color--gray.css';
import colorBlueRatio1x4 from './css/color--blue&&ratio--1x4.css';
import colorBlack from './css/color--black.css';
import colorWhite from './css/color--white.css';
import colorWhiteNoBorder from './css/color--white-no-border.css';

export default [
    ['default', [common, base].join('\n')],

    ['ratio:1x1', ratio1x1],
    ['ratio:1x4', ratio1x4],
    ['ratio:8x1', [ratio6x1, ratio8x1].join('\n')],
    ['ratio:20x1', [ratio6x1, ratio20x1].join('\n')],

    ['color:blue', colorBlue],
    ['color:gray', colorGray],
    ['color:black', colorBlack],
    ['color:white', colorWhite],
    ['color:white-no-border', colorWhiteNoBorder],

    ['color:blue && ratio:1x4', colorBlueRatio1x4]
];
