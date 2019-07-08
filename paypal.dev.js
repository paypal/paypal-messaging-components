import { setupSDK } from '@paypal/sdk-client/src';

import * as Messages from './src/interface/messages';

setupSDK([
    {
        name: 'messages',
        requirer: () => Messages
    }
]);
