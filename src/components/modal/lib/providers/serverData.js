/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { useXProps } from '..';

const ServerData = createContext({});

export const ServerDataProvider = ({ children, data }) => {
    const { offer } = useXProps();
    if (offer && data?.products.length) {
        // check for offer in products matching new name
        const requestedProductIndex = data.products.findIndex(product => product.meta.product === offer);
        if (requestedProductIndex !== -1) {
            // move product with offer to first in array to allow for tabs
            const requestedProduct = { ...data.products[requestedProductIndex] };
            data.products.splice(requestedProductIndex, 1);
            data.products.splice(0, 0, requestedProduct);
        }
    }

    const [serverData, _setServerData] = useState(data);

    const setServerData = updates => _setServerData({ ...serverData, ...updates });

    return <ServerData.Provider value={{ ...serverData, setServerData }}>{children}</ServerData.Provider>;
};

// Taken from paypal-smart-payment-buttons/src/menu/hooks.js
export function useServerData() {
    return useContext(ServerData);
}
