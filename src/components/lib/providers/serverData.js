/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';

const ServerData = createContext({});

export const ServerDataProvider = ({ children, data }) => {
    // Needed to forward-support changes to modal content
    // TODO: remove with new modal
    const processedData = {
        ...data
    };
    if (processedData.products) {
        processedData.products = processedData.products
            .map(product => (typeof product === 'string' ? product : product.meta.product))
            .filter(product => product !== 'GPL');
    }

    const [serverData, setServerData] = useState(processedData);

    return <ServerData.Provider value={{ ...serverData, setServerData }}>{children}</ServerData.Provider>;
};

// Taken from paypal-smart-payment-buttons/src/menu/hooks.js
export function useServerData() {
    return useContext(ServerData);
}
