import isArray from 'core-js-pure/stable/array/is-array';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { ZalgoPromise } from 'zalgo-promise/src';

import { memoize } from './functional';
import { getGlobalUrl } from './global';
import { request } from './miscellaneous';
import { getEnv } from './sdk';

export const Treatment = {
    CONTROL: 'CONTROL',
    TEST: 'TEST'
};

const fallback = {
    type: 'exclusion',
    list: []
};

const getExperiment = memoize(() => {
    switch (getEnv()) {
        case 'local':
            return ZalgoPromise.delay(0).then(() => fallback);
        case 'sandbox':
            // Enable test for all of sandbox
            return ZalgoPromise.delay(0).then(() => ({ type: 'exclusion', list: [] }));
        default:
            return request('GET', getGlobalUrl('RAMP_EXPERIMENT'))
                .then(res => res?.data ?? fallback)
                .catch(() => fallback);
    }
});

export const getExperimentTreatment = id =>
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
    });
