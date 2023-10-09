import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { globalEvent } from './global';
import { PARENT_DOM_EVENT, GLOBAL_EVENT } from './constants';

export const awaitTreatments = new ZalgoPromise(resolve => globalEvent.once(GLOBAL_EVENT.TREATMENTS, resolve));

export const awaitFirstRender = new ZalgoPromise(resolve => globalEvent.once(GLOBAL_EVENT.RENDER, resolve));

export const awaitFirstModalRender = new ZalgoPromise(resolve => globalEvent.once(GLOBAL_EVENT.MODAL_RENDER, resolve));

export const awaitWindowLoad = new ZalgoPromise(resolve =>
    typeof document !== 'undefined' && document.readyState !== 'complete'
        ? window.addEventListener(PARENT_DOM_EVENT.LOAD, resolve)
        : resolve()
);

export const awaitDOMContentLoaded = new ZalgoPromise(resolve =>
    typeof document !== 'undefined' && document.readyState === 'loading'
        ? window.addEventListener(PARENT_DOM_EVENT.DOM_CONTENT_LOADED, resolve)
        : resolve()
);
