/** @jsx h */
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { useTransitionState, ScrollProvider, useServerData, useXProps, useDidUpdateEffect, getContent } from '../lib';
import Overlay from './Overlay';

const Container = ({ children, contentWrapper, contentMaxWidth, contentMaxHeight }) => {
    const { type, products, setServerData, trackingPayload } = useServerData();
    const { onReady, currency, amount, payerId, clientId, merchantId, buyerCountry } = useXProps();
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
            onReady({ type, products: products.map(({ meta }) => meta.product), trackingPayload });
        }
    }, []);

    useDidUpdateEffect(() => {
        setLoading(true);
        getContent({
            currency,
            amount,
            payerId,
            clientId,
            merchantId,
            buyerCountry
        }).then(data => {
            setServerData(data);
            setLoading(false);
        });
    }, [currency, amount, payerId, clientId, merchantId]);

    return (
        <ScrollProvider containerRef={contentWrapper}>
            <div className="modal-wrapper">
                <section
                    className={`modal-container ${stringStartsWith(transitionState, 'OPEN') ? 'show' : ''} ${
                        loading ? 'loading' : ''
                    }`}
                >
                    <div className="spinner" style={{ opacity: loading ? '1' : '0' }} />
                    <div className="wrapper">{children}</div>
                    <Overlay contentMaxWidth={contentMaxWidth} contentMaxHeight={contentMaxHeight} />
                </section>
            </div>
        </ScrollProvider>
    );
};

export default Container;
