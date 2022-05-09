import common from '../common.css';
import base from './base.css';
import ratio1x1 from './ratio--1x1.css';
import ratio1x4 from './ratio--1x4.css';
import ratio6x1 from './ratio--6x1.css';
import ratio8x1 from './ratio--8x1.css';
import ratio20x1 from './ratio--20x1.css';
import colorBlue from './color--blue.css';
import colorGray from './color--gray.css';
import colorBlack from './color--black.css';
import colorWhite from './color--white.css';
import colorWhiteNoBorder from './color--white-no-border.css';
import colorMonochrome from './color--monochrome.css';
import colorGrayscale from './color--grayscale.css';

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
    ['color:monochrome', colorMonochrome],
    ['color:grayscale', colorGrayscale]
];
