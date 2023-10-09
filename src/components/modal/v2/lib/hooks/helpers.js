import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';

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
