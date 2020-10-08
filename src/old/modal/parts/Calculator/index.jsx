/** @jsx h */
import { h } from 'preact';

import USCalculator from './US/Calculator';
import DECalculator from './DE/Calculator';

const Calculator = ({ country = 'US' }) => {
    switch (country) {
        case 'US':
            return <USCalculator />;
        case 'DE':
            return <DECalculator />;
        default:
            return null;
    }
};

export default Calculator;
