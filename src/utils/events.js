import { ZalgoPromise } from 'zalgo-promise/src';

import { globalEvent } from './global';

export const awaitFirstRender = new ZalgoPromise(resolve => globalEvent.once('render', resolve));

export const awaitWindowLoad = new ZalgoPromise(resolve =>
    typeof document !== 'undefined' && document.readyState !== 'complete'
        ? window.addEventListener('load', resolve)
        : resolve()
);
