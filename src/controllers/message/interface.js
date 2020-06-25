import objectAssign from 'core-js-pure/stable/object/assign';

import { globalState, setGlobalState } from '../../utils';
import renderMessages from './render';

const Messages = (config = {}) => ({
    render: (selector = '[data-pp-message]') => renderMessages({ ...globalState.config, ...config }, selector)
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
