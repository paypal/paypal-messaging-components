/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useContext, useMemo } from 'preact/hooks';

const DisclosureViewContext = createContext({
    disclosureUrl: null,
    openDisclosure: () => {},
    closeDisclosure: () => {}
});

export const DisclosureViewProvider = ({ children }) => {
    const [disclosureUrl, setDisclosureUrl] = useState(null);

    const value = useMemo(
        () => ({
            disclosureUrl,
            openDisclosure: setDisclosureUrl,
            closeDisclosure: () => setDisclosureUrl(null)
        }),
        [disclosureUrl]
    );

    return <DisclosureViewContext.Provider value={value}>{children}</DisclosureViewContext.Provider>;
};

export const useDisclosureView = () => useContext(DisclosureViewContext);
