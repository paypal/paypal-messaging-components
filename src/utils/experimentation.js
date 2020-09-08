import { ZalgoPromise } from 'zalgo-promise';

import { memoize } from './functional';
import { getGlobalUrl } from './global';
import { request } from './miscellaneous';

const DEV_ACCOUNTS = [
    'DEV00000000NI',
    'DEV0000000NIQ',
    'DEV000NINONUS',
    'DEV00NINONUSQ',
    'DEV0000000EAZ',
    'DEV0000000EAG',
    'DEV0000000PSZ',
    'DEV0000000PSG',
    'DEV0000000PMZ',
    'DEV0000000PMG',
    'DEV0000000PI4',
    'DEV000000PI4Q',

    'DEV0000000IAZ',
    'DEV0000000IAG',
    'DEV000000PQAG',
    'DEV000000PQAZ',

    'DEV000000GBPL',
    'DEV00000GBPLQ'
];

export const getExclusionList = memoize(() =>
    __ENV__ === 'local'
        ? ZalgoPromise.resolve([])
        : request('GET', getGlobalUrl('RAMP_EXCLUSION_LIST'))
              .then(res => res?.data ?? [])
              .catch(() => [])
);

export const getInclusionList = memoize(() =>
    __ENV__ === 'local'
        ? ZalgoPromise.resolve(DEV_ACCOUNTS)
        : request('GET', getGlobalUrl('RAMP_INCLUSION_LIST'))
              .then(res => res?.data ?? [])
              .catch(() => [])
);
