/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { ScrollContext } from './context';

export default ({ children, containerRef }) => {
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
        <ScrollContext.Provider value={{ addScrollCallback, removeScrollCallback }}>{children}</ScrollContext.Provider>
    );
};
