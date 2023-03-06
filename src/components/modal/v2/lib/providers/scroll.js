/** @jsx h */
import { h, createContext } from 'preact';
import { useEffect, useRef, useContext, useCallback } from 'preact/hooks';
import { getEventListenerPassiveOptionIfSupported } from '../../../../../utils';

const ScrollContext = createContext({
    addScrollCallback: () => {},
    removeScrollCallback: () => {},
    scrollTo: () => {}
});

export const ScrollProvider = ({ children, containerRef }) => {
    const callbacksRef = useRef([]);

    const addScrollCallback = callback => {
        callbacksRef.current = [...callbacksRef.current, callback];
    };

    const removeScrollCallback = callback => {
        const index = callbacksRef.current.indexOf(callback);
        if (index >= 0) {
            callbacksRef.current = [...callbacksRef.current.slice(0, index), ...callbacksRef.current.slice(index + 1)];
        }
    };

    const scrollTo = scrollTop => {
        if (containerRef.current) {
            // eslint-disable-next-line no-param-reassign
            containerRef.current.scrollTop = scrollTop;
        }
    };

    useEffect(() => {
        const handleScroll = event => callbacksRef.current.forEach(callback => callback(event));
        const passiveOption = getEventListenerPassiveOptionIfSupported();

        containerRef.current.addEventListener('scroll', handleScroll, passiveOption);

        return () => {
            containerRef.current.removeEventListener('scroll', handleScroll, passiveOption);
        };
    }, [containerRef.current]);

    return (
        <ScrollContext.Provider value={{ addScrollCallback, removeScrollCallback, scrollTo }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = (cb = () => {}, dependencies) => {
    const { addScrollCallback, removeScrollCallback, scrollTo } = useContext(ScrollContext);
    const callback = useCallback(cb, dependencies);

    useEffect(() => {
        addScrollCallback(callback);

        return () => removeScrollCallback(callback);
    }, [callback]);

    return { scrollTo };
};
