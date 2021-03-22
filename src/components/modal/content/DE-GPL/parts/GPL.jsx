/** @jsx h */
import { h } from 'preact';

import { useContent, useProductMeta } from '../../../lib';
import Icon from '../../../parts/Icon';
import Calculator from './Calculator';

export default () => {
    const { instructions, disclosure } = useContent('GPL');
    const { apr } = useProductMeta('GPL');

    return (
        <section className="content-body">
            <Calculator />

            <div className="content-column instructions">
                {instructions.map(instruction =>
                    instruction === 'PayPal' ? (
                        <span className="pp-button-wrapper">
                            <Icon name="logo-text" />
                        </span>
                    ) : (
                        <span>{instruction} </span>
                    )
                )}
            </div>

            <div className="content-column disclosure">
                {apr === '0,00' ? disclosure.zeroAPR : disclosure.nonZeroAPR}
            </div>
        </section>
    );
};
