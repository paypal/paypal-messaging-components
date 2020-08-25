/* eslint-disable eslint-comments/disable-enable-pair */
// mutations import here.
/* eslint-disable camelcase */
import pi4_no_amount from './pi4_no_amount';
import pi4_non_qual from './pi4_non_qual';
import pi4q from './pi4q';

export default function getMutations(id, type, { amount }) {
    switch (id) {
        case 'PI4Q':
            return pi4q[type];
        case 'PI4':
            return typeof amount === 'undefined' ? pi4_no_amount[type] : pi4_non_qual[type];
        default:
            return pi4_no_amount[type];
    }
}
