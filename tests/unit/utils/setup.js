import '@testing-library/jest-dom/extend-expect';
import globals from '../../../globals';

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
