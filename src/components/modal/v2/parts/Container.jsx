/** @jsx h */
import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { getOrCreateStorageID, getTsCookieFromStorage } from '../../../../utils';

import {
    useTransitionState,
    ScrollProvider,
    useServerData,
    useXProps,
    useDidUpdateEffect,
    getContent,
    setupTabTrap,
    isLander,
    isIframe
} from '../lib';
import Overlay from './Overlay';

const Container = ({ children }) => {
    const contentWrapperRef = useRef();
    const { type, views, meta, setServerData } = useServerData();
    const {
        onReady,
        currency,
        amount,
        payerId,
        clientId,
        merchantId,
        customerId,
        buyerCountry,
        ignoreCache,
        version,
        env,
        stageTag,
        channel,
        ecToken
    } = useXProps();
    const [transitionState] = useTransitionState();
    const [loading, setLoading] = useState(false);
    const deviceID = getOrCreateStorageID();

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            contentWrapperRef.current.scrollTop = 0;
        } else if (transitionState === 'OPEN') {
            window.focus();
        }
    }, [transitionState]);

    useEffect(() => {
        if (typeof onReady === 'function') {
            onReady({
                type,
                products: views
                    .filter(({ meta: productMeta }) => productMeta?.product)
                    .map(({ meta: productMeta }) => productMeta.product),
                meta,
                deviceID,
                ts: getTsCookieFromStorage()
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
            customerId,
            buyerCountry,
            ignoreCache,
            version,
            env,
            stageTag,
            channel,
            ecToken,
            deviceID
        }).then(data => {
            setServerData(data);
            setLoading(false);
        });
    }, [currency, amount, payerId, clientId, merchantId, buyerCountry]);

    useEffect(() => {
        setupTabTrap();
    }, []);

    return (
        <ScrollProvider containerRef={contentWrapperRef}>
            <div className="modal-wrapper">
                <div className="spinner" style={{ opacity: loading ? '1' : '0' }} />
                <Overlay />
                {/* Presentational div to clip scrollbars with a rounded border */}
                {/* Lander variant uses the div with className content__wrapper-overflow as the contentWrapperRef */}
                <div
                    className={`content__wrapper-overflow ${loading ? 'loading' : ''}`}
                    ref={!!(isLander && !isIframe) && contentWrapperRef}
                >
                    {/* Scrollable content */}
                    {/* Iframe variants use the div with className content__wrapper as the contentWrapperRef */}
                    <div
                        className="content__wrapper"
                        ref={!!(!isLander || isIframe) && contentWrapperRef}
                        role={isIframe ? 'dialog' : undefined}
                        aria-modal={isIframe ? 'true' : undefined}
                        aria-labelledby={isIframe ? 'header__headline' : undefined}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </ScrollProvider>
    );
};

export default Container;
