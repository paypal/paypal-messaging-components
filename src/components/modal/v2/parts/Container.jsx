/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getOrCreateStorageID } from '../../../../utils';

import { useTransitionState, ScrollProvider, useServerData, useXProps, useDidUpdateEffect, getContent } from '../lib';

const Container = ({ children, contentWrapper }) => {
    const { type, views, meta, setServerData } = useServerData();
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
        stageTag,
        channel
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
                products: views.map(({ meta: productMeta }) => productMeta.product),
                meta,
                deviceID: getOrCreateStorageID()
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
            stageTag,
            channel
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
                </section>
            </div>
        </ScrollProvider>
    );
};

export default Container;
