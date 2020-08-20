// mutations import here.
import pi4 from './pi4';
import pi4q from './pi4q';

export default function getMutations(id, type) {
    switch (id) {
        case 'PI4Q':
            return pi4q[type];
        case 'PI4':
        default:
            return pi4[type];
    }
}
