/** @jsx h */
import { h } from 'preact';
import render from 'preact-render-to-string';

import Message from './message';

export default function(options, markup) {
    return render(<Message options={options} markup={markup} locale={markup.meta.offerCountry} />);
}
