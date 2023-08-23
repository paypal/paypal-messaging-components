/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getOrCreatedDeviceID, getTsCookieFromStorage } from '../../../utils';

import {
    useTransitionState,
    ScrollProvider,
    useServerData,
    useXProps,
    useDidUpdateEffect,
    getContent,
    setupTabTrap
} from '../lib';
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
        env,
        messageRequestId,
        ignoreCache,
        version,
        stageTag
    } = useXProps();
    const [transitionState] = useTransitionState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            // eslint-disable-next-line no-param-reassign
            contentWrapper.current.scrollTop = 0;
        } else if (transitionState === 'OPEN') {
            window.requestAnimationFrame(() => {
                window.document.querySelector('#close-btn').focus();
            });
        }
    }, [transitionState]);

    useEffect(() => {
        if (typeof onReady === 'function') {
            const productNames = products.map(({ meta: productMeta }) => productMeta.product);

            // TODO: Temporary hack needed for the generic message labeled as PI30
            // which is an issue when PI30 is suppressed
            if (products.find(({ meta: { offerCountry } }) => offerCountry === 'DE')) {
                productNames.push('PI30');
            }

            onReady({
                type,
                products: productNames,
                messageRequestId,
                meta,
                deviceID: getOrCreatedDeviceID(),
                ts: getTsCookieFromStorage()
            });
        }
    }, [currency, amount, payerId, clientId, merchantId, buyerCountry]);

    useEffect(() => {
        setupTabTrap();
    }, []);

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
            <div className="modal-wrapper" role="dialog" aria-label="PayPal Credit" aria-modal="true">
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
