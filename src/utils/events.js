import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { globalEvent } from './global';

export const awaitTreatments = new ZalgoPromise(resolve => globalEvent.once('treatments', resolve));

export const awaitFirstRender = new ZalgoPromise(resolve => globalEvent.once('render', resolve));

export const awaitFirstModalRender = new ZalgoPromise(resolve => globalEvent.once('modal-render', resolve));

export const awaitWindowLoad = new ZalgoPromise(resolve =>
    typeof document !== 'undefined' && document.readyState !== 'complete'
        ? window.addEventListener('load', resolve)
        : resolve()
);

export const awaitDOMContentLoaded = new ZalgoPromise(resolve =>
    typeof document !== 'undefined' && document.readyState === 'loading'
        ? window.addEventListener('DOMContentLoaded', resolve)
        : resolve()
);
