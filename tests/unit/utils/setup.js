import '@testing-library/jest-dom/extend-expect';
import globals from '../../../globals';

// Fix for Jest 29 with jest-environment-jsdom-sixteen
// Create a proper localStorage that bypasses opaque origin check
if (typeof window !== 'undefined') {
    const storage = {};

    // Define localStorage with proper get/set
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: key => storage[key] || null,
            setItem: (key, value) => {
                storage[key] = String(value);
            },
            removeItem: key => {
                delete storage[key];
            },
            clear: () => {
                Object.keys(storage).forEach(key => {
                    delete storage[key];
                });
            },
            key: index => {
                const keys = Object.keys(storage);
                return keys[index] || null;
            },
            get length() {
                return Object.keys(storage).length;
            }
        },
        writable: false,
        configurable: true
    });
}

const standaloneGlobals = globals({
    TARGET: 'standalone',
    VERSION: '1.0.0'
});

standaloneGlobals.__MESSAGES__.__DOMAIN__.__TEST__ = 'http://localhost.paypal.com:8080';

Object.assign(window, {
    __ENV__: 'test',
    __LOCAL__: false,
    ...standaloneGlobals
});
