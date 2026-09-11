/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useContext, useMemo } from 'preact/hooks';
import { getPayPalDomain } from '../../../../../utils';

const DisclosureViewContext = createContext({
    disclosureUrl: null,
    openDisclosure: () => {},
    closeDisclosure: () => {}
});

const getFormattedDisclosureUrl = url => {
    if (!url) return url;
    try {
        // eslint-disable-next-line compat/compat
        const parsed = new URL(url);
        const hostname = parsed.hostname.toLowerCase();
        const isAllowedHost = hostname === 'www.paypal.com' || hostname === 'paypal.com';

        if (parsed.protocol === 'https:' && isAllowedHost) {
            const domain = getPayPalDomain();
            return `${domain}${parsed.pathname}${parsed.search}${parsed.hash}`;
        }
    } catch {
        // Fallback to original url if parsing fails
    }
    return url;
};

export const DisclosureViewProvider = ({ children }) => {
    const [disclosureUrl, setDisclosureUrl] = useState(null);

    const handleOpenDisclosure = url => {
        setDisclosureUrl(getFormattedDisclosureUrl(url));
    };

    const value = useMemo(
        () => ({
            disclosureUrl,
            openDisclosure: handleOpenDisclosure,
            closeDisclosure: () => setDisclosureUrl(null)
        }),
        [disclosureUrl]
    );

    return <DisclosureViewContext.Provider value={value}>{children}</DisclosureViewContext.Provider>;
};

export const useDisclosureView = () => useContext(DisclosureViewContext);
