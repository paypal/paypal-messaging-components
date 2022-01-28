const hideMinOrMax = ({ amount: amountString, min: minString, max: maxString }) => {
    const amount = Number(amountString);
    const min = Number(minString);
    const max = Number(maxString);

    if (amount < min || !amount) return '.message__headline .max { display: none; }';
    if (amount > max) return '.message__headline .min { display: none; }';
    return '';
};

export default hideMinOrMax;
