/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

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
