/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import polyfillZoid from '../zoid-polyfill';
import { isLander } from '../utils';

// Required for the lander where the modal is not loaded inside of a zoid iframe
if (isLander) {
    polyfillZoid();
}

const XPropsContext = createContext({});

export const XPropsProvider = ({ children }) => {
    const [xProps, setXProps] = useState(window.xprops);

    useEffect(
        () =>
            xProps.onProps(newProps => {
                setXProps({ ...newProps });
            }),
        []
    );

    return <XPropsContext.Provider value={xProps}>{children}</XPropsContext.Provider>;
};

// Taken from paypal-smart-payment-buttons/src/menu/hooks.js
export function useXProps() {
    return useContext(XPropsContext);
}
