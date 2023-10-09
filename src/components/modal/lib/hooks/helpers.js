import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';

// useAutoFocus unused?
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

export function useDidUpdateLayoutEffect(fn, deps) {
    const mounted = useRef(false);

    useLayoutEffect(() => {
        if (mounted.current) {
            fn();
        }
        mounted.current = true;
    }, deps);
}
