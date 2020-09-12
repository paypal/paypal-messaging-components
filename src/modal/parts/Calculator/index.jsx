/** @jsx h */
import { h } from 'preact';

import USCalculator from './US/Calculator';

const Calculator = ({ country = 'US' }) => {
    switch (country) {
        case 'US':
            return <USCalculator />;
        default:
            return null;
    }
};

export default Calculator;
