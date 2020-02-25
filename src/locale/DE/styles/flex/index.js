import base from './base.scss';
import ratio1x1 from './ratio--1x1.scss';
import ratio1x4 from './ratio--1x4.scss';
import ratio6x1 from './ratio--6x1.scss';
import ratio8x1 from './ratio--8x1.scss';
import ratio20x1 from './ratio--20x1.scss';

export default [
    ['default', base._getCss()],
    ['ratio:1x1', ratio1x1._getCss()],
    ['ratio:1x4', ratio1x4._getCss()],
    ['ratio:8x1', [ratio6x1._getCss(), ratio8x1._getCss()].join('\n')],
    ['ratio:20x1', [ratio6x1._getCss(), ratio20x1._getCss()].join('\n')]
];
