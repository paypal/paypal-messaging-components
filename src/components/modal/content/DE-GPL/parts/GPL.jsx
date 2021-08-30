/** @jsx h */
import { h } from 'preact';

import { useContent, useProductMeta } from '../../../lib';
import Calculator from './Calculator';

export default () => {
    const { instructions, disclosure } = useContent('GPL');
    const { apr } = useProductMeta('GPL');

    return (
        <section className="content-body">
            <Calculator />

            <div className="content-column instructions transitional">
                {instructions.map(instruction =>
                    instruction === 'PayPal' ? <b>PayPal </b> : <span>{instruction} </span>
                )}
            </div>

            <div className="content-column disclosure transitional">
                {(apr === '0.00' ? disclosure.zeroAPR : disclosure.nonZeroAPR).replace(/,00/g, '')}
            </div>
        </section>
    );
};
