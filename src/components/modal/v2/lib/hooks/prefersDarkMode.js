import { useEffect, useState } from 'preact/hooks';

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

const getInitialMode = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }

    return window.matchMedia(DARK_MODE_QUERY).matches;
};

export default function usePrefersDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(getInitialMode);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const mediaQueryList = window.matchMedia(DARK_MODE_QUERY);

        const onChange = event => {
            setIsDarkMode(event.matches);
        };

        setIsDarkMode(mediaQueryList.matches);

        if (typeof mediaQueryList.addEventListener === 'function') {
            mediaQueryList.addEventListener('change', onChange);
            return () => mediaQueryList.removeEventListener('change', onChange);
        }

        if (typeof mediaQueryList.addListener === 'function') {
            mediaQueryList.addListener(onChange);
            return () => mediaQueryList.removeListener(onChange);
        }

        return undefined;
    }, []);

    return isDarkMode;
}
