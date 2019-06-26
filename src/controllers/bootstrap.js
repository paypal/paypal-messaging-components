import objectAssign from 'core-js-pure/stable/object/assign';

import render from './render';
import { globalState, setGlobalState } from '../utils/globalState';

// Setup global library state
const Messages = config => ({ render: selector => render({ ...globalState.globalConfig, ...config }, selector) });

objectAssign(Messages, {
    render: (config = {}, selector) => render({ ...globalState.globalConfig, ...config }, selector),
    setGlobalConfig: (config = {}) =>
        setGlobalState({
            globalConfig: {
                ...globalState.globalConfig,
                ...config
            }
        })
});

export default Messages;
