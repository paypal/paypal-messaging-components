import isArray from 'core-js-pure/stable/array/is-array';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { ZalgoPromise } from 'zalgo-promise';

import { memoize } from './functional';
import { getGlobalUrl } from './global';
import { request } from './miscellaneous';

export const Treatment = {
    CONTROL: 'CONTROL',
    TEST: 'TEST'
};

const fallback = {
    type: 'inclusion',
    list: []
};

const getExperiment = memoize(() =>
    __ENV__ === 'local'
        ? ZalgoPromise.resolve(fallback)
        : request('GET', getGlobalUrl('RAMP_EXPERIMENT'))
              .then(res => res?.data ?? fallback)
              .catch(() => fallback)
);

export const getExperimentTreatment = memoize(id =>
    getExperiment().then(({ type, list }) => {
        const ids = isArray(id) ? id : [id];

        switch (type) {
            case 'inclusion':
                return ids.some(i => arrayIncludes(list, i)) ? Treatment.TEST : Treatment.CONTROL;
            case 'exclusion':
                return ids.some(i => arrayIncludes(list, i)) ? Treatment.CONTROL : Treatment.TEST;
            default:
                return Treatment.CONTROL;
        }
    })
);
