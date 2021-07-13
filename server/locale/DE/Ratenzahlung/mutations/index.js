import instAnyEqz from './inst_any_eqz';
import instAnyGtz from './inst_any_gtz';
import palaqAnyGtz from './palaq_any_gtz';
import palaqAnyEqz from './palaq_any_eqz';

export default function getMutations(id, type) {
    switch (id) {
        case 'PALAQ:ANY:EQZ':
            return palaqAnyEqz[type];
        case 'PALAQ:ANY:GTZ':
            return palaqAnyGtz[type];
        case 'INST:ANY:EQZ':
            return instAnyEqz[type];
        case 'INST:ANY:GTZ':
        default:
            return instAnyGtz[type];
    }
}
