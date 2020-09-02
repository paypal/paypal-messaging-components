import { ZalgoPromise } from 'zalgo-promise';

import { memoize } from './functional';
import { getGlobalUrl } from './global';
import { request } from './miscellaneous';

export const getExclusionList = memoize(() =>
    __ENV__ === 'local'
        ? ZalgoPromise.resolve([])
        : request('GET', getGlobalUrl('RAMP_EXCLUSION_LIST'))
              .then(res => res?.data ?? [])
              .catch(() => [])
);

export const getInclusionList = memoize(() =>
    __ENV__ === 'local'
        ? ZalgoPromise.resolve([])
        : request('GET', getGlobalUrl('RAMP_INCLUSION_LIST'))
              .then(res => res?.data ?? [])
              .catch(() => [])
);
