/** @jsx h */
import { h, createContext } from 'preact';
import { useEffect, useState, useContext, useCallback } from 'preact/hooks';
import { getEventListenerPassiveOptionIfSupported } from '../../../../utils';

const ScrollContext = createContext({
    addScrollCallback: () => {},
    removeScrollCallback: () => {},
    scrollTo: () => {}
});

export const ScrollProvider = ({ children, containerRef }) => {
    const [callbacks, setCallbacks] = useState([]);

    const addScrollCallback = callback => {
        setCallbacks(currentCallbacks => [...currentCallbacks, callback]);
    };

    const removeScrollCallback = callback => {
        setCallbacks(currentCallbacks => {
            const index = currentCallbacks.indexOf(callback);
            if (index >= 0) {
                return [...currentCallbacks.slice(0, index), ...currentCallbacks.slice(index + 1)];
            }
            return currentCallbacks;
        });
    };

    const scrollTo = scrollTop => {
        if (containerRef.current) {
            // eslint-disable-next-line no-param-reassign
            containerRef.current.scrollTop = scrollTop;
        }
    };

    useEffect(() => {
        const handleScroll = event => callbacks.forEach(callback => callback(event));

        const passiveOption = getEventListenerPassiveOptionIfSupported();

        containerRef.current.addEventListener('scroll', handleScroll, passiveOption);
        containerRef.current.addEventListener('touchmove', handleScroll, passiveOption);

        return () => {
            containerRef.current.removeEventListener('scroll', handleScroll, passiveOption);
            containerRef.current.removeEventListener('touchmove', handleScroll, passiveOption);
        };
    }, [callbacks]);

    return (
        // Triggers The object passed as the value prop to the Context provider (at line 47) changes every render. To fix this consider wrapping it in a useMemo hook.
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <ScrollContext.Provider value={{ addScrollCallback, removeScrollCallback, scrollTo }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = (cb, dependencies) => {
    const { addScrollCallback, removeScrollCallback, scrollTo } = useContext(ScrollContext);
    const callback = cb ? useCallback(cb, dependencies) : null;

    useEffect(() => {
        if (callback) {
            addScrollCallback(callback);

            return () => removeScrollCallback(callback);
        }

        return () => {};
    }, [callback]);

    return { scrollTo };
};
