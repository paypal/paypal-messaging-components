import pi4 from './Pi4/index';
import ppc from './PPC/index';

export default offerType => {
    switch (offerType) {
        case 'PI4':
        case 'PI4Q':
            return pi4;
        default:
            return ppc;
    }
};
