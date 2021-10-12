/** @jsx h */
import { h } from 'preact';
import render from 'preact-render-to-string';

import Message from './message';

export default (options, markup, addLog) => {
    // eslint-disable-next-line react/destructuring-assignment
    return render(<Message addLog={addLog} options={options} markup={markup} locale={markup.meta.offerCountry} />);
};
