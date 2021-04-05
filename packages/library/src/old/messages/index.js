import objectAssign from 'core-js-pure/stable/object/assign';

import { getGlobalState, setGlobalState } from '@library/common';
import render from './controllers/render';

// Setup global library state
const Messages = (config = {}) => ({
    render: (selector = '[data-pp-message]') => render({ ...getGlobalState().config, ...config }, selector)
});

objectAssign(Messages, {
    render: (config, selector) => Messages(config).render(selector),
    setGlobalConfig: (config = {}) =>
        setGlobalState({
            config: {
                ...getGlobalState().config,
                ...config
            }
        })
});

export default Messages;
