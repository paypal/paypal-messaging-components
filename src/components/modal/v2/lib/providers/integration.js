/** @jsx h */
import { h, createContext } from 'preact';
import { useContext } from 'preact/hooks';

export const Integration = createContext({});

export const IntegrationProvider = ({ children, data }) => {
    return <Integration.Provider value={{ ...data }}>{children}</Integration.Provider>;
};

export const useIntegration = () => {
    return useContext(Integration);
};
