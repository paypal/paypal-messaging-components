import objectAssign from 'core-js-pure/stable/object/assign';

import render from './controllers/render';
import { globalState, setGlobalState } from '../utils/globalState';

// Setup global library state
const Messages = config => ({ render: selector => render({ ...globalState.config, ...config }, selector) });

objectAssign(Messages, {
    render: (config = {}, selector) => render({ ...globalState.config, ...config }, selector),
    setGlobalConfig: (config = {}) =>
        setGlobalState({
            config: {
                ...globalState.config,
                ...config
            }
        })
});

export default Messages;
