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
