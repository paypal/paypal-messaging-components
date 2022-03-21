import { setupSDK } from '@paypal/sdk-client/src';

import * as Messages from './src/library/interface';

setupSDK([
    {
        name: 'messages',
        requirer: () => Messages
    }
]);
