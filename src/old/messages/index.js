import objectAssign from 'core-js-pure/stable/object/assign';

import render from './controllers/render';
import { getGlobalState, setGlobalState } from '../../utils';

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
