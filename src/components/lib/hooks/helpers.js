import { useEffect, useRef } from 'preact/hooks';

export function useAutoFocus() {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    });

    return ref;
}

export function useDidUpdateEffect(fn, deps) {
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) {
            fn();
        }
        mounted.current = true;
    }, deps);
}
