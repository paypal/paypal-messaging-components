import objectAssign from 'core-js-pure/stable/object/assign';

import { getGlobalState, setGlobalState } from '../../../utils';
import Messages from './interface';

objectAssign(Messages, {
    // Support previous API
    render: (config, selector) => Messages(config).render(selector),
    // Method to manually set global state instead of with data-pp attributes on the script tag
    setGlobalConfig: (config = {}) =>
        setGlobalState({
            config: {
                ...getGlobalState().config,
                ...config
            }
        })
});

export default Messages;
