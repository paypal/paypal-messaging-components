/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getDeviceID, isStorageFresh } from '../../../utils';

import { useTransitionState, ScrollProvider, useServerData, useXProps, useDidUpdateEffect, getContent } from '../lib';
import Overlay from './Overlay';

const Container = ({ children, contentWrapper, contentMaxWidth, contentMaxHeight }) => {
    const { type, products, meta, setServerData } = useServerData();
    const {
        onReady,
        currency,
        amount,
        payerId,
        clientId,
        merchantId,
        buyerCountry,
        ignoreCache,
        version,
        env,
        deviceID: parentDeviceID,
        stageTag
    } = useXProps();
    const [transitionState] = useTransitionState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            // eslint-disable-next-line no-param-reassign
            contentWrapper.current.scrollTop = 0;
        } else if (transitionState === 'OPEN') {
            window.focus();
        }
    }, [transitionState]);

    useEffect(() => {
        if (typeof onReady === 'function') {
            onReady({
                type,
                products: products.map(({ meta: productMeta }) => productMeta.product),
                meta,
                // If storage state is brand new, use the parent deviceID, otherwise use child
                deviceID: isStorageFresh() ? parentDeviceID : getDeviceID()
            });
        }
    }, [meta.messageRequestId]);

    useDidUpdateEffect(() => {
        setLoading(true);
        getContent({
            currency,
            amount: amount === '' ? undefined : amount,
            payerId,
            clientId,
            merchantId,
            buyerCountry,
            ignoreCache,
            version,
            env,
            stageTag
        }).then(data => {
            setServerData(data);
            setLoading(false);
        });
    }, [currency, amount, payerId, clientId, merchantId, buyerCountry]);

    return (
        <ScrollProvider containerRef={contentWrapper}>
            <div className="modal-wrapper">
                <section className={`modal-container show ${loading ? 'loading' : ''}`}>
                    <div className="spinner" style={{ opacity: loading ? '1' : '0' }} />
                    <div className="wrapper">{children}</div>
                    <Overlay contentMaxWidth={contentMaxWidth} contentMaxHeight={contentMaxHeight} />
                </section>
            </div>
        </ScrollProvider>
    );
};

export default Container;
