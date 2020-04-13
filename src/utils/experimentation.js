import { memoize } from './functional';
import { getGlobalUrl } from './global';
import { request } from './miscellaneous';

export const getWhitelist = memoize(() =>
    request('GET', getGlobalUrl('RAMP_WHITELIST'))
        .then(res => res?.data ?? [])
        .catch(() => [])
);
