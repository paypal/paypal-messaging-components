import objectAssign from 'core-js-pure/stable/object/assign';

import { globalState, setGlobalState } from '@library/common';
import render from './controllers/render';

// Setup global library state
const Messages = (config = {}) => ({
    render: (selector = '[data-pp-message]') => render({ ...globalState.config, ...config }, selector)
});

objectAssign(Messages, {
    render: (config, selector) => Messages(config).render(selector),
    setGlobalConfig: (config = {}) =>
        setGlobalState({
            config: {
                ...globalState.config,
                ...config
            }
        })
});

export default Messages;
