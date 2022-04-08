import base from './base.css';
import ratio1x1 from './ratio--1x1.css';
import ratio1x4 from './ratio--1x4.css';
import ratio6x1 from './ratio--6x1.css';
import ratio8x1 from './ratio--8x1.css';
import ratio20x1 from './ratio--20x1.css';

export default [
    ['default', base],
    ['ratio:1x1', ratio1x1],
    ['ratio:1x4', ratio1x4],
    ['ratio:8x1', [ratio6x1, ratio8x1].join('\n')],
    ['ratio:20x1', [ratio6x1, ratio20x1].join('\n')]
];
