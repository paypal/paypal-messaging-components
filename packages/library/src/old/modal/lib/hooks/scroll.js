import { useEffect, useContext, useCallback } from 'preact/hooks';

import { ScrollContext } from '../context';

export default (cb, dependencies) => {
    const { addScrollCallback, removeScrollCallback } = useContext(ScrollContext);
    const callback = useCallback(cb, dependencies);

    useEffect(() => {
        addScrollCallback(callback);

        return () => removeScrollCallback(callback);
    }, [callback]);
};
