/** @jsx h */
import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { getOrCreateStorageID } from '../../../../utils';

import {
    useTransitionState,
    ScrollProvider,
    useServerData,
    useXProps,
    useDidUpdateEffect,
    getContent,
    isLander,
    isIframe,
    setupTabTrap
} from '../lib';
import Icon from './Icon';
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

    useEffect(() => {
        setupTabTrap();
    }, []);

    return (
        <ScrollProvider containerRef={contentWrapperRef}>
            <div className={`modal-wrapper${loading ? ' loading' : ''}`}>
                {isLander && !isIframe && <Icon name="header-background" />}
                <div className="spinner" style={{ opacity: loading ? '1' : '0' }} />
                <Overlay />
                {/* Presentational div to clip scrollbars with a rounded border */}
                <div className="content__wrapper-overflow">
                    {/* Scrollable content */}
                    <div className="content__wrapper" ref={contentWrapperRef}>
                        {children}
                    </div>
                </div>
            </div>
        </ScrollProvider>
    );
};

export default Container;
