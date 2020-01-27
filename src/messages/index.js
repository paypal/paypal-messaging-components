import objectAssign from 'core-js-pure/stable/object/assign';

import render from './controllers/render';
import { globalState, setGlobalState } from '../utils';

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
