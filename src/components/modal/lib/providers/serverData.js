/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';

const ServerData = createContext({});

export const ServerDataProvider = ({ children, data }) => {
    const [serverData, _setServerData] = useState(data);

    const setServerData = updates => _setServerData({ ...serverData, ...updates });

    // Triggers The object passed as the value prop to the Context provider (at line 47) changes every render. To fix this consider wrapping it in a useMemo hook.
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    return <ServerData.Provider value={{ ...serverData, setServerData }}>{children}</ServerData.Provider>;
};

// Taken from paypal-smart-payment-buttons/src/menu/hooks.js
export function useServerData() {
    return useContext(ServerData);
}
