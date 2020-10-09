/** @jsx h */
import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { h } from 'preact';
import { useEffect, useState, useLayoutEffect, useMemo } from 'preact/hooks';

import { useTransitionState, ScrollProvider, useServerData, useXProps, useDidUpdateEffect } from '../lib';
import Overlay from './Overlay';
import { request } from '../../../utils';

const Container = ({ children, contentWrapper, contentMaxWidth, contentMaxHeight }) => {
    const { type, products, setServerData, ...serverData } = useServerData();
    const { onReady, currency, amount, payerId, clientId, merchantId } = useXProps();
    const [transitionState] = useTransitionState();
    const [loading, setLoading] = useState(false);
    const repaintForceEl = useMemo(() => typeof document !== 'undefined' && document.createTextNode(''));

    useEffect(() => {
        if (transitionState === 'OPENING') {
            window.focus();

            // eslint-disable-next-line no-param-reassign
            contentWrapper.current.scrollTop = 0;
        }
    }, [transitionState]);

    useEffect(() => {
        if (typeof onReady === 'function') {
            onReady({ type, products: products.map(({ meta }) => meta.product) });
        }
    }, []);

    useDidUpdateEffect(() => {
        setLoading(true);
        const query = objectEntries({
            currency,
            amount,
            payer_id: payerId,
            client_id: clientId,
            merchant_id: merchantId
        })
            .filter(([, val]) => Boolean(val))
            .reduce(
                (acc, [key, val]) =>
                    `${acc}&${key}=${encodeURIComponent(typeof val === 'object' ? JSON.stringify(val) : val)}`,
                ''
            )
            .slice(1);

        request('GET', `${window.location.origin}/credit-presentment/modalContent?${query}`).then(({ data }) => {
            setServerData({
                type,
                ...serverData,
                products: data.products
            });
            setLoading(false);
        });
    }, [currency, amount, payerId, clientId, merchantId]);

    // Force repaint. Needed for FF on Windows otherwise when the modal
    // opens it will not be scrollable. When animating from offscreen while
    // immediately displaying the iframe, FF appears to treat the wrapper
    // as still being offscreen even though it has animated onscreen. Forcing
    // a repaint forces FF to respect the position of the wrapper and allow scrolling.
    useLayoutEffect(() => {
        requestAnimationFrame(() => {
            if (stringStartsWith(transitionState, 'OPEN')) {
                document.body.appendChild(repaintForceEl);
            } else if (document.body.contains(repaintForceEl)) {
                document.body.removeChild(repaintForceEl);
            }
        });
    }, [transitionState]);

    return (
        <ScrollProvider containerRef={contentWrapper}>
            <section
                className={`modal-container ${stringStartsWith(transitionState, 'OPEN') ? 'show' : ''} ${
                    loading ? 'loading' : ''
                }`}
            >
                <div className="spinner" style={{ opacity: loading ? '1' : '0' }} />
                <div className="wrapper">{children}</div>
                <Overlay contentMaxWidth={contentMaxWidth} contentMaxHeight={contentMaxHeight} />
            </section>
        </ScrollProvider>
    );
};

export default Container;
