/** @jsx h */
import { h } from 'preact';

import Carousel from './Carousel';
import Calculator from './Calculator';
import { useContent } from '../../../lib';

const INST = () => {
    const { content } = useContent('INST');

    return (
        <section className="content-body">
            <Carousel items={content.carousel} />

            {/* <!-- Calculator --> */}
            <div className="calculator-container">
                <Calculator country="DE" />
            </div>
        </section>
    );
};

export default INST;
