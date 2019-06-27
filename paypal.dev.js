import { setupSDK } from '@paypal/sdk-client/src';

import * as Messages from './src';

setupSDK([
    {
        name: 'messages',
        requirer: () => Messages
    }
]);
