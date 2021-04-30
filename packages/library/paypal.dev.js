import { setupSDK } from '@paypal/sdk-client/src';

import * as Messages from './src/interface/experiment';

setupSDK([
    {
        name: 'messages',
        requirer: () => Messages
    }
]);
