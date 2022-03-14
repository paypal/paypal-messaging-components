/** @jsx h */
import { h } from 'preact';

import Carousel from './Carousel';
import Calculator from './Calculator';
import { useContent } from '../../../lib';

const INST = () => {
    const { carousel } = useContent('PAY_LATER_SHORT_TERM');

    return (
        <section className="content-body">
            <Carousel items={carousel} />

            <div className="calculator-container">
                <Calculator country="DE" />
            </div>
        </section>
    );
};

export default INST;
