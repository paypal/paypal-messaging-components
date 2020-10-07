/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';

const ServerData = createContext({});

export const ServerDataProvider = ({ children, data }) => {
    const [serverData, setServerData] = useState(data);

    return <ServerData.Provider value={{ ...serverData, setServerData }}>{children}</ServerData.Provider>;
};

// Taken from paypal-smart-payment-buttons/src/menu/hooks.js
export function useServerData() {
    return useContext(ServerData);
}
