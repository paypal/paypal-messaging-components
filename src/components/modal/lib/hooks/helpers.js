import { useState, useEffect, useRef } from 'preact/hooks';

// Taken from paypal-smart-payment-buttons/src/menu/hooks.js
export function useXProps() {
    const [xprops, setXProps] = useState(window.xprops);
    useEffect(
        () =>
            xprops.onProps(newProps => {
                setXProps({ ...newProps });
            }),
        []
    );
    return { ...xprops };
}

export function useAutoFocus() {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    });

    return ref;
}
