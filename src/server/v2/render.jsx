/** @jsx h */
import { h } from 'preact';
import render from 'preact-render-to-string';

import V2Message from './message';

export default (options, v2Content) => {
    return render(<V2Message options={options} v2Content={v2Content} />);
};
