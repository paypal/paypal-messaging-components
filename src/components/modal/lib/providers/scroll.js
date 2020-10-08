/** @jsx h */
import { h, createContext } from 'preact';
import { useEffect, useState, useContext, useCallback } from 'preact/hooks';

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

        containerRef.current.addEventListener('scroll', handleScroll);
        containerRef.current.addEventListener('touchmove', handleScroll);

        return () => {
            containerRef.current.removeEventListener('scroll', handleScroll);
            containerRef.current.removeEventListener('touchmove', handleScroll);
        };
    }, [callbacks]);

    return (
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
