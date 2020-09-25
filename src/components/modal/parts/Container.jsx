/** @jsx h */
import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { useTransitionState, ScrollProvider, useServerData, useXProps, useDidUpdateEffect } from '../lib';
import Overlay from './Overlay';
import { request } from '../../../utils';

const Container = ({ children, contentWrapper, contentMaxWidth, contentMaxHeight }) => {
    const { type, products, setServerData, country } = useServerData();
    const { onReady, currency, amount, payerId, clientId, merchantId } = useXProps();
    const [transitionState] = useTransitionState();
    const [loading, setLoading] = useState(false);

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
                country,
                products: data.products
            });
            setLoading(false);
        });
    }, [currency, amount, payerId, clientId, merchantId]);

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
